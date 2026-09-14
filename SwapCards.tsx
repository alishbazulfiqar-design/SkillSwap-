

import { swapUsers } from '../data/mockData'
import Avatar from '../primitives/Avatar'
import VerifiedBadge from '../primitives/Badges'
import Stars from '../primitives/Star'

 export default function SwapCard({ user, onSelect }: { user: typeof swapUsers[0]; onSelect: () => void }) {
  return (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={user.initials} color={user.color} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-800 text-sm">{user.name}</span>
              {user.verified && <VerifiedBadge />}
            </div>
            <Stars rating={user.rating} />
          </div>
        </div>
        <span className="text-[10px] text-slate-400">{user.available}</span>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">Offers</p>
          <span className="inline-block bg-emerald-50 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-lg">{user.offered}</span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">Needs</p>
          <span className="inline-block bg-violet-50 text-[#8B5CF6] text-xs font-medium px-2.5 py-1 rounded-lg">{user.needed}</span>
        </div>
      </div>
      <button onClick={onSelect} className="w-full py-2 bg-[#1E293B] text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
        Request Swap
      </button>
    </div>
  )
}