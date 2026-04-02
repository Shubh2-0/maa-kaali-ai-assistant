import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) return
    let i = 0
    setDisplayed('')
    setDone(false)
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 18)
    return () => clearInterval(timer)
  }, [text])

  return (
    <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-strong:text-brand-600 prose-a:text-brand-500 prose-a:underline dark:prose-invert dark:prose-strong:text-brand-400">
      <ReactMarkdown>{displayed}</ReactMarkdown>
      {!done && <span className="inline-block w-1 h-4 bg-brand-500 dark:bg-brand-400 animate-pulse ml-0.5 align-middle" />}
    </div>
  )
}

export default function MessageBubble({ role, content, isLatest }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="relative flex-shrink-0 mr-2 mt-0.5">
          <img src="/logo.png" alt="" className="w-7 h-7 rounded-lg shadow-sm" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
        isUser
          ? 'bg-brand-500 text-white rounded-br-sm shadow-md'
          : 'bg-brand-50/80 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-brand-100 dark:border-gray-700'
      }`}>
        {isUser ? (
          <p>{content}</p>
        ) : isLatest ? (
          <TypingText text={content} />
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-strong:text-brand-600 prose-a:text-brand-500 prose-a:underline dark:prose-invert">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-300 text-[10px] font-bold flex-shrink-0 ml-2 mt-0.5">
          You
        </div>
      )}
    </div>
  )
}
