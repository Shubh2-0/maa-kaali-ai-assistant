import { useState, useRef } from 'react'

export default function VoiceButton({ lang, onResult }) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const supported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      onResult(text)
      setListening(false)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  if (!supported) return null

  return (
    <button
      onClick={toggle}
      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        listening
          ? 'bg-red-500 text-white animate-pulse shadow-md'
          : 'bg-brand-50 text-brand-500 hover:bg-brand-100'
      }`}
      title={listening ? 'Listening...' : 'Voice input'}
    >
      {listening ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      )}
    </button>
  )
}
