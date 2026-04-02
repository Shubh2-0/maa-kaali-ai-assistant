import { useState } from 'react'

export default function Header({ lang, langs, onLangChange, showNewChat, onNewChat }) {
  const [showLangs, setShowLangs] = useState(false)

  return (
    <header className="flex items-center justify-between py-2 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <img src="/logo.png" alt="Maa Kaali Creations" className="w-10 h-10 rounded-xl shadow-md" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#fff7ed]" />
        </div>
        <div>
          <h1 className="font-display text-base font-bold text-gray-800 leading-tight">
            Maa Kaali <span className="text-brand-500">Creations</span>
          </h1>
          <p className="text-[9px] text-gray-400">AI Shopping Assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {showNewChat && (
          <button onClick={onNewChat}
            className="flex items-center gap-1 bg-brand-50 hover:bg-brand-100 text-brand-600 text-[10px] font-semibold px-2 py-1.5 rounded-lg border border-brand-200 transition-all">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New
          </button>
        )}

        {/* Language dropdown */}
        <div className="relative">
          <button onClick={() => setShowLangs(!showLangs)}
            className="flex items-center gap-1 bg-white border border-brand-200 rounded-lg px-2 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-brand-50 transition-all shadow-sm">
            {langs[lang]?.flag} {langs[lang]?.label || 'EN'}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {showLangs && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLangs(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-brand-200 rounded-xl shadow-lg z-20 py-1 min-w-[120px]">
                {Object.entries(langs).map(([key, val]) => (
                  <button key={key}
                    onClick={() => { onLangChange(key); setShowLangs(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium hover:bg-brand-50 transition-all ${
                      lang === key ? 'text-brand-600 bg-brand-50' : 'text-gray-600'
                    }`}>
                    <span>{val.flag}</span>
                    <span>{val.label}</span>
                    {lang === key && <span className="ml-auto text-brand-500">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
