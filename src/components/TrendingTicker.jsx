import products from '../data/products.json'

const trending = products
  .filter(p => p.originalPrice && p.price < p.originalPrice)
  .sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price))
  .slice(0, 10)

export default function TrendingTicker() {
  const items = [...trending, ...trending]
  return (
    <div className="overflow-hidden py-1.5 flex-shrink-0">
      <p className="text-[9px] font-bold text-brand-500 uppercase tracking-widest mb-1 px-0.5">🔥 Trending Now</p>
      <div className="flex gap-2 animate-scroll">
        {items.map((p, i) => (
          <a key={i} href={`https://maakaalicreations.in/product/${p.id}`} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-brand-100 rounded-full pl-0.5 pr-2.5 py-0.5 hover:border-brand-400 hover:shadow transition-all">
            <img src={p.image} alt="" className="w-6 h-6 rounded-full object-cover border border-brand-50" />
            <div>
              <p className="text-[9px] font-medium text-gray-700 whitespace-nowrap max-w-[100px] truncate">{p.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-brand-600 font-bold">₹{p.price}</span>
                <span className="text-[8px] text-gray-400 line-through">₹{p.originalPrice}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
