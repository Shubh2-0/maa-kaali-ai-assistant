import { useState } from 'react'

export default function ProductCard({ product }) {
  const [zoomed, setZoomed] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const url = `https://maakaalicreations.in/product/${product.slug || product.id}`
  const shareText = `${product.name} at ₹${product.price}${discount > 0 ? ` (${discount}% OFF!)` : ''} — Maa Kaali Creations`

  function share(platform, e) {
    e.preventDefault(); e.stopPropagation()
    const links = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      copy: null,
    }
    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      setShowShare(false)
      return
    }
    window.open(links[platform], '_blank')
    setShowShare(false)
  }

  return (
    <>
      <div className="prod-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm group">
        <div className="relative aspect-[3/4] bg-brand-50 dark:bg-gray-700 overflow-hidden cursor-pointer" onClick={() => setZoomed(true)}>
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          {discount > 0 && (
            <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow">
              {discount}% OFF
            </span>
          )}
          {/* Share button */}
          <button onClick={(e) => { e.stopPropagation(); setShowShare(!showShare) }}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            title="Share">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          {/* Share dropdown */}
          {showShare && (
            <div className="absolute top-8 right-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 min-w-[130px]" onClick={e => e.stopPropagation()}>
              <button onClick={(e) => share('whatsapp', e)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] hover:bg-green-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                <span className="text-green-500">●</span> WhatsApp
              </button>
              <button onClick={(e) => share('facebook', e)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                <span className="text-blue-500">●</span> Facebook
              </button>
              <button onClick={(e) => share('twitter', e)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] hover:bg-sky-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                <span className="text-sky-500">●</span> Twitter / X
              </button>
              <button onClick={(e) => share('copy', e)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                <span className="text-gray-400">●</span> Copy Link
              </button>
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-white font-medium">Tap to zoom</span>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="block p-2">
          <h3 className="text-[11px] font-medium text-gray-700 dark:text-gray-200 line-clamp-2 leading-tight hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[9px] text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </a>
      </div>

      {/* Zoom Modal */}
      {zoomed && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setZoomed(false)}>
          <div className="relative max-w-sm w-full">
            <img src={product.image} alt={product.name} className="w-full rounded-xl shadow-2xl" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl p-3">
              <p className="text-white text-sm font-medium">{product.name}</p>
              <p className="text-white/80 text-xs mt-0.5">₹{product.price} {discount > 0 && `(${discount}% OFF)`}</p>
            </div>
            <button onClick={() => setZoomed(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
