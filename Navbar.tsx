import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Avatar from '../primitives/Avatar'

export default function Navbar({
  timeBalance,
  onOpenListing,
   onLogout,
}: {
  timeBalance: number
  onOpenListing: () => void
   onLogout: () => void
}) {
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('Skills')
  const [locFilter, setLocFilter] = useState('Local/Remote')
const [showProfileMenu, setShowProfileMenu] = useState(false)
  // React Router
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#10B981]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>

          <span
            className="font-bold text-[#1E293B] text-lg hidden sm:block"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            SkillSwap
          </span>
        </div>

        {/* Time Balance */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 flex-shrink-0">
          <span className="text-sm">⚡</span>
          <span className="text-sm font-semibold text-[#1E293B]">
            {timeBalance} hrs
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 flex-1 max-w-xl bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 min-w-0">
          <svg
            className="w-4 h-4 text-slate-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 min-w-0"
            placeholder="Search skills, members, workshops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="text-xs text-slate-500 bg-transparent border-l border-slate-200 pl-2 outline-none cursor-pointer hidden md:block"
          >
            <option>Skills</option>
            <option>Members</option>
            <option>Workshops</option>
          </select>

          <select
            value={locFilter}
            onChange={(e) => setLocFilter(e.target.value)}
            className="text-xs text-slate-500 bg-transparent border-l border-slate-200 pl-2 outline-none cursor-pointer hidden md:block"
          >
            <option>Local/Remote</option>
            <option>Local</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 ml-auto flex-shrink-0">

          {/* Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden sm:block ${
              location.pathname === '/dashboard'
                ? 'bg-[#1E293B] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Browse Swaps
          </button>

          {/* Host Workshop */}
          <button
            onClick={() => navigate('/host-workshop')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden sm:block ${
              location.pathname === '/host-workshop'
                ? 'bg-[#8B5CF6] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Host Workshop
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate('/messages')}
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden md:block ${
              location.pathname === '/messages'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Messages

            <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              5
            </span>
          </button>

          {/* User List */}
          <button
            onClick={() => navigate('/user-list')}
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden md:block ${
              location.pathname === '/user-list'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            UserList

            <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              1
            </span>
          </button>

         {/* Profile Menu */}
<div className="relative ml-1">

  {/* AZ Profile Button */}
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex items-center gap-2 cursor-pointer"
  >
    <Avatar initials="AZ" color="#3B82F6" size="sm" />

    <span className="text-sm font-medium text-slate-700 hidden lg:block">
      Alishba Zulfiqar
    </span>

    <svg
      className="w-4 h-4 text-slate-400 hidden lg:block"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Dropdown */}
  {showProfileMenu && (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">

      {/* Profile */}
      <button
        onClick={() => {
          navigate('/profile')
          setShowProfileMenu(false)
        }}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
      >
        Profile
      </button>

      {/* Logout */}
      <button
        onClick={() => {
          onLogout()
          setShowProfileMenu(false)
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Logout
      </button>

    </div>
  )}

</div>

        </nav>
      </div>
    </header>
  )
}