export default function Footer() {
  return (
   <footer className="mt-0 bg-white border-t border-slate-200 py-6 text-xs text-slate-500 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center">
               <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                </div>
            <span>© SkillSwap, Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#terms" className="hover:underline">Terms</a>
            <a href="#cookies" className="hover:underline">Cookie Policy</a>
            
            <select className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 focus:outline-none">
          <option value="en">English / USD</option>
          <option value="zh">中文</option>
          <option value="ko"> 한국어</option>
          <option value="it"> Italiano</option>
          <option value="fr">Français</option>
          <option value="tr"> Türkçe</option>
          <option value="ja">日本語</option>
          <option value="ar"> العربية</option>
            </select>
          </div>
        </div>
      </footer>
  )
}