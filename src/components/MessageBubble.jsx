import ReactMarkdown from 'react-markdown'

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="relative flex-shrink-0 mr-2 mt-0.5">
          <img src="/logo.png" alt="" className="w-7 h-7 rounded-lg shadow-sm" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
        isUser
          ? 'bg-brand-500 text-white rounded-br-sm shadow-md'
          : 'bg-brand-50/80 text-gray-800 rounded-bl-sm border border-brand-100'
      }`}>
        {isUser ? (
          <p>{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-strong:text-brand-600 prose-a:text-brand-500 prose-a:underline">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold flex-shrink-0 ml-2 mt-0.5">
          You
        </div>
      )}
    </div>
  )
}
