import React, { useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Clock, Save, X, RefreshCw } from 'lucide-react'

interface Shift {
  id: string
  name: string
  startTime: string // HH:MM
  endTime: string   // HH:MM
  breakMinutes: number
  color?: string
  isActive: boolean
}

function readShifts(): Shift[] {
  try {
    const raw = localStorage.getItem('shifts')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed as Shift[] : []
  } catch {
    return []
  }
}

function writeShifts(shifts: Shift[]) {
  localStorage.setItem('shifts', JSON.stringify(shifts))
}

function seedIfEmpty(): Shift[] {
  const existing = readShifts()
  if (existing.length > 0) return existing
  const seed: Shift[] = [
    { id: 'S1', name: 'Morning Shift', startTime: '06:00', endTime: '14:00', breakMinutes: 30, color: '#34d399', isActive: true },
    { id: 'S2', name: 'Evening Shift', startTime: '14:00', endTime: '22:00', breakMinutes: 30, color: '#60a5fa', isActive: true },
    { id: 'S3', name: 'Night Shift', startTime: '22:00', endTime: '06:00', breakMinutes: 45, color: '#a78bfa', isActive: false },
  ]
  writeShifts(seed)
  return seed
}

export default function ShiftSetup() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Shift | null>(null)
  const [form, setForm] = useState({ name: '', startTime: '09:00', endTime: '17:00', breakMinutes: 30, color: '#60a5fa', isActive: true })

  useEffect(() => {
    setShifts(seedIfEmpty())
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'shifts') setShifts(readShifts())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const stats = useMemo(() => ({
    total: shifts.length,
    active: shifts.filter(s => s.isActive).length,
    inactive: shifts.filter(s => !s.isActive).length,
  }), [shifts])

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', startTime: '09:00', endTime: '17:00', breakMinutes: 30, color: '#60a5fa', isActive: true })
    setShowModal(true)
  }

  const openEdit = (s: Shift) => {
    setEditing(s)
    setForm({ name: s.name, startTime: s.startTime, endTime: s.endTime, breakMinutes: s.breakMinutes, color: s.color || '#60a5fa', isActive: s.isActive })
    setShowModal(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const next: Shift[] = editing
      ? shifts.map(s => s.id === editing.id ? { ...editing, ...form } : s)
      : [{ id: `S${Date.now()}`, ...form }, ...shifts]
    setShifts(next)
    writeShifts(next)
    setShowModal(false)
    setEditing(null)
  }

  const remove = (id: string) => {
    const next = shifts.filter(s => s.id !== id)
    setShifts(next)
    writeShifts(next)
  }

  const toggleActive = (id: string) => {
    const next = shifts.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    setShifts(next)
    writeShifts(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Shift Setup</h1>
          <p className="text-secondary-600">Create and manage work shifts for scheduling</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-outline btn-md" onClick={() => setShifts(readShifts())}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </button>
          <button className="btn btn-primary btn-md" onClick={openNew}>
            <Plus className="mr-2 h-4 w-4" /> New Shift
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Total Shifts</p>
            <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
          </div>
          <Clock className="h-8 w-8 text-secondary-400" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <Clock className="h-8 w-8 text-green-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Inactive</p>
            <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
          </div>
          <Clock className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Shifts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Name</th>
                <th className="table-head">Start</th>
                <th className="table-head">End</th>
                <th className="table-head">Break</th>
                <th className="table-head">Active</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {shifts.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {s.color && <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />}
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="table-cell whitespace-nowrap">{s.startTime}</td>
                  <td className="table-cell whitespace-nowrap">{s.endTime}</td>
                  <td className="table-cell whitespace-nowrap">{s.breakMinutes} min</td>
                  <td className="table-cell whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-800' : 'bg-secondary-100 text-secondary-800'}`}>
                      {s.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600" title="Edit" onClick={() => openEdit(s)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-secondary-600" title="Toggle Active" onClick={() => toggleActive(s.id)}>
                        <Clock className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-red-600" title="Delete" onClick={() => remove(s.id)}>
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

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">{editing ? 'Edit Shift' : 'New Shift'}</h3>
                <form onSubmit={save} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
                      <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Color</label>
                      <input type="color" className="input" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Start Time</label>
                      <input type="time" className="input" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">End Time</label>
                      <input type="time" className="input" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Break (minutes)</label>
                      <input type="number" min={0} className="input" value={form.breakMinutes} onChange={e => setForm({ ...form, breakMinutes: parseInt(e.target.value || '0', 10) })} required />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input id="active" type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                      <label htmlFor="active" className="text-sm text-secondary-700">Active</label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" className="btn btn-outline btn-md" onClick={() => { setShowModal(false); setEditing(null) }}>
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


