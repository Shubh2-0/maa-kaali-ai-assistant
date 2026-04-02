const categories = {
  en: [
    { emoji: '👗', label: 'Sarees', query: 'Show me best sarees' },
    { emoji: '💃', label: 'Lehengas', query: 'Show me lehengas' },
    { emoji: '👘', label: 'Suit Sets', query: 'Show me suit sets' },
    { emoji: '🏷️', label: 'Under ₹999', query: 'Products under ₹999' },
  ],
  hi: [
    { emoji: '👗', label: 'Sarees', query: 'Best sarees dikhao' },
    { emoji: '💃', label: 'Lehengas', query: 'Lehenga dikhao' },
    { emoji: '👘', label: 'Suit Sets', query: 'Suit sets dikhao' },
    { emoji: '🏷️', label: '₹999 ke andar', query: '₹999 ke andar products' },
  ]
}

const suggestions = {
  en: [
    'Red silk saree under ₹2000',
    'Wedding collection',
    'Best sellers',
    'Read blogs',
    'Contact us',
  ],
  hi: [
    'Red silk saree ₹2000 ke andar',
    'Wedding collection',
    'Best sellers',
    'Blogs padhein',
    'Contact karo',
  ]
}

export default function QuickCategories({ onSelect, lang }) {
  const cats = categories[lang] || categories.en
  const sugg = suggestions[lang] || suggestions.en

  return (
    <div className="flex-shrink-0 space-y-2 py-1.5">
      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto">
        {cats.map((cat, i) => (
          <button key={i} onClick={() => onSelect(cat.query)}
            className="flex items-center gap-1.5 bg-white border border-brand-100 rounded-full px-3 py-1.5 hover:border-brand-400 hover:bg-brand-50 transition-all shadow-sm flex-shrink-0 group">
            <span className="text-sm group-hover:scale-110 transition-transform">{cat.emoji}</span>
            <span className="text-[11px] font-medium text-gray-600 group-hover:text-brand-600 whitespace-nowrap">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-1.5">
        {sugg.map((s, i) => (
          <button key={i} onClick={() => onSelect(s)}
            className="text-[10px] text-gray-500 hover:text-brand-600 bg-brand-50/50 hover:bg-brand-50 border border-brand-100/50 hover:border-brand-200 rounded-full px-2.5 py-1 transition-all">
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
