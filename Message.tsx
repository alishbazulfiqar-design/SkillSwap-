import { chatsByConversation, conversations } from '../data/mockData'
import { useState, useEffect, useRef } from 'react'
import Avatar from '../primitives/Avatar'
import VerifiedBadge from '../primitives/Badges'
import SkillSwapProfile from '../components/Profile'
import { useNavigate } from 'react-router-dom'
import Users from '../pages/Users'

export type Conversation = {
  id: number; name: string; initials: string; color: string
  online: boolean; time: string; preview: string; unread: number
  rating?: number; verified?: boolean
}

export type ChatMessage = {
  id: number; from: 'me' | 'other'; text: string; time: string; hasActions?: boolean
}

function ConversationItem({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-all border-b border-slate-100 last:border-0 ${active ? 'bg-violet-50 border-l-2 border-l-[#8B5CF6]' : 'hover:bg-slate-50'}`}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <Avatar initials={conv.initials} color={conv.color} />
        {conv.online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-semibold truncate ${active ? 'text-[#8B5CF6]' : 'text-slate-800'}`}>{conv.name}</span>
          <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{conv.time}</span>
        </div>
        <p className="text-xs text-slate-500 truncate leading-relaxed">{conv.preview}</p>
      </div>
      {conv.unread > 0 && (
        <span className="w-5 h-5 bg-[#8B5CF6] rounded-full text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-1">{conv.unread}</span>
      )}
    </button>
  )
}

function SkeletonConvItem({ num }: { num: number }) {
  return (
    <div className="px-4 py-3.5 flex items-center gap-3 border-b border-slate-100">
      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-slate-400">{num}</span>
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
        <div className="h-2.5 bg-slate-100 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  )
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isMe = msg.from === 'me'
  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isMe ? 'bg-[#8B5CF6] text-white rounded-br-md' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'}`}>
        <p>{msg.text}</p>
        {msg.hasActions && (
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-200">
            {[
              { path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { path: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
            ].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon.path} />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
    </div>
  )
}

export default function MessagesView() {
  const [activeId, setActiveId] = useState(3)
  const [text, setText] = useState('')
  const [chats, setChats] = useState<Record<number, ChatMessage[]>>(chatsByConversation)
  const [mobilePanel, setMobilePanel] = useState<'list' | 'chat'>('list')
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const activeConv = conversations.find(c => c.id === activeId) ?? conversations[0]
  const messages = chats[activeId] ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeId, messages.length])

  const sendMessage = () => {
    if (!text.trim()) return
    const newMsg: ChatMessage = { id: Date.now(), from: 'me', text: text.trim(), time: 'just now' }
    setChats(prev => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }))
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const selectConversation = (id: number) => {
    setActiveId(id)
    setMobilePanel('chat')
  }

  return (
    <main className="flex w-full bg-white h-[calc(100vh-145px)] min-h-[500px]">

      {/* Left panel — conversation list */}
      <div className={`${mobilePanel === 'list' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-72 lg:w-80 bg-white border-r border-slate-200 flex-shrink-0 h-full min-h-0`}>
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: 'Outfit, sans-serif' }}>Messages</h2>
          <button className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search conversations..." />
          </div>
        </div>

        {/* Sidebar Conversations Scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {conversations.map(conv => (
            <ConversationItem key={conv.id} conv={conv} active={conv.id === activeId} onClick={() => selectConversation(conv.id)} />
          ))}
          {[10, 11, 12, 13].map(n => <SkeletonConvItem key={n} num={n} />)}
        </div>
      </div>

      {/* Right panel — chat */}
      <div className={`${mobilePanel === 'chat' ? 'flex' : 'hidden'} md:flex flex-col h-full flex-1 min-h-0 min-w-0 bg-[#F8FAFC]`}>

        {/* Chat header */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap flex-shrink-0">
          {/* Mobile back */}
          <button onClick={() => setMobilePanel('list')} className="md:hidden w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition-colors">
            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Contact info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <Avatar initials={activeConv.initials} color={activeConv.color} size="lg" />
              {activeConv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#1E293B] text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>{activeConv.name}</span>
                {activeConv.verified && <VerifiedBadge />}
                {activeConv.rating && (
                  <span className="flex items-center gap-1 text-xs text-slate-600">
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {activeConv.rating}/5
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Verified · {activeConv.online ? 'Online now' : 'Offline'}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <button className="px-4 py-2 bg-[#8B5CF6] hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-colors">
              Request Swap
            </button>
            <button onClick={() => navigate('/profile')} className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors hidden sm:block">
              View Profile
            </button>
            <button onClick={() => navigate('/users')} className="hidden sm:block flex items-center gap-2 px-4 py-2 bg-[#10B981] hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold transition-colors">
              View Users
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-sm font-medium text-slate-500">No messages yet</p>
              <p className="text-xs text-slate-400 mt-1">Say hello to {activeConv.name}!</p>
            </div>
          ) : (
            messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)
          )}
          <div ref={bottomRef} />
        </div>

        {/* Composer - Fixed at bottom of chat */}
        <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3 flex-shrink-0">
          <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-violet-100 transition-all">
            <textarea
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none max-h-28 leading-relaxed"
              placeholder={`Type your message to ${activeConv.name.split(' ')[0]}...`}
              rows={1}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ height: 'auto', minHeight: '24px' }}
              onInput={e => {
                const t = e.target as HTMLTextAreaElement
                t.style.height = 'auto'
                t.style.height = `${Math.min(t.scrollHeight, 112)}px`
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              {[
                { tip: 'Attach file', path: 'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' },
                { tip: 'Emoji', path: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { tip: 'Schedule', path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              ].map(btn => (
                <button key={btn.tip} title={btn.tip} className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={btn.path} /></svg>
                </button>
              ))}
              {text && (
                <button onClick={() => setText('')} className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all"
            >
              Send
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}