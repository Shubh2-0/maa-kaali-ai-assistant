import { useState } from 'react'

export default function Header({ lang, langs, onLangChange, showNewChat, onNewChat, dark, onToggleDark }) {
  const [showLangs, setShowLangs] = useState(false)

  return (
    <header className="flex items-center justify-between py-2 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <img src="/logo.png" alt="Maa Kaali Creations" className="w-10 h-10 rounded-xl shadow-md" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#fff7ed] dark:border-gray-950" />
        </div>
        <div>
          <h1 className="font-display text-base font-bold text-gray-800 dark:text-white leading-tight">
            Maa Kaali <span className="text-brand-500">Creations</span>
          </h1>
          <p className="text-[9px] text-gray-400">AI Shopping Assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {showNewChat && (
          <button onClick={onNewChat}
            className="flex items-center gap-1 bg-brand-50 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-gray-700 text-brand-600 dark:text-brand-400 text-[10px] font-semibold px-2 py-1.5 rounded-lg border border-brand-200 dark:border-gray-700 transition-all">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New
          </button>
        )}

        {/* Dark mode */}
        <button onClick={onToggleDark}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-gray-800 border border-brand-200 dark:border-gray-700 text-gray-500 dark:text-yellow-400 hover:bg-brand-50 dark:hover:bg-gray-700 transition-all shadow-sm text-sm">
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Language dropdown */}
        <div className="relative">
          <button onClick={() => setShowLangs(!showLangs)}
            className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-brand-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-[10px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-gray-700 transition-all shadow-sm">
            {langs[lang]?.flag} {langs[lang]?.label || 'EN'}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {showLangs && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLangs(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-brand-200 dark:border-gray-700 rounded-xl shadow-lg z-20 py-1 min-w-[120px]">
                {Object.entries(langs).map(([key, val]) => (
                  <button key={key}
                    onClick={() => { onLangChange(key); setShowLangs(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium hover:bg-brand-50 dark:hover:bg-gray-700 transition-all ${
                      lang === key ? 'text-brand-600 bg-brand-50 dark:bg-gray-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-300'
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
