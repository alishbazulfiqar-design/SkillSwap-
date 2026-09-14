import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
type View = 'dashboard' | 'live-session'| 'host-workshop'
 export default function Hero({ onOpenListing, setView }: { onOpenListing: () => void; setView: (v: View) => void }) {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()
  return (
     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#1e3a5f] to-[#0f2240] p-8 sm:p-10 text-white text-center">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #10B981 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 50%)' }} />
      <div className="relative">
        <p className="text-[#10B981] text-sm font-semibold tracking-widest uppercase mb-3">Welcome to</p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Learn Something New,<br />
          <span className="text-[#10B981]">Pay with Your Time.</span>
        </h1>
        <p className="text-slate-300 text-sm mt-3 mb-6">Exchange skills hour-for-hour with verified peers worldwide.</p>
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <button onClick={onOpenListing} className="px-6 py-2.5 bg-[#10B981] text-white rounded-xl font-semibold text-sm hover:bg-emerald-400 transition-colors">
            Request a Skill
          </button>
          <button onClick={() => navigate('host-workshop')} className="px-6 py-2.5 bg-[#8B5CF6] text-white rounded-xl font-semibold text-sm hover:bg-violet-400 transition-colors">
            Offer Your Time
          </button>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 max-w-md mx-auto">
          <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
            placeholder="What do you want to learn today?"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          {prompt && <button className="text-[#10B981] text-xs font-semibold">Go →</button>}
        </div>
      </div>
    </div>
  )
}