const suggestions = {
  en: [
    'Red silk saree under ₹2000',
    'Show me wedding lehengas',
    'Any discounts or offers?',
    'Read blogs',
    'Contact us',
    'Shipping & returns',
  ],
  hi: [
    'Red silk saree under ₹2000',
    'Wedding lehenga dikhao',
    'Koi discount ya offer?',
    'Blogs padhein',
    'Contact karo',
    'Delivery policy',
  ]
}

export default function SuggestedQueries({ onSelect, lang }) {
  const items = suggestions[lang] || suggestions.en
  return (
    <div className="flex flex-wrap gap-1.5 py-2 flex-shrink-0">
      {items.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)}
          className="bg-white border border-brand-200 rounded-full px-3 py-1.5 text-xs text-gray-600 hover:text-brand-600 hover:border-brand-400 transition-all shadow-sm">
          {s}
        </button>
      ))}
    </div>
  )
}
