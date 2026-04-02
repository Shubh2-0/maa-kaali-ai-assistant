import { useState, useRef, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import Header from './components/Header'
import QuickCategories from './components/QuickCategories'
import VoiceButton from './components/VoiceButton'
import { CARDS } from './components/SpecialCard'
import products from './data/products.json'

const LANGS = {
  en: { label: 'EN', flag: '🇬🇧', voice: 'en-IN' },
  hi: { label: 'HI', flag: '🇮🇳', voice: 'hi-IN' },
  pa: { label: 'PA', flag: '🇮🇳', voice: 'pa-IN' },
  gu: { label: 'GU', flag: '🇮🇳', voice: 'gu-IN' },
  ta: { label: 'TA', flag: '🇮🇳', voice: 'ta-IN' },
  bn: { label: 'BN', flag: '🇮🇳', voice: 'bn-IN' },
  mr: { label: 'MR', flag: '🇮🇳', voice: 'mr-IN' },
}

const PROMPTS = {
  en: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in English. Be brief and friendly. End every reply with RECOMMEND: followed by product numbers. Example: "Check out these gorgeous sarees!\nRECOMMEND: 2, 5, 8"`,
  hi: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Hindi/Hinglish. Be brief. End with RECOMMEND: numbers. Example: "Yeh dekhiye best lehengas!\nRECOMMEND: 2, 5, 8"`,
  pa: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Punjabi. Be brief. End with RECOMMEND: numbers. Example: "ਇਹ ਦੇਖੋ ਸਾਡੀਆਂ ਵਧੀਆ ਸਾੜੀਆਂ!\nRECOMMEND: 2, 5, 8"`,
  gu: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Gujarati. Be brief. End with RECOMMEND: numbers. Example: "અમારી શ્રેષ્ઠ સાડીઓ જુઓ!\nRECOMMEND: 2, 5, 8"`,
  ta: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Tamil. Be brief. End with RECOMMEND: numbers. Example: "எங்கள் சிறந்த சேலைகளைப் பாருங்கள்!\nRECOMMEND: 2, 5, 8"`,
  bn: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Bengali. Be brief. End with RECOMMEND: numbers. Example: "আমাদের সেরা শাড়ি দেখুন!\nRECOMMEND: 2, 5, 8"`,
  mr: `Shopping assistant for Maa Kaali Creations (Indian ethnic wear). Reply in Marathi. Be brief. End with RECOMMEND: numbers. Example: "आमच्या उत्तम साड्या पहा!\nRECOMMEND: 2, 5, 8"`,
}

const WELCOME = {
  en: 'Hello! 🙏 Welcome to **Maa Kaali Creations**!\n\nWhat are you looking for today?',
  hi: 'Namaste! 🙏 **Maa Kaali Creations** mein aapka swagat hai!\n\nAaj kya dhundh rahe hain?',
  pa: 'ਸਤ ਸ਼੍ਰੀ ਅਕਾਲ! 🙏 **Maa Kaali Creations** ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!\n\nਅੱਜ ਕੀ ਲੱਭ ਰਹੇ ਹੋ?',
  gu: 'નમસ્તે! 🙏 **Maa Kaali Creations** માં આપનું સ્વાગત છે!\n\nઆજે શું શોધી રહ્યા છો?',
  ta: 'வணக்கம்! 🙏 **Maa Kaali Creations** க்கு வரவேற்கிறோம்!\n\nஇன்று என்ன தேடுகிறீர்கள்?',
  bn: 'নমস্কার! 🙏 **Maa Kaali Creations** এ আপনাকে স্বাগতম!\n\nআজ কী খুঁজছেন?',
  mr: 'नमस्कार! 🙏 **Maa Kaali Creations** मध्ये आपले स्वागत!\n\nआज काय शोधत आहात?',
}

const FALLBACK = {
  en: "Here are some great picks for you! 🛍️", hi: "Yeh dekhiye best options! 🛍️",
  pa: "ਤੁਹਾਡੇ ਲਈ ਵਧੀਆ ਵਿਕਲਪ! 🛍️", gu: "તમારા માટે શ્રેષ્ઠ વિકલ્પો! 🛍️",
  ta: "உங்களுக்கான சிறந்த தேர்வுகள்! 🛍️", bn: "আপনার জন্য সেরা পছন্দ! 🛍️",
  mr: "तुमच्यासाठी उत्तम पर्याय! 🛍️",
}

const ERROR_MSG = {
  en: 'Something went wrong. Try again! 🙏', hi: 'Kuch problem ho gayi. Phir try karein! 🙏',
  pa: 'ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ! 🙏', gu: 'કંઈક ખોટું થયું. ફરી પ્રયાસ કરો! 🙏',
  ta: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்! 🙏', bn: 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন! 🙏',
  mr: 'काहीतरी चूक झाली. पुन्हा प्रयत्न करा! 🙏',
}

function filterRelevantProducts(query) {
  const q = query.toLowerCase()
  let filtered = [...products]
  if (q.includes('saree') || q.includes('साड़ी') || q.includes('sari') || q.includes('சேலை') || q.includes('শাড়ি') || q.includes('સાડી') || q.includes('ਸਾੜੀ')) filtered = filtered.filter(p => p.category === 'sarees')
  else if (q.includes('lehenga') || q.includes('लहंगा') || q.includes('லெஹங்கா') || q.includes('লেহেঙ্গা')) filtered = filtered.filter(p => p.category === 'lehenga choli')
  else if (q.includes('suit') || q.includes('सूट') || q.includes('kurta') || q.includes('kurti')) filtered = filtered.filter(p => p.category === "women's suit sets")
  const pm = q.match(/(?:under|below|within|budget|niche|neeche|andar|নিচে|கீழ்)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i)
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
  return text
    .replace(/RECOMMEND\s*:\s*[#\d,\s]+/gi,'')
    .replace(/<think>[\s\S]*?<\/think>/gi,'')
    .replace(/Thinking Process:[\s\S]*/gi,'')
    .replace(/^#\d+\..*$/gm,'')
    .replace(/\n{3,}/g,'\n\n')
    .trim()
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

const _wd = products.filter(p=>p.originalPrice&&p.price<p.originalPrice)
const _maxD = Math.max(..._wd.map(p=>Math.round((1-p.price/p.originalPrice)*100)))

const specialMsgs = {
  en: { blog:"Check out our blog for styling tips! 📝", announcement:`Our collection has ${products.length} products! 📢`, contact:"We'd love to hear from you! 📞", about:"Here's about us! 🙏", shipping:"Our delivery & return policy 🚚" },
  hi: { blog:"Humare blogs mein styling tips padhein! 📝", announcement:`Humare collection mein ${products.length} products hain! 📢`, contact:"Humse baat karein! 📞", about:"Humare baare mein! 🙏", shipping:"Delivery aur return policy 🚚" },
  pa: { blog:"ਸਾਡੇ ਬਲੌਗ ਪੜ੍ਹੋ! 📝", announcement:`ਸਾਡੇ ਕੋਲ ${products.length} ਉਤਪਾਦ ਹਨ! 📢`, contact:"ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ! 📞", about:"ਸਾਡੇ ਬਾਰੇ! 🙏", shipping:"ਡਿਲੀਵਰੀ ਨੀਤੀ 🚚" },
  gu: { blog:"અમારા બ્લોગ વાંચો! 📝", announcement:`અમારી પાસે ${products.length} ઉત્પાદનો છે! 📢`, contact:"અમારો સંપર્ક કરો! 📞", about:"અમારા વિશે! 🙏", shipping:"ડિલિવરી નીતિ 🚚" },
  ta: { blog:"எங்கள் வலைப்பதிவுகளைப் படியுங்கள்! 📝", announcement:`எங்களிடம் ${products.length} தயாரிப்புகள் உள்ளன! 📢`, contact:"எங்களைத் தொடர்பு கொள்ளுங்கள்! 📞", about:"எங்களைப் பற்றி! 🙏", shipping:"டெலிவரி கொள்கை 🚚" },
  bn: { blog:"আমাদের ব্লগ পড়ুন! 📝", announcement:`আমাদের ${products.length}টি পণ্য আছে! 📢`, contact:"আমাদের সাথে যোগাযোগ করুন! 📞", about:"আমাদের সম্পর্কে! 🙏", shipping:"ডেলিভারি নীতি 🚚" },
  mr: { blog:"आमचे ब्लॉग वाचा! 📝", announcement:`आमच्याकडे ${products.length} उत्पादने आहेत! 📢`, contact:"आमच्याशी संपर्क साधा! 📞", about:"आमच्याबद्दल! 🙏", shipping:"डिलिव्हरी धोरण 🚚" },
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [dark, setDark] = useState(false)
  const [messages, setMessages] = useState([{ role:'assistant', content:WELCOME.en, products:[] }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    const savedDark = localStorage.getItem('mkc-dark') === 'true'
    setDark(savedDark)
    if (savedDark) document.documentElement.classList.add('dark')
  }, [])

  function toggleDark() {
    setDark(d => {
      const next = !d
      localStorage.setItem('mkc-dark', next)
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  useEffect(() => { try { const s=localStorage.getItem('mkc-chat'); if(s){const{msgs,language}=JSON.parse(s);if(msgs?.length>0){setMessages(msgs);setLang(language||'en')}} } catch(e){} }, [])
  useEffect(() => { if(messages.length>1) localStorage.setItem('mkc-chat',JSON.stringify({msgs:messages,language:lang})) }, [messages,lang])
  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])

  function handleLangChange(l) { setLang(l); setMessages([{role:'assistant',content:WELCOME[l]||WELCOME.en,products:[]}]); localStorage.removeItem('mkc-chat') }
  function resetChat() { setMessages([{role:'assistant',content:WELCOME[lang],products:[]}]); localStorage.removeItem('mkc-chat') }

  async function handleSend(text) {
    const msg = text || input.trim()
    if (!msg || isLoading) return
    setInput('')
    setMessages(prev => [...prev, { role:'user', content:msg, products:[] }])

    const special = detectSpecialQuery(msg)
    if (special) {
      const sm = specialMsgs[lang] || specialMsgs.en
      setMessages(prev => [...prev, { role:'assistant', content:sm[special], products:[], specialCard:special }])
      return
    }

    setIsLoading(true)
    try {
      const rp = filterRelevantProducts(msg)
      const ctx = buildProductContext(rp)
      const hist = messages.slice(-6).map(m=>({role:m.role,content:m.content}))
      const prompt = PROMPTS[lang] || PROMPTS.en
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[{role:'system',content:prompt+'\n\nAVAILABLE PRODUCTS:\n'+ctx},...hist,{role:'user',content:msg}] }) })
      if (!res.ok) throw new Error('fail')
      const data = await res.json()
      let ai = data.choices?.[0]?.message?.content || ''
      if (!ai || ai.length<10 || ai.includes('FORMAT') || ai.includes('STRICT') || ai.includes('Thinking Process')) {
        setMessages(prev=>[...prev,{role:'assistant',content:FALLBACK[lang]||FALLBACK.en,products:rp.slice(0,4)}])
      } else {
        const recs = extractProductIndices(ai,rp)
        setMessages(prev=>[...prev,{role:'assistant',content:cleanResponse(ai),products:recs.length>0?recs:rp.slice(0,4)}])
      }
    } catch(e) {
      setMessages(prev=>[...prev,{role:'assistant',content:ERROR_MSG[lang]||ERROR_MSG.en,products:[]}])
    } finally { setIsLoading(false) }
  }

  const showIntro = messages.length <= 1

  return (
    <div className="h-full flex justify-center bg-[#fff7ed] dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-md flex flex-col h-full p-2 sm:p-3">

        <Header lang={lang} langs={LANGS} onLangChange={handleLangChange} showNewChat={!showIntro} onNewChat={resetChat} dark={dark} onToggleDark={toggleDark} />

        {showIntro && <QuickCategories onSelect={handleSend} lang={lang} />}

        <ChatWindow messages={messages} isLoading={isLoading} messagesEndRef={endRef} />

        {/* Input */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl p-2 mt-1.5 border border-brand-100 dark:border-gray-800 shadow-sm">
          <div className="flex gap-1.5 items-end">
            <VoiceButton lang={LANGS[lang]?.voice || 'en-IN'} onResult={setInput} />
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend()} }}
              placeholder={lang==='en'?"Type or speak...":lang==='hi'?"Type karein ya bolein...":"Type or speak..."}
              className="flex-1 resize-none bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm max-h-20 min-h-[36px] py-1.5 px-1"
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
          <div className="flex items-center justify-center gap-3 mt-1">
            <p className="text-[8px] text-gray-300 dark:text-gray-600">Powered by osmAPI</p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/maakaali_creations" target="_blank" rel="noopener noreferrer" className="text-gray-300 dark:text-gray-600 hover:text-pink-500 transition-colors" title="Instagram">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/maakaalicreations" target="_blank" rel="noopener noreferrer" className="text-gray-300 dark:text-gray-600 hover:text-blue-500 transition-colors" title="Facebook">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@maakaalicreations" target="_blank" rel="noopener noreferrer" className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors" title="YouTube">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
