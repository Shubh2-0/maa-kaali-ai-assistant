export default function Header({ lang, onLangChange, showNewChat, onNewChat }) {
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

      <div className="flex items-center gap-2">
        {showNewChat && (
          <button onClick={onNewChat}
            className="flex items-center gap-1 bg-brand-50 hover:bg-brand-100 text-brand-600 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-brand-200 transition-all">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New
          </button>
        )}
        <div className="flex rounded-lg overflow-hidden border border-brand-200 text-[11px] shadow-sm">
          <button onClick={() => onLangChange('en')}
            className={`px-2.5 py-1.5 font-semibold transition-all ${lang === 'en' ? 'bg-brand-500 text-white' : 'text-gray-400 bg-white hover:bg-brand-50'}`}>
            EN
          </button>
          <button onClick={() => onLangChange('hi')}
            className={`px-2.5 py-1.5 font-semibold transition-all ${lang === 'hi' ? 'bg-brand-500 text-white' : 'text-gray-400 bg-white hover:bg-brand-50'}`}>
            HI
          </button>
        </div>
      </div>
    </header>
  )
}
