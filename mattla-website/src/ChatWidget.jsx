import { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

const welcomeMessage = {
  role: 'assistant',
  content: 'Hello — I am Mattla’s AI assistant. Ask about our energy engineering services, project capabilities, or how to start a conversation with the team.',
}

const suggestedQuestions = [
  'What renewable energy services do you offer?',
  'Can Mattla help with Grid Code compliance?',
  'How do I discuss a project with the team?',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isLoading])

  async function sendMessage(message) {
    const content = message.trim()
    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const responseText = await response.text()
      let data

      try {
        data = responseText ? JSON.parse(responseText) : {}
      } catch {
        throw new Error('The AI assistant endpoint is unavailable. Please try again later or contact the Mattla team.')
      }

      if (!response.ok || !data.message) {
        throw new Error(data.error || 'The AI assistant is unavailable. Please try again later or contact the Mattla team.')
      }

      setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: data.message }])
    } catch (requestError) {
      setError(requestError.message || 'The assistant is unavailable. Please contact the Mattla team directly.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <section className="chat-widget">
      {isOpen && (
        <div className="chat-panel" id="mattla-chat" role="dialog" aria-modal="false" aria-label="Mattla AI assistant">
          <header className="chat-header">
            <div>
              <span className="chat-status" aria-hidden="true" />
              <p>Mattla AI</p>
              <small>Engineering assistant</small>
            </div>
            <button className="chat-close" type="button" aria-label="Close Mattla AI assistant" onClick={() => setIsOpen(false)}>×</button>
          </header>

          <div className="chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message, index) => <p className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>)}
            {isLoading && <p className="chat-message assistant chat-typing" aria-label="Mattla AI is typing"><span /><span /><span /></p>}
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions">
              {suggestedQuestions.map((question) => <button type="button" key={question} onClick={() => sendMessage(question)}>{question}</button>)}
            </div>
          )}

          {error && <p className="chat-error" role="alert">{error} <a href="mailto:info@mattla.co.za">Email the team</a></p>}

          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about Mattla Engineering…" aria-label="Your message" maxLength="1200" rows="1" disabled={isLoading} />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || isLoading}>↗</button>
          </form>
        </div>
      )}

     {/* <button className="chat-launcher" type="button" aria-expanded={isOpen} aria-controls="mattla-chat" onClick={() => setIsOpen((open) => !open)}>
        <span aria-hidden="true">{isOpen ? '×' : '✦'}</span>
        <span>{isOpen ? 'Close' : 'Ask Mattla AI'}</span>
      </button>*/}
    </section>
  )
}
