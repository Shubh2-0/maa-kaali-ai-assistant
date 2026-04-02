import { useState, useEffect } from 'react'
import products from '../data/products.json'

const allImages = [
  ...products.filter(p => p.category === 'sarees').slice(0, 4).map(p => p.image),
  ...products.filter(p => p.category === 'lehenga choli').slice(0, 4).map(p => p.image),
  ...products.filter(p => p.category === "women's suit sets").slice(0, 4).map(p => p.image),
]

export default function SideModels({ side }) {
  const [idx, setIdx] = useState(side === 'left' ? 0 : 3)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(prev => (prev + 1) % allImages.length)
    }, side === 'left' ? 4000 : 5000)
    return () => clearInterval(t)
  }, [side])

  const img1 = allImages[idx % allImages.length]
  const img2 = allImages[(idx + 4) % allImages.length]

  return (
    <div className="hidden lg:flex flex-col gap-3 w-44 xl:w-52 flex-shrink-0 py-4">
      <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-brand-100">
        <img src={img1} alt="Model" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-brand-100">
        <img src={img2} alt="Model" className="w-full h-full object-cover" loading="lazy" />
      </div>
    </div>
  )
}
