import { useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

import {
  getUsers,
  updateUser,
  deactivateUser,
  reactivateUser,
} from '../api/usersApi'

import Adduser from './Adduser'
import CreateUserModal from './Adduser'
import type { Users } from '../types/user'
import EditUserModal from './EditUserModel'
import DeactivateUserModal from './DeactivateUser'

const UserList = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(4)

  const [showAddUser, setShowAddUser] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Users | null>(null)
  const [deactivateOpen, setDeactivateOpen] = useState(false)

  const queryClient = useQueryClient()

  // Reset to first page when search text changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    // Included search parameter inside queryKey and queryFn
    queryKey: ['users', currentPage, usersPerPage, search],
    queryFn: () => getUsers(currentPage, usersPerPage, search),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  // Direct server results
  const users = data?.results ?? []
  const totalUsersCount = data?.count ?? 0
  const totalPages = Math.ceil(totalUsersCount / usersPerPage)

  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      firstName,
      lastName,
      phone,
    }: {
      userId: string
      firstName: string
      lastName: string
      phone: string
    }) =>
      updateUser(userId, {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setEditOpen(false)
      setSelectedUser(null)
    },
  })

  const deactivateUserMutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) => deactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setDeactivateOpen(false)
      setSelectedUser(null)
    },
  })

  const reactivateUserMutation = useMutation({
    mutationFn: ({ userId }: { userId: string }) => reactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <main className="flex flex-col h-full w-full bg-gray-100 p-8 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full flex-1 flex flex-col justify-between h-full">
        
        {/* Top Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between flex-shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">User List</h1>
              <p className="mt-1 text-gray-500">Manage your users</p>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 transition"
            >
              + Add User
            </button>
          </div>

          {/* Search Box */}
          <div className="mb-6 rounded-xl bg-white p-4 shadow-sm flex-shrink-0">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Table Container locked with fixed height to prevent layout shift */}
          <div className="relative overflow-hidden rounded-xl bg-white shadow-sm flex-1 min-h-[320px] flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className={`transition-opacity duration-150 ${isFetching ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  {isError ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-red-500">
                        Error: {error.message}
                      </td>
                    </tr>
                  ) : isPending ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-800">{user.full_name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                              user.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedUser(user)
                              setEditOpen(true)
                            }}
                            className="mr-3 text-blue-600 hover:underline font-medium"
                          >
                            Edit
                          </button>

                          {user.is_active ? (
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setDeactivateOpen(true)
                              }}
                              className="text-red-600 hover:underline font-medium"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => reactivateUserMutation.mutate({ userId: user.id })}
                              className="text-green-600 hover:underline font-medium"
                            >
                              Reactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Centered Circle Spinner Overlay during page fetch */}
            {isFetching && !isPending && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-200 z-10">
                <div className="flex flex-col items-center gap-2 bg-white px-5 py-4 rounded-xl shadow-lg border border-gray-100">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-gray-600">Loading</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer & Pagination anchored at the bottom */}
        <div className="flex items-center justify-between pt-6 flex-shrink-0 mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <select
              value={usersPerPage}
              onChange={(e) => {
                setUsersPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="rounded-lg border border-slate-200 px-2 py-1 outline-none focus:border-blue-500 bg-white"
            >
              <option value={4}>4</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-8 w-8 rounded-lg text-sm font-semibold transition ${
                  currentPage === index + 1
                    ? 'bg-[#1E293B] text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center justify-center rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Modals */}
        <CreateUserModal
          open={showAddUser}
          onClose={() => setShowAddUser(false)}
        />
        <Adduser open={showAddUser} onClose={() => setShowAddUser(false)} />

        <EditUserModal
          open={editOpen}
          user={selectedUser}
          onClose={() => {
            setEditOpen(false)
            setSelectedUser(null)
          }}
          onSave={(firstName, lastName, phone) => {
            if (!selectedUser) return
            updateUserMutation.mutate({
              userId: selectedUser.id,
              firstName,
              lastName,
              phone,
            })
          }}
        />

        <DeactivateUserModal
          open={deactivateOpen}
          onClose={() => {
            setDeactivateOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={() => {
            if (!selectedUser) return
            deactivateUserMutation.mutate({ userId: selectedUser.id })
          }}
        />

      </div>
    </main>
  )
}

export default UserList