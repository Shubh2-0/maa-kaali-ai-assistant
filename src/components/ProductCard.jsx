export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const url = `https://maakaalicreations.in/product/${product.slug || product.id}`

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="prod-card bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm block group">
      <div className="relative aspect-[3/4] bg-brand-50 overflow-hidden">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {discount > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow">
            {discount}% OFF
          </span>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-white font-medium">View Product →</span>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-[11px] font-medium text-gray-700 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs font-bold text-brand-600">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-[9px] text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </a>
  )
}
