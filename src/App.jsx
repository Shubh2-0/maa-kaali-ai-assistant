import { useState, useRef, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import Header from './components/Header'
import QuickCategories from './components/QuickCategories'
import { CARDS } from './components/SpecialCard'
import products from './data/products.json'

const PROMPTS = {
  en: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in English. Be brief and friendly. End every reply with RECOMMEND: followed by product numbers from the list. Example reply:

Check out these gorgeous wedding lehengas! Great discounts on all of them.
RECOMMEND: 2, 5, 8

SPECIAL PAGES (if user asks about these, share the link):
- Blogs: https://maakaalicreations.in/blogs
- Contact: https://maakaalicreations.in/contact
- About: https://maakaalicreations.in/about
- All Products: https://maakaalicreations.in/shop
If user asks about blogs, say "Check out our latest blogs here: https://maakaalicreations.in/blogs" — do NOT show products.`,
  hi: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Hindi/Hinglish. Be brief and friendly. End every reply with RECOMMEND: followed by product numbers from the list. Example reply:

Yeh dekhiye humare best lehengas! Sabpe achi discount hai.
RECOMMEND: 2, 5, 8

SPECIAL PAGES (agar user inke baare mein puche, link share karo):
- Blogs: https://maakaalicreations.in/blogs
- Contact: https://maakaalicreations.in/contact
- About: https://maakaalicreations.in/about
- All Products: https://maakaalicreations.in/shop
Agar user blogs ke baare mein puche, bolo "Humare latest blogs yahan dekhein: https://maakaalicreations.in/blogs" — products mat dikhao.`
}

const WELCOME = {
  en: 'Hello! 🙏 Welcome to **Maa Kaali Creations**!\n\nWhat are you looking for today?',
  hi: 'Namaste! 🙏 **Maa Kaali Creations** mein aapka swagat hai!\n\nAaj kya dhundh rahe hain?'
}

function filterRelevantProducts(query) {
  const q = query.toLowerCase()
  let filtered = [...products]
  if (q.includes('saree') || q.includes('साड़ी') || q.includes('sari')) filtered = filtered.filter(p => p.category === 'sarees')
  else if (q.includes('lehenga') || q.includes('लहंगा')) filtered = filtered.filter(p => p.category === 'lehenga choli')
  else if (q.includes('suit') || q.includes('सूट') || q.includes('kurta') || q.includes('kurti')) filtered = filtered.filter(p => p.category === "women's suit sets")
  const pm = q.match(/(?:under|below|within|budget|niche|neeche)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i)
  if (pm) filtered = filtered.filter(p => p.price <= parseInt(pm[1]))
  const pm2 = q.match(/(\d+)\s*(?:₹|rs|rupee|rupay|ke)/i)
  if (pm2) filtered = filtered.filter(p => p.price <= parseInt(pm2[1]))
  filtered.sort(() => Math.random() - 0.5)
  return filtered.slice(0, 20)
}

function buildProductContext(rp) {
  return rp.map((p, i) => `#${i+1}. ${p.name} | ₹${p.price} (MRP ₹${p.originalPrice}) | ${p.category}`).join('\n')
}

function extractProductIndices(text, rp) {
  const m = text.match(/RECOMMEND\s*:\s*([#\d,\s]+)/i)
  if (!m) return []
  return m[1].replace(/#/g,'').split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)).map(i=>rp[i-1]).filter(Boolean)
}

function cleanResponse(text) {
  return text.replace(/RECOMMEND\s*:\s*[#\d,\s]+/gi,'').replace(/<think>[\s\S]*?<\/think>/gi,'').replace(/^#\d+\..*$/gm,'').replace(/\n{3,}/g,'\n\n').trim()
}

function detectSpecialQuery(q) {
  q = q.toLowerCase()
  if (q.includes('blog') || q.includes('article') || q.includes('read')) return 'blog'
  if (q.includes('announce') || q.includes('new arrival') || q.includes('launch')) return 'announcement'
  if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('call')) return 'contact'
  if (q.includes('about') || q.includes('who are') || q.includes('company')) return 'about'
  if (q.includes('shipping') || q.includes('delivery') || q.includes('return') || q.includes('refund') || q.includes('cod')) return 'shipping'
  return null
}

// Real stats from product data
const _wd = products.filter(p=>p.originalPrice&&p.price<p.originalPrice)
const _maxD = Math.max(..._wd.map(p=>Math.round((1-p.price/p.originalPrice)*100)))

const specialMsgs = {
  en: { blog:"Check out our blog for styling tips and fashion guides! 📝", discount:`We have ${_wd.length} products on sale — up to ${_maxD}% OFF! 🏷️`, announcement:`Our collection has ${products.length} products across Sarees, Lehengas & Suit Sets! 📢`, contact:"We'd love to hear from you! 📞", about:"Here's about us! 🙏", shipping:"Our delivery & return policy 🚚" },
  hi: { blog:"Humare blogs mein styling tips padhein! 📝", discount:`${_wd.length} products pe sale hai — ${_maxD}% tak OFF! 🏷️`, announcement:`Humare collection mein ${products.length} products hain — Sarees, Lehengas aur Suit Sets! 📢`, contact:"Humse baat karein! 📞", about:"Humare baare mein! 🙏", shipping:"Delivery aur return policy 🚚" }
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [messages, setMessages] = useState([{ role:'assistant', content:WELCOME.en, products:[] }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { try { const s=localStorage.getItem('mkc-chat'); if(s){const{msgs,language}=JSON.parse(s);if(msgs?.length>0){setMessages(msgs);setLang(language||'en')}} } catch(e){} }, [])
  useEffect(() => { if(messages.length>1) localStorage.setItem('mkc-chat',JSON.stringify({msgs:messages,language:lang})) }, [messages,lang])
  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])

  function handleLangChange(l) { setLang(l); setMessages([{role:'assistant',content:WELCOME[l],products:[]}]); localStorage.removeItem('mkc-chat') }
  function resetChat() { setMessages([{role:'assistant',content:WELCOME[lang],products:[]}]); localStorage.removeItem('mkc-chat') }

  async function handleSend(text) {
    const msg = text || input.trim()
    if (!msg || isLoading) return
    setInput('')
    setMessages(prev => [...prev, { role:'user', content:msg, products:[] }])

    const special = detectSpecialQuery(msg)
    if (special) {
      setMessages(prev => [...prev, { role:'assistant', content:specialMsgs[lang][special], products:[], specialCard:special }])
      return
    }

    setIsLoading(true)
    try {
      const rp = filterRelevantProducts(msg)
      const ctx = buildProductContext(rp)
      const hist = messages.slice(-6).map(m=>({role:m.role,content:m.content}))
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[{role:'system',content:PROMPTS[lang]+'\n\nAVAILABLE PRODUCTS:\n'+ctx},...hist,{role:'user',content:msg}] }) })
      if (!res.ok) throw new Error('fail')
      const data = await res.json()
      let ai = data.choices?.[0]?.message?.content || ''
      if (!ai || ai.length<10 || ai.includes('FORMAT') || ai.includes('STRICT')) {
        setMessages(prev=>[...prev,{role:'assistant',content:lang==='en'?"Here are some great picks for you! 🛍️":"Yeh dekhiye best options! 🛍️",products:rp.slice(0,4)}])
      } else {
        const recs = extractProductIndices(ai,rp)
        setMessages(prev=>[...prev,{role:'assistant',content:cleanResponse(ai),products:recs.length>0?recs:rp.slice(0,4)}])
      }
    } catch(e) {
      setMessages(prev=>[...prev,{role:'assistant',content:lang==='en'?'Something went wrong. Try again! 🙏':'Kuch problem ho gayi. Phir try karein! 🙏',products:[]}])
    } finally { setIsLoading(false) }
  }

  const showIntro = messages.length <= 1

  return (
    <div className="h-full flex justify-center bg-[#fff7ed]">
      <div className="w-full max-w-md flex flex-col h-full p-2 sm:p-3">

        <Header lang={lang} onLangChange={handleLangChange} showNewChat={!showIntro} onNewChat={resetChat} />

        {showIntro && <QuickCategories onSelect={handleSend} lang={lang} />}

        <ChatWindow messages={messages} isLoading={isLoading} messagesEndRef={endRef} />

        {/* Input */}
        <div className="flex-shrink-0 bg-white rounded-xl p-2 mt-1.5 border border-brand-100 shadow-sm">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend()} }}
              placeholder={lang==='en'?"What are you looking for?":"Kya dhundh rahe hain?"}
              className="flex-1 resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm max-h-20 min-h-[36px] py-1.5 px-1"
              rows={1} disabled={isLoading}
            />
            <button onClick={()=>handleSend()} disabled={!input.trim()||isLoading}
              className="send-btn bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-3.5 py-1.5 text-sm font-semibold disabled:opacity-30 transition-all flex-shrink-0">
              {isLoading ? (
                <span className="flex gap-1">
                  <span className="typing-dot w-1.5 h-1.5 bg-white rounded-full inline-block"/>
                  <span className="typing-dot w-1.5 h-1.5 bg-white rounded-full inline-block"/>
                  <span className="typing-dot w-1.5 h-1.5 bg-white rounded-full inline-block"/>
                </span>
              ) : '→'}
            </button>
          </div>
          <p className="text-[8px] text-gray-300 mt-1 text-center">Powered by osmAPI + Qwen AI</p>
        </div>
      </div>
    </div>
  )
}
