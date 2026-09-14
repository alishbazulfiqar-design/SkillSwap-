import { useState, useEffect } from 'react'
import {  ALL_CATEGORIES, DURATION_OPTIONS } from '../data/mockData';
import Avatar from '../primitives/Avatar'
import VerifiedBadge from '../primitives/Badges'
type View = 'dashboard' | 'live-session' | 'host-workshop'
function CategoryTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-violet-50 text-[#8B5CF6] border border-violet-200 rounded-lg px-2.5 py-1 text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-violet-800 transition-colors ml-0.5">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </span>
  )
}
function MiniCalendar({ selectedDate, onSelect }: { selectedDate: number; onSelect: (d: number) => void }) {
  const [month] = useState({ name: 'November 2022', days: 30, startDay: 2 })
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const blanks = Array(month.startDay).fill(null)
  const dates = Array.from({ length: month.days }, (_, i) => i + 1)
  const overflow = Array(35 - blanks.length - dates.length > 0 ? 35 - blanks.length - dates.length : 0).fill(null)

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 select-none">
      <div className="flex items-center justify-between mb-3">
        <button className="w-6 h-6 hover:bg-slate-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-xs font-semibold text-slate-700">{month.name}</span>
        <button className="w-6 h-6 hover:bg-slate-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map(d => <span key={d} className="text-[9px] text-slate-400 font-medium py-1">{d}</span>)}
        {blanks.map((_, i) => <span key={`b${i}`} />)}
        {dates.map(day => (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={`py-1 rounded-lg text-xs font-medium transition-colors ${day === selectedDate ? 'bg-[#10B981] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            {day}
          </button>
        ))}
        {overflow.map((_, i) => <span key={`o${i}`} className="text-[10px] text-slate-300 py-1">{i + 1}</span>)}
      </div>
    </div>
  )
}

function PreviewCard({ title, categories, description, selectedDate, startTime, duration, credits, maxParticipants }: {
  title: string; categories: string[]; description: string; selectedDate: number
  startTime: string; duration: string; credits: string; maxParticipants: number
}) {
  const hasTitle = title.trim().length > 0
  const hasDesc = description.trim().length > 0
  const hasDate = selectedDate > 0
  const hasTime = startTime.trim().length > 0
  const hasDuration = duration.trim().length > 0
  const hasCredits = credits.trim().length > 0

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header badge */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <span className="text-sm font-semibold text-slate-600" style={{ fontFamily: 'Outfit, sans-serif' }}>Preview - Draft Mode</span>
        <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">DRAFT</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <h2 className={`text-xl font-bold leading-tight ${hasTitle ? 'text-[#1E293B]' : 'text-slate-300'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            {hasTitle ? title : 'Title (e.g., Intro to Figma)'}
          </h2>
          {/* Category tags */}
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {categories.map(c => (
                <span key={c} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200">{c}</span>
              ))}
            </div>
          ) : (
            <div className="flex gap-1.5 mt-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400">Design</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400">Development</span>
            </div>
          )}
        </div>

        {/* Host + image */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar initials="AC" color="#3B82F6" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-slate-800">Alex Chen</span>
                <VerifiedBadge />
              </div>
              <p className="text-xs text-slate-500">Verificated</p>
            </div>
          </div>
          {/* Image placeholder */}
          <div className="w-20 h-16 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Description</p>
          <p className={`text-sm leading-relaxed line-clamp-3 ${hasDesc ? 'text-slate-700' : 'text-slate-300 italic'}`}>
            {hasDesc ? description : 'Detailed mentoring profiles: professor React Native Mentorropeins, professions, and knowledge, as an rel...'}
          </p>
        </div>

        {/* Details grid */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 border border-slate-100">
          {[
            { label: 'Date', value: hasDate ? `November ${selectedDate}, 2022` : null },
            { label: 'Time', value: hasTime ? startTime : null },
            { label: 'Duration', value: hasDuration ? duration : null },
            { label: 'Credits', value: hasCredits ? `${credits} hrs per person` : null },
            { label: 'Max Participants', value: maxParticipants > 0 ? String(maxParticipants) : null },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">{label}:</span>
              <span className={`text-xs font-medium ${value ? 'text-[#1E293B]' : 'text-slate-400 italic'}`}>
                {value ?? 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* Preview join button */}
        <button
          disabled
          className="w-full py-3 rounded-xl text-sm font-semibold bg-slate-200 text-slate-400 cursor-not-allowed"
        >
          Join Workshop (Preview)
        </button>
      </div>
    </div>
  )
}

 export default function HostWorkshop({ setView }: { setView: (v: View) => void }) {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState<string[]>(['Design', 'Development'])
  const [catInput, setCatInput] = useState('')
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState(28)
  const [startTime, setStartTime] = useState('12:00')
  const [ampm, setAmpm] = useState<'am' | 'pm'>('pm')
  const [duration, setDuration] = useState('~1.0 hrs')
  const [credits, setCredits] = useState('')
  const [maxParticipants, setMaxParticipants] = useState(1)
  const [links, setLinks] = useState(['', ''])
  const [submitted, setSubmitted] = useState(false)

  const addCategory = (cat: string) => {
    if (!categories.includes(cat)) setCategories(p => [...p, cat])
    setShowCatMenu(false)
    setCatInput('')
  }
  const removeCategory = (cat: string) => setCategories(p => p.filter(c => c !== cat))

  const addLink = () => setLinks(p => [...p, ''])
  const updateLink = (i: number, v: string) => setLinks(p => p.map((l, idx) => idx === i ? v : l))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const displayTime = `${startTime} ${ampm}`

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <button
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Host a Workshop
            <span className="text-slate-400 font-normal"> — </span>
            <span className="text-slate-500 text-xl sm:text-2xl font-medium">Share Your Skills and Earn Time Credits</span>
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Left: Form ── */}
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Workshop Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Workshop Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Workshop Title (e.g., Intro to Figma)"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-violet-100 transition-all bg-white"
              />
            </div>

            {/* Skill Categories */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Skill Categories</label>
              <div className="relative">
                <div
                  className="w-full min-h-[46px] border border-slate-200 rounded-xl px-3 py-2 bg-white flex flex-wrap gap-2 items-center cursor-text focus-within:border-[#8B5CF6] focus-within:ring-2 focus-within:ring-violet-100 transition-all"
                  onClick={() => setShowCatMenu(true)}
                >
                  {categories.map(c => <CategoryTag key={c} label={c} onRemove={() => removeCategory(c)} />)}
                  <input
                    value={catInput}
                    onChange={e => setCatInput(e.target.value)}
                    onFocus={() => setShowCatMenu(true)}
                    placeholder={categories.length === 0 ? 'Add categories...' : ''}
                    className="flex-1 min-w-[80px] text-sm outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
                  />
                  <svg className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                {showCatMenu && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 max-h-48 overflow-y-auto">
                    {ALL_CATEGORIES.filter(c => !categories.includes(c) && c.toLowerCase().includes(catInput.toLowerCase())).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => addCategory(c)}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-[#8B5CF6] transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                    {catInput && !ALL_CATEGORIES.includes(catInput) && (
                      <button
                        type="button"
                        onClick={() => addCategory(catInput)}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#8B5CF6] hover:bg-violet-50 font-medium transition-colors"
                      >
                        + Add "{catInput}"
                      </button>
                    )}
                  </div>
                )}
              </div>
              {showCatMenu && <div className="fixed inset-0 z-10" onClick={() => setShowCatMenu(false)} />}
            </div>

            {/* Skill Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Skill Description</label>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Write a description..."
                  rows={5}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-violet-100 transition-all bg-white resize-none"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  <span className="font-medium text-slate-500">Formatting Tips:</span> Hints: stores formatting on other topics
                </p>
              </div>
            </div>

            {/* Schedule & Duration */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Schedule &amp; Duration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] gap-4 items-start">
                {/* Calendar */}
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-2">Date</p>
                  <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                </div>

                {/* Time + Duration */}
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-2">Start Time</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        placeholder="12:00"
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-violet-100 transition-all bg-white"
                      />
                      <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-white">
                        {(['am', 'pm'] as const).map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setAmpm(p)}
                            className={`px-3 py-2.5 text-xs font-semibold transition-colors ${ampm === p ? 'bg-[#1E293B] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-2">Duration</p>
                    <select
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#8B5CF6] bg-white cursor-pointer appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '36px' }}
                    >
                      {DURATION_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pricing (Time Credits)</label>
                <input
                  type="text"
                  value={credits}
                  onChange={e => setCredits(e.target.value)}
                  placeholder="Time Credits required to join (e.g., 1.5 hrs per person)"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-violet-100 transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Maximum Participants</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden">
                  <input
                    type="number"
                    value={maxParticipants}
                    onChange={e => setMaxParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                    className="flex-1 px-4 py-3 text-sm text-slate-800 outline-none bg-transparent"
                  />
                  <div className="flex flex-col border-l border-slate-200">
                    <button type="button" onClick={() => setMaxParticipants(p => p + 1)} className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-500 border-b border-slate-200">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button type="button" onClick={() => setMaxParticipants(p => Math.max(1, p - 1))} className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-500">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Links */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Add Resource Links</label>
              <p className="text-xs text-slate-400 mb-3">URLs to materials to comfort your review.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {links.map((link, i) => (
                  <input
                    key={i}
                    type="url"
                    value={link}
                    onChange={e => updateLink(i, e.target.value)}
                    placeholder="URLs to materials in URLs"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-violet-100 transition-all bg-white"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addLink}
                className="mt-2.5 flex items-center gap-1.5 text-xs text-[#8B5CF6] hover:text-violet-700 font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                Add another link
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110 active:scale-[0.99] shadow-md shadow-violet-200"
              style={{ backgroundColor: '#8B5CF6' }}
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Submitted for Approval!
                </span>
              ) : 'Submit Workshop for Approval'}
            </button>
          </form>

          {/* ── Right: Preview ── */}
          <div className="lg:sticky lg:top-[73px]">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3 text-center">Preview Workshop Listing</p>
            <PreviewCard
              title={title}
              categories={categories}
              description={description}
              selectedDate={selectedDate}
              startTime={displayTime}
              duration={duration}
              credits={credits}
              maxParticipants={maxParticipants}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
