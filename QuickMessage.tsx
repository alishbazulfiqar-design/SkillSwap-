import { useState } from 'react'
import {  messages } from '../data/mockData';
import Avatar from '../primitives/Avatar'
import { useNavigate } from 'react-router-dom'
//type View = 'dashboard' | 'live-session' | 'host-workshop' | 'messages'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}/5</span>
    </span>
  )
}

 export default function QuickMessage() {
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const previewMessages = [
    { name: 'Alex Chen', status: 'Pending', message: 'Hello, Ale today?', initials: 'AC', color: '#3B82F6', time: '2m' },
    { name: 'Marlew S.', status: 'Pending', message: 'Why do you want to learn lane?', initials: 'MS', color: '#8B5CF6', time: '15m' },
  ]
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Quick Message</h3>
        <button onClick={() => navigate('messages')} className="text-xs text-[#10B981] font-medium hover:underline">Open</button>
      </div>
      <div className="space-y-3 mb-4">
        {previewMessages.map((m, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <Avatar initials={m.initials} color={m.color} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-semibold text-slate-800">{m.name}</span>
                <span className="text-[10px] text-slate-400">{m.time} ago</span>
                <span className="text-[10px] text-amber-500 font-medium ml-auto">{m.status}</span>
              </div>
              <p className="text-xs text-slate-500 truncate">{m.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <input className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400" placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} />
        <button className="w-7 h-7 bg-[#10B981] rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-colors flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </div>
    </div>
  )
}