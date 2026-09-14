
type View = 'dashboard' | 'live-session'
import {  ledgerItems } from '../data/mockData';
export default function TimeLedger() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Today's Time Ledger</h3>
        <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 font-medium">Total: 4.5 hrs</span>
      </div>
      <div className="space-y-2.5">
        {ledgerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.positive ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.positive ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} style={{ width: item.positive ? '60%' : '40%', opacity: 0.7 }} />
            </div>
            <span className={`text-xs font-semibold w-10 text-right ${item.positive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{item.amount}</span>
            <span className="text-xs text-slate-500 flex-1 min-w-0 truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}