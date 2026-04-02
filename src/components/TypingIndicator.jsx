export default function TypingIndicator() {
  return (
    <div className="flex justify-start msg-anim">
      <img src="/logo.png" alt="" className="w-7 h-7 rounded-md flex-shrink-0 mr-2 mt-0.5" />
      <div className="bg-brand-50 rounded-2xl rounded-bl-sm px-4 py-2.5 border border-brand-100">
        <div className="flex gap-1">
          <span className="typing-dot w-1.5 h-1.5 bg-brand-300 rounded-full inline-block" />
          <span className="typing-dot w-1.5 h-1.5 bg-brand-300 rounded-full inline-block" />
          <span className="typing-dot w-1.5 h-1.5 bg-brand-300 rounded-full inline-block" />
        </div>
      </div>
    </div>
  )
}
