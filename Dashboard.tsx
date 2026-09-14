import { Import, ImportIcon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { swapUsers, topTutors, workshops, messages, ledgerItems, currentSessions } from '../data/mockData';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CurrentSession from '../components/CurrentSession'
import ListingModel from '../components/ListingModel'
import LiveSession from '../components/LiveSession'
import TimeLedger from '../components/TimeLedger'
import TopTutors from '../components/TopTutors'
import QuickMessage from '../components/QuickMessage'
import SwapCards from '../components/SwapCards'
import WorkshopCard from '../components/WorkshopCard'
import { useTranslation } from 'react-i18next'
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom'
type View =  'dashboard' | 'live-session' | 'host-workshop' | 'messages'| 'profile' | 'users'



 export default function Dashboard({ onSelectUser, setView }: { onSelectUser: (u: typeof swapUsers[0]) => void; setView: (v: View) => void }) {
  const [workshopIdx, setWorkshopIdx] = useState(0)
  const visible = workshops.slice(workshopIdx, workshopIdx + 3)
const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-[1400px] mx-auto w-full">
      <div className="flex-1 min-w-0 space-y-6">
        <Hero onOpenListing={() => onSelectUser(swapUsers[0])} setView={setView} />
        <TimeLedger />
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Recommended Swaps</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {['All', 'Tech', 'Design', 'Language'].map((f, i) => (
                <button key={f} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${i === 0 ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {swapUsers.map(u => <SwapCards key={u.id} user={u} onSelect={() => onSelectUser(u)} />)}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Featured Workshops</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setWorkshopIdx(Math.max(0, workshopIdx - 1))} disabled={workshopIdx === 0} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setWorkshopIdx(Math.min(workshops.length - 3, workshopIdx + 1))} disabled={workshopIdx >= workshops.length - 3} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {visible.map(w => <WorkshopCard key={w.id} workshop={w} onJoin={() => navigate('/live-session')} />)}
          </div>
        </section>
      </div>
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
        <TopTutors onSelect={u => onSelectUser({ ...swapUsers[0], name: u.name, initials: u.initials, color: u.color })} />
        <QuickMessage  />
        <CurrentSession />
      </aside>
    </div>
  )
}