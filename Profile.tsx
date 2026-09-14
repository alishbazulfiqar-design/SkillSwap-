import React, { useState } from 'react';
import Footer from '../components/footer';
export default function SkillSwapProfile() {
  const [selectedDate, setSelectedDate] = useState(27);

  const skillsOffered = ['React Native', 'Python Basics', 'TypeScript', 'Graphic Design', 'UI Review'];
  const skillsNeeded = ['Graphic Design', 'UI Review', 'TypeScript', 'Management'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
    
      

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* PROFILE HERO HEADER CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Cover Image */}
          <div className="h-36 sm:h-48 bg-slate-700 w-full relative"></div>

          {/* Profile Details Bar */}
          <div className="p-6 relative pt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-16 sm:-mt-20 mb-4">
              
              {/* Avatar & User Details */}
              <div className="flex items-end gap-4">
                <img
                  src="https://th.bing.com/th/id/OIP.N4i8Q7Nb4GsXlJ1jy2ssMAHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="Alish Ali"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white object-cover bg-white shadow-md"
                />
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Alishba Zulfiqar</h1>
                    <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs px-2 py-0.5 rounded-full font-medium">
                      ✓ Verified Expert
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="text-amber-500 font-semibold flex items-center gap-1">★ 4.8/5</span>
                    <span>•</span>
                    <span>Location: Remote/Onsite</span>
                    <span>•</span>
                    <span>Joined: 2026</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button className="bg-[#8B5CF6] hover:bg-violet-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
                  Request Swap
                </button>
                <button className="bg-[#10B981] hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN RESPONSIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (60% / 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* About Me */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-lg font-bold text-slate-900">About Me</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                Hi, I'm Alish! I am a software engineer specializing in frontend React, Python backends, Node,JS and UI design.
                 I love mentoring aspirants and connecting with developers
                  to swap skills and share hands-on experience.
              </p>
            </div>

            {/* Skills Offered */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Skills Offered</h2>
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, index) => (
                  <span key={index} className="bg-[#10B981] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
<div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Skills processing</h2>
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, index) => (
                  <span key={index} className="bg-blue-300 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Skills Needed */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Skills Needed</h2>
              <div className="flex flex-wrap gap-2">
                {skillsNeeded.map((skill, index) => (
                  <span key={index} className="bg-[#8B5CF6] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (40% / 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Calendar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Availability Calendar</h2>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 font-medium">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {[27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].map((date) => {
                  const isSelected = selectedDate === date;
                  const isAvailable = [27, 28, 29, 30].includes(date);
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`h-9 w-9 mx-auto flex items-center justify-center rounded-lg transition-all ${
                        isSelected
                          ? 'bg-violet-600 text-white font-bold'
                          : isAvailable
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Community Reviews */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Community Reviews</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Sarah Jenkins</div>
                      <div className="text-xs text-slate-500">Verified Swapper</div>
                    </div>
                  </div>
                  <div className="text-amber-500 font-bold text-xs">★ 4.8/5</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Michael Vance</div>
                      <div className="text-xs text-slate-500">Verified Swapper</div>
                    </div>
                  </div>
                  <div className="text-amber-500 font-bold text-xs">★ 4.9/5</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* GLOBAL FOOTER */}
     
    </div>
  );
}