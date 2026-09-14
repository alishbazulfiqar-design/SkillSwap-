
import {  currentSessions } from '../data/mockData';
 export default function CurrentSessions() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="font-semibold text-slate-800 text-sm mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>My Current Sessions</h3>
      <div className="space-y-2.5">
        {currentSessions.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-xs font-semibold text-slate-700">{s.title}</p>
              <p className="text-[10px] text-slate-400">{s.sub}</p>
            </div>
            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}