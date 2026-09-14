import { useState, useEffect, useRef } from 'react'
import { swapUsers } from '../data/mockData'
import Avatar from '../primitives/Avatar'


  export default function LiveSessionView({ user, onComplete }: { user: typeof swapUsers[0] | null; onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(3600)
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [extended, setExtended] = useState(false)

  useEffect(() => {
    if (showReview) return
    const t = setInterval(() => setTimeLeft(p => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [showReview])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const progress = ((3600 - timeLeft) / 3600) * 100

  if (showReview) {
    return (
       <div className="fixed inset-0 z-50 bg-[#1E293B] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Session Complete!</h2>
          <p className="text-sm text-slate-500 mb-6">⚡ 1.0 Time Credit has been released.</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onClick={() => setRating(i)}>
                <svg className={`w-8 h-8 transition-colors ${i <= rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <textarea className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none resize-none mb-4 focus:border-[#10B981]" rows={3} placeholder="Share your experience..." value={note} onChange={e => setNote(e.target.value)} />
          <button onClick={onComplete} className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-emerald-400 transition-colors">
            Submit & Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
     <div className="flex flex-col h-full bg-[#0F172A] text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#1E293B] border-b border-slate-700 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {user && <Avatar initials={user.initials} color={user.color} size="sm" />}
          <div>
            <p className="text-sm font-semibold">{user?.offered} Session</p>
            <p className="text-xs text-slate-400">with {user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-[#10B981]">{fmt(timeLeft)}</p>
            <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[#10B981] rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button onClick={() => { setTimeLeft(t => t + 1800); setExtended(true) }} className="px-4 py-2 bg-[#8B5CF6] hover:bg-violet-400 rounded-xl text-xs font-semibold transition-colors">
            {extended ? '✓ Extended' : 'Extend +30m'}
          </button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 overflow-hidden">
        <div className="bg-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
          <div className="flex-1 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: user?.color }}>{user?.initials}</div>
              <p className="text-slate-300 text-sm font-medium">{user?.name}</p>
              <p className="text-slate-500 text-xs mt-1">Video · Active</p>
            </div>
            <div className="absolute bottom-3 right-3 w-20 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center border border-slate-700">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold text-white bg-[#3B82F6]">AC</div>
                <p className="text-[9px] text-slate-400">You</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-700">
            {['Mic', 'Cam', 'Share'].map(btn => (
              <button key={btn} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-slate-700 transition-colors">
                <div className="w-5 h-5 bg-slate-600 rounded" />
                <span className="text-[9px] text-slate-500">{btn}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
            <span className="text-sm font-medium text-slate-300">Shared Notebook</span>
            <span className="ml-auto text-xs text-[#10B981]">● Live sync</span>
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-slate-300 overflow-y-auto">
            <p className="text-[#10B981] mb-2"># {user?.offered} Session Notes</p>
            <p className="mb-2">1. Introduction and goal setting</p>
            <p className="mb-2">2. Core concepts overview</p>
            <p className="mb-2">3. Hands-on exercise</p>
            <p className="text-slate-500 italic mt-4">Start typing to collaborate...</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#1E293B] border-t border-slate-700 flex-wrap gap-3">
        <p className="text-sm text-slate-400">{fmt(timeLeft)} remaining</p>
        <button onClick={() => setShowReview(true)} className="px-8 py-3 bg-[#10B981] hover:bg-emerald-400 rounded-xl font-semibold text-sm transition-colors">
          Complete Session & Release Credits
        </button>
      </div>
    </div>
  )
}