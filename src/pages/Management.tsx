import React, { useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Users, User, Save, X, RefreshCw, Search } from 'lucide-react'

interface Team {
  id: string
  name: string
  managerId?: string
  memberCount: number
  isActive: boolean
}

interface Manager {
  id: string
  name: string
  email: string
  phone?: string
  department?: string
  isActive: boolean
}

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeLS<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val))
}

function seedIfEmpty() {
  const teams = readLS<Team[]>('teams', [])
  const managers = readLS<Manager[]>('managers', [])
  if (teams.length === 0 || managers.length === 0) {
    const seededManagers: Manager[] = [
      { id: 'M1', name: 'John Doe', email: 'john.doe@example.com', phone: '555-0101', department: 'Sales', isActive: true },
      { id: 'M2', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '555-0102', department: 'HR', isActive: true },
      { id: 'M3', name: 'Mike Chen', email: 'mike.chen@example.com', phone: '555-0103', department: 'Operations', isActive: false },
    ]
    const seededTeams: Team[] = [
      { id: 'T1', name: 'Sales Team A', managerId: 'M1', memberCount: 12, isActive: true },
      { id: 'T2', name: 'HR Core', managerId: 'M2', memberCount: 6, isActive: true },
      { id: 'T3', name: 'Ops Night Shift', managerId: 'M3', memberCount: 20, isActive: false },
    ]
    writeLS('managers', managers.length ? managers : seededManagers)
    writeLS('teams', teams.length ? teams : seededTeams)
  }
}

export default function Management() {
  const [teams, setTeams] = useState<Team[]>([])
  const [managers, setManagers] = useState<Manager[]>([])
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showManagerModal, setShowManagerModal] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [editingManager, setEditingManager] = useState<Manager | null>(null)
  const [teamForm, setTeamForm] = useState({ name: '', managerId: '', memberCount: 0, isActive: true })
  const [managerForm, setManagerForm] = useState({ name: '', email: '', phone: '', department: '', isActive: true })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    seedIfEmpty()
    setTeams(readLS('teams', [] as Team[]))
    setManagers(readLS('managers', [] as Manager[]))
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'teams') setTeams(readLS('teams', [] as Team[]))
      if (e.key === 'managers') setManagers(readLS('managers', [] as Manager[]))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const stats = useMemo(() => ({
    totalTeams: teams.length,
    activeTeams: teams.filter(t => t.isActive).length,
    totalManagers: managers.length,
    activeManagers: managers.filter(m => m.isActive).length,
  }), [teams, managers])

  const filteredTeams = useMemo(() => {
    const t = searchTerm.toLowerCase()
    return teams.filter(team => team.name.toLowerCase().includes(t))
  }, [teams, searchTerm])

  const filteredManagers = useMemo(() => {
    const t = searchTerm.toLowerCase()
    return managers.filter(m => m.name.toLowerCase().includes(t) || m.email.toLowerCase().includes(t) || (m.department || '').toLowerCase().includes(t))
  }, [managers, searchTerm])

  const saveTeam = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamForm.name.trim()) return
    const next = editingTeam
      ? teams.map(t => t.id === editingTeam.id ? { ...editingTeam, ...teamForm, memberCount: Number(teamForm.memberCount) } : t)
      : [{ id: `T${Date.now()}`, name: teamForm.name, managerId: teamForm.managerId || undefined, memberCount: Number(teamForm.memberCount), isActive: teamForm.isActive }, ...teams]
    setTeams(next)
    writeLS('teams', next)
    setShowTeamModal(false)
    setEditingTeam(null)
    setTeamForm({ name: '', managerId: '', memberCount: 0, isActive: true })
  }

  const saveManager = (e: React.FormEvent) => {
    e.preventDefault()
    if (!managerForm.name.trim() || !managerForm.email.trim()) return
    const next = editingManager
      ? managers.map(m => m.id === editingManager.id ? { ...editingManager, ...managerForm } as Manager : m)
      : [{ id: `M${Date.now()}`, ...managerForm } as Manager, ...managers]
    setManagers(next)
    writeLS('managers', next)
    setShowManagerModal(false)
    setEditingManager(null)
    setManagerForm({ name: '', email: '', phone: '', department: '', isActive: true })
  }

  const deleteTeam = (id: string) => {
    const next = teams.filter(t => t.id !== id)
    setTeams(next)
    writeLS('teams', next)
  }

  const deleteManager = (id: string) => {
    const nextManagers = managers.filter(m => m.id !== id)
    setManagers(nextManagers)
    writeLS('managers', nextManagers)
    // remove manager assignment from teams
    const nextTeams = teams.map(t => t.managerId === id ? { ...t, managerId: undefined } : t)
    setTeams(nextTeams)
    writeLS('teams', nextTeams)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Management</h1>
          <p className="text-secondary-600">Manage teams, managers, and assignments</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md" onClick={() => { setTeams(readLS('teams', [] as Team[])); setManagers(readLS('managers', [] as Manager[])) }}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </button>
          <button className="btn btn-outline btn-md" onClick={() => { setEditingManager(null); setManagerForm({ name: '', email: '', phone: '', department: '', isActive: true }); setShowManagerModal(true) }}>
            <User className="mr-2 h-4 w-4" /> New Manager
          </button>
          <button className="btn btn-primary btn-md" onClick={() => { setEditingTeam(null); setTeamForm({ name: '', managerId: '', memberCount: 0, isActive: true }); setShowTeamModal(true) }}>
            <Users className="mr-2 h-4 w-4" /> New Team
          </button>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-secondary-400" />
          <input className="input" placeholder="Search teams or managers" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">Teams</h3>
              <div className="text-sm text-secondary-600">Active: {stats.activeTeams} / {stats.totalTeams}</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Team</th>
                  <th className="table-head">Manager</th>
                  <th className="table-head">Members</th>
                  <th className="table-head">Active</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredTeams.map(t => {
                  const mgr = managers.find(m => m.id === t.managerId)
                  return (
                    <tr key={t.id} className="table-row">
                      <td className="table-cell font-medium">{t.name}</td>
                      <td className="table-cell">{mgr ? mgr.name : '—'}</td>
                      <td className="table-cell whitespace-nowrap">{t.memberCount}</td>
                      <td className="table-cell whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.isActive ? 'bg-green-100 text-green-800' : 'bg-secondary-100 text-secondary-800'}`}>
                          {t.isActive ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-secondary-400 hover:text-primary-600" title="Edit" onClick={() => { setEditingTeam(t); setTeamForm({ name: t.name, managerId: t.managerId || '', memberCount: t.memberCount, isActive: t.isActive }); setShowTeamModal(true) }}>
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-secondary-400 hover:text-red-600" title="Delete" onClick={() => deleteTeam(t.id)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">Managers</h3>
              <div className="text-sm text-secondary-600">Active: {stats.activeManagers} / {stats.totalManagers}</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Department</th>
                  <th className="table-head">Active</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredManagers.map(m => (
                  <tr key={m.id} className="table-row">
                    <td className="table-cell font-medium">{m.name}</td>
                    <td className="table-cell">{m.email}</td>
                    <td className="table-cell">{m.department || '—'}</td>
                    <td className="table-cell whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.isActive ? 'bg-green-100 text-green-800' : 'bg-secondary-100 text-secondary-800'}`}>
                        {m.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-secondary-400 hover:text-primary-600" title="Edit" onClick={() => { setEditingManager(m); setManagerForm({ name: m.name, email: m.email, phone: m.phone || '', department: m.department || '', isActive: m.isActive }); setShowManagerModal(true) }}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-secondary-400 hover:text-red-600" title="Delete" onClick={() => deleteManager(m.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showTeamModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowTeamModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">{editingTeam ? 'Edit Team' : 'New Team'}</h3>
                <form onSubmit={saveTeam} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Team Name</label>
                      <input className="input" value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Manager</label>
                      <select className="input" value={teamForm.managerId} onChange={e => setTeamForm({ ...teamForm, managerId: e.target.value })}>
                        <option value="">Unassigned</option>
                        {managers.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Members</label>
                      <input type="number" min={0} className="input" value={teamForm.memberCount} onChange={e => setTeamForm({ ...teamForm, memberCount: parseInt(e.target.value || '0', 10) })} required />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input id="team-active" type="checkbox" checked={teamForm.isActive} onChange={e => setTeamForm({ ...teamForm, isActive: e.target.checked })} />
                      <label htmlFor="team-active" className="text-sm text-secondary-700">Active</label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" className="btn btn-outline btn-md" onClick={() => setShowTeamModal(false)}>
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-md">
                      <Save className="mr-2 h-4 w-4" /> Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showManagerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowManagerModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">{editingManager ? 'Edit Manager' : 'New Manager'}</h3>
                <form onSubmit={saveManager} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
                      <input className="input" value={managerForm.name} onChange={e => setManagerForm({ ...managerForm, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
                      <input type="email" className="input" value={managerForm.email} onChange={e => setManagerForm({ ...managerForm, email: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
                      <input className="input" value={managerForm.phone} onChange={e => setManagerForm({ ...managerForm, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
                      <input className="input" value={managerForm.department} onChange={e => setManagerForm({ ...managerForm, department: e.target.value })} />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input id="manager-active" type="checkbox" checked={managerForm.isActive} onChange={e => setManagerForm({ ...managerForm, isActive: e.target.checked })} />
                      <label htmlFor="manager-active" className="text-sm text-secondary-700">Active</label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" className="btn btn-outline btn-md" onClick={() => setShowManagerModal(false)}>
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-md">
                      <Save className="mr-2 h-4 w-4" /> Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


