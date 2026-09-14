
import { workshops } from '../data/mockData';
 export default function WorkshopCard({ workshop, onJoin }: { workshop: typeof workshops[0]; onJoin: () => void }) {
  return (
    <div className="flex-shrink-0 w-60 bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
      <div className="h-24 flex items-end p-3 relative" style={{ background: `linear-gradient(135deg, ${workshop.color}22, ${workshop.color}44)` }}>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#EF4444] rounded-full px-2 py-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-bold uppercase">Live</span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: workshop.color }}>{workshop.topic}</span>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{workshop.title}</h4>
        <p className="text-xs text-slate-500 mb-3">Time · {workshop.time}</p>
        <button onClick={onJoin} className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-colors" style={{ backgroundColor: workshop.color }}>
          Join Workshop
        </button>
      </div>
    </div>
  )
}