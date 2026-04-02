import products from '../data/products.json'

// Calculate real stats from DB
const withDiscount = products.filter(p => p.originalPrice && p.price < p.originalPrice)
const maxDiscount = Math.max(...withDiscount.map(p => Math.round((1 - p.price / p.originalPrice) * 100)))
const totalProducts = products.length
const sareeCount = products.filter(p => p.category === 'sarees').length
const lehengaCount = products.filter(p => p.category === 'lehenga choli').length
const suitCount = products.filter(p => p.category === "women's suit sets").length
const minPrice = Math.min(...products.map(p => p.price))
const maxPrice = Math.max(...products.map(p => p.price))

const CARDS = {
  blog: {
    icon: '📝', title: 'Our Blogs',
    description: 'Read styling tips, fashion trends, and ethnic wear guides.',
    link: 'https://maakaalicreations.in/blogs', btnText: 'Read Blogs',
    gradient: 'from-purple-500 to-indigo-600', bg: 'bg-gradient-to-br from-purple-50 to-indigo-50', border: 'border-purple-200',
  },
  discount: {
    icon: '🏷️', title: 'Offers & Discounts',
    description: `Up to ${maxDiscount}% OFF! ${withDiscount.length} products on sale. Prices starting from ₹${minPrice}.`,
    link: 'https://maakaalicreations.in/shop', btnText: 'Shop Now',
    gradient: 'from-red-500 to-pink-600', bg: 'bg-gradient-to-br from-red-50 to-pink-50', border: 'border-red-200',
  },
  announcement: {
    icon: '📢', title: 'Our Collection',
    description: `${totalProducts} products — ${sareeCount} Sarees, ${lehengaCount} Lehengas, ${suitCount} Suit Sets. New arrivals every week!`,
    link: 'https://maakaalicreations.in', btnText: 'Visit Store',
    gradient: 'from-amber-500 to-orange-600', bg: 'bg-gradient-to-br from-amber-50 to-orange-50', border: 'border-amber-200',
  },
  contact: {
    icon: '📞', title: 'Contact Us',
    description: "Have questions? We're happy to help anytime!",
    link: 'https://maakaalicreations.in/contact', btnText: 'Contact',
    gradient: 'from-green-500 to-emerald-600', bg: 'bg-gradient-to-br from-green-50 to-emerald-50', border: 'border-green-200',
  },
  about: {
    icon: '🙏', title: 'About Us',
    description: `Trusted Indian ethnic wear brand with 1000+ happy customers. ${totalProducts} products from ₹${minPrice} to ₹${maxPrice}.`,
    link: 'https://maakaalicreations.in/about', btnText: 'Learn More',
    gradient: 'from-brand-500 to-amber-500', bg: 'bg-gradient-to-br from-orange-50 to-amber-50', border: 'border-brand-200',
  },
  shipping: {
    icon: '🚚', title: 'Shipping & Returns',
    description: 'Free delivery on orders above ₹999. Easy 7-day return policy. Cash on Delivery available.',
    link: 'https://maakaalicreations.in/shipping-policy', btnText: 'View Policy',
    gradient: 'from-blue-500 to-cyan-600', bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', border: 'border-blue-200',
  },
}

export default function SpecialCard({ type }) {
  const card = CARDS[type]
  if (!card) return null

  return (
    <div className={`${card.bg} ${card.border} border rounded-xl p-3.5 ml-9 mt-2 shadow-sm`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{card.icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm">{card.title}</h3>
          <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{card.description}</p>
          <a href={card.link} target="_blank" rel="noopener noreferrer"
            className={`inline-block mt-2 bg-gradient-to-r ${card.gradient} text-white text-[11px] font-semibold px-4 py-1.5 rounded-full shadow hover:shadow-md hover:scale-105 transition-all`}>
            {card.btnText} →
          </a>
        </div>
      </div>
    </div>
  )
}

export { CARDS }
