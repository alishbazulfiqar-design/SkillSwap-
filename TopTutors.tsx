
import {  topTutors } from '../data/mockData';
import Avatar from '../primitives/Avatar'
import Stars from '../primitives/Star'
 export default function TopTutors({ onSelect }: { onSelect: (t: typeof topTutors[0]) => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Top Tutors</h3>
        <button className="text-xs text-[#10B981] font-medium hover:underline">See all</button>
      </div>
      <div className="space-y-3">
        {topTutors.map((t, i) => (
          <div key={i} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-1.5 -mx-1.5 transition-colors" onClick={() => onSelect(t)}>
            <Avatar initials={t.initials} color={t.color} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{t.name}</p>
              <Stars rating={t.rating} />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${t.color}18`, color: t.color }}>{t.badge}</span>
          </div>
        ))}
      </div>
    </div>
  )
}