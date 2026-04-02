import { useState, useEffect } from 'react'
import products from '../data/products.json'

const cats = [
  { label: 'Sarees', key: 'sarees' },
  { label: 'Lehengas', key: 'lehenga choli' },
  { label: 'Suit Sets', key: "women's suit sets" },
]

const imagesByCategory = cats.map(c =>
  products.filter(p => p.category === c.key).slice(0, 2).map(p => p.image)
)

export default function HeroBanner() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center gap-3 py-3 flex-shrink-0">
      {/* Left image */}
      <div className="w-20 sm:w-24 flex-shrink-0 rounded-xl overflow-hidden aspect-[3/4] shadow border border-brand-100">
        <img src={imagesByCategory[idx][0]} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Center */}
      <div className="flex-1 text-center">
        <p className="text-[10px] text-brand-400 font-semibold tracking-widest uppercase">Explore</p>
        <h2 className="font-display text-xl font-bold text-gray-800 mt-0.5">{cats[idx].label}</h2>
        <p className="text-[11px] text-gray-400 mt-0.5">344+ Products</p>
        <div className="flex justify-center gap-1.5 mt-2">
          {cats.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? 'bg-brand-500 w-5' : 'bg-brand-200 w-1.5'}`}
            />
          ))}
        </div>
      </div>

      {/* Right image */}
      <div className="w-20 sm:w-24 flex-shrink-0 rounded-xl overflow-hidden aspect-[3/4] shadow border border-brand-100">
        <img src={imagesByCategory[idx][1]} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
