import { useState, useEffect, useRef } from 'react'
import { swapUsers } from '../data/mockData'
import Avatar from '../primitives/Avatar'
import VerifiedBadge from '../primitives/Badges'
import Stars from '../primitives/Star'
// Define the Props interface
interface ListingModelProps {
  user: typeof swapUsers[0]
  onClose: () => void
  onStartSession: () => void
}
 export default function ListingModal({ user, onClose, onStartSession }: {
  user: typeof swapUsers[0] | null
  onClose: () => void
  onStartSession: () => void
}) {
  const [selectedDuration, setSelectedDuration] = useState('1 hr')
  const [selectedDate, setSelectedDate] = useState(27)
  const durations = ['30 min', '1 hr', '2 hrs']

  const credits = selectedDuration === '30 min' ? 0.5 : selectedDuration === '1 hr' ? 1.0 : 2.0

  if (!user) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{user.offered} Mentoring</h2>
            <p className="text-sm text-slate-500">{user.offered.toLowerCase()} mentoring profiles</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-5">
            <div className="flex flex-col items-center text-center mb-5">
              <Avatar initials={user.initials} color={user.color} size="lg" />
              <div className="mt-3">
                <div className="flex items-center gap-1 justify-center">
                  <span className="font-semibold text-slate-800">{user.name}</span>
                  <VerifiedBadge />
                </div>
                <div className="mt-2"><Stars rating={user.rating} /></div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-[#10B981] font-medium">⚡ Responds within 30 min</div>
          </div>
          <div className="p-5">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="text-slate-600">{user.offered}</span><span className="font-semibold">1.5 hrs</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">Session Needed</span><span className="font-semibold">3.0 hrs</span></div>
              <div className="h-px bg-slate-100" />
              <div className="flex justify-between text-sm"><span className="font-medium">Total</span><span className="font-bold text-[#1E293B]">4.5 hrs</span></div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="bg-emerald-50 rounded-lg px-3 py-2 text-xs font-medium text-[#10B981]">You offer: {user.needed}</div>
              <div className="bg-violet-50 rounded-lg px-3 py-2 text-xs font-medium text-[#8B5CF6]">You receive: {user.offered}</div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Duration</p>
            <div className="flex gap-2 mb-4">
              {durations.map(d => (
                <button key={d} onClick={() => setSelectedDuration(d)} className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedDuration === d ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{d}</button>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-amber-700"><span className="font-semibold">⚡ {credits} Time Credit</span> held in escrow until complete.</p>
            </div>
            <button onClick={onStartSession} className="w-full py-3 bg-[#10B981] text-white rounded-xl font-semibold text-sm hover:bg-emerald-400 transition-colors">
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
