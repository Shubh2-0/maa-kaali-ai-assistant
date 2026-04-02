export default function TrustBar() {
  return (
    <div className="flex justify-between bg-white rounded-lg px-3 py-2 border border-brand-100 flex-shrink-0 shadow-sm">
      {[
        { icon: '⭐', label: '1000+', sub: 'Customers' },
        { icon: '🚚', label: 'Free', sub: 'Shipping' },
        { icon: '💳', label: 'COD', sub: 'Available' },
        { icon: '↩️', label: 'Easy', sub: 'Returns' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 text-center">
          <span className="text-sm">{item.icon}</span>
          <div>
            <p className="text-[10px] font-bold text-gray-800 leading-none">{item.label}</p>
            <p className="text-[9px] text-gray-400 leading-none mt-0.5">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
