import MessageBubble from './MessageBubble'
import ProductCard from './ProductCard'
import SpecialCard from './SpecialCard'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({ messages, isLoading, messagesEndRef }) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white p-3 space-y-3 border border-brand-100">
      {messages.map((msg, i) => (
        <div key={i} className="msg-anim">
          <MessageBubble role={msg.role} content={msg.content} />
          {msg.specialCard && <SpecialCard type={msg.specialCard} />}
          {msg.products?.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2 pl-9">
              {msg.products.map((p, j) => <ProductCard key={j} product={p} />)}
            </div>
          )}
        </div>
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  )
}
