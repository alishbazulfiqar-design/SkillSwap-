import { ChevronLeft, ChevronRight } from 'lucide-react'
import { swapUsers } from '../data/mockData' 
import { useState, useEffect } from 'react'
import SwapCards from '../components/SwapCards' 

export default function Users() { 
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(6)

  useEffect(() => {
    const updateUsersPerPage = () => {
      if (window.innerWidth < 768) {
        setUsersPerPage(2)
      } else if (window.innerWidth < 1024) {
        setUsersPerPage(4)
      } else {
        setUsersPerPage(6)
      }
    }
    localStorage.setItem("Users","All Users")
    localStorage.getItem("Users")
    updateUsersPerPage()

    window.addEventListener('resize', updateUsersPerPage)
    return () => {
      window.removeEventListener('resize', updateUsersPerPage)
    }
  }, [])

  const startIndex = (currentPage - 1) * usersPerPage

  const currentUsers = swapUsers.slice(
    startIndex,
    startIndex + usersPerPage
  )

  const totalPages = Math.ceil(swapUsers.length / usersPerPage)

  return ( 
    <main className="flex-1 flex flex-col justify-between w-full px-4 md:px-8 py-4 overflow-hidden min-h-0"> 
      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {currentUsers.map((user) => ( 
          <SwapCards 
            key={user.id} 
            user={user} 
            onSelect={() => console.log('Selected user:', user.name)} 
          />
        ))} 
      </div>

      {/* Pagination Wrapper */}
      <div className="flex items-center justify-center py-4 gap-2 mt-auto">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-2 py-1.5 md:px-3 md:py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition" 
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => setCurrentPage(index + 1)} 
            className={`w-8 h-8 md:w-9 md:h-9 rounded-lg text-sm font-semibold transition ${
              currentPage === index + 1 
                ? 'bg-[#1E293B] text-white' 
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          > 
            {index + 1} 
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-2 py-1.5 md:px-3 md:py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </main>
  ) 
}