import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle, XCircle, Clock, RefreshCw, Eye } from 'lucide-react'

type ApprovalStatus = 'pending' | 'approved' | 'rejected'

interface ApprovalItem {
  id: string
  entityId: string
  entityType: 'leave' | 'employee' | 'other'
  title: string
  details?: string
  status: ApprovalStatus
  submittedBy?: string
  submittedAt: string
  decisionBy?: string
  decisionAt?: string
}

function readQueue(): ApprovalItem[] {
  try {
    const raw = localStorage.getItem('approvalQueue')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as ApprovalItem[]
    return []
  } catch {
    return []
  }
}

function writeQueue(items: ApprovalItem[]) {
  localStorage.setItem('approvalQueue', JSON.stringify(items))
}

export default function Approval() {
  const [queue, setQueue] = useState<ApprovalItem[]>([])
  const [selected, setSelected] = useState<ApprovalItem | null>(null)

  const refresh = () => setQueue(readQueue())

  useEffect(() => {
    // Initial load with seed data if empty
    const existing = readQueue()
    if (existing.length === 0) {
      const seed: ApprovalItem[] = [
        {
          id: 'leave-1',
          entityId: '1',
          entityType: 'leave',
          title: 'John Smith - Annual Leave (3 days)',
          details: '2024-01-20 to 2024-01-22: Family vacation',
          status: 'pending',
          submittedBy: 'System',
          submittedAt: new Date().toISOString()
        },
        {
          id: 'leave-2',
          entityId: '2',
          entityType: 'leave',
          title: 'Sarah Johnson - Sick Leave (1 day)',
          details: '2024-01-18 to 2024-01-18: Medical appointment',
          status: 'approved',
          submittedBy: 'System',
          submittedAt: new Date().toISOString(),
          decisionBy: 'Mike Chen',
          decisionAt: '2024-01-17'
        },
        {
          id: 'leave-3',
          entityId: '3',
          entityType: 'leave',
          title: 'Mike Chen - Personal Leave (1 day)',
          details: '2024-01-25 to 2024-01-25: Personal matters',
          status: 'rejected',
          submittedBy: 'System',
          submittedAt: new Date().toISOString(),
          decisionBy: 'Sarah Johnson',
          decisionAt: '2024-01-21'
        }
      ]
      writeQueue(seed)
      setQueue(seed)
    } else {
      setQueue(existing)
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'approvalQueue') refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const stats = useMemo(() => {
    return {
      pending: queue.filter(i => i.status === 'pending').length,
      approved: queue.filter(i => i.status === 'approved').length,
      rejected: queue.filter(i => i.status === 'rejected').length
    }
  }, [queue])

  const updateStatus = (id: string, status: ApprovalStatus) => {
    const now = new Date().toISOString().split('T')[0]
    const updated = queue.map(item => item.id === id ? { ...item, status, decisionBy: 'Current User', decisionAt: now } : item)
    setQueue(updated)
    writeQueue(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Approvals</h1>
          <p className="text-secondary-600">Review and take action on pending approvals</p>
        </div>
        <button className="btn btn-outline btn-md" onClick={refresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <XCircle className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Approval Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Type</th>
                <th className="table-head">Title</th>
                <th className="table-head">Submitted</th>
                <th className="table-head">Status</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {queue.map(item => (
                <tr key={item.id} className="table-row">
                  <td className="table-cell whitespace-nowrap">{item.entityType}</td>
                  <td className="table-cell">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                      <button className="p-1 text-secondary-400 hover:text-primary-600" title="View" onClick={() => setSelected(item)}>
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                    {item.details && (
                      <p className="text-xs text-secondary-500 mt-1">{item.details}</p>
                    )}
                  </td>
                  <td className="table-cell whitespace-nowrap">{new Date(item.submittedAt).toLocaleDateString()}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {item.status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                      {item.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />} 
                      {item.status === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />} 
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {item.status === 'pending' && (
                        <>
                          <button className="p-1 text-green-600 hover:text-green-700" title="Approve" onClick={() => updateStatus(item.id, 'approved')}>
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-700" title="Reject" onClick={() => updateStatus(item.id, 'rejected')}>
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSelected(null)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Approval Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-secondary-600">Type</p>
                      <p className="font-medium">{selected.entityType}</p>
                    </div>
                    <div>
                      <p className="text-secondary-600">Submitted</p>
                      <p className="font-medium">{new Date(selected.submittedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-secondary-600">Status</p>
                      <p className="font-medium">{selected.status}</p>
                    </div>
                    {selected.decisionBy && (
                      <div>
                        <p className="text-secondary-600">Decision By</p>
                        <p className="font-medium">{selected.decisionBy}</p>
                      </div>
                    )}
                    {selected.decisionAt && (
                      <div>
                        <p className="text-secondary-600">Decision At</p>
                        <p className="font-medium">{selected.decisionAt}</p>
                      </div>
                    )}
                  </div>
                  {selected.details && (
                    <div>
                      <p className="text-secondary-600 text-sm mb-1">Details</p>
                      <p className="text-secondary-900 text-sm">{selected.details}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3 pt-6">
                  {selected.status === 'pending' && (
                    <>
                      <button className="btn btn-outline btn-md" onClick={() => { updateStatus(selected.id, 'rejected'); setSelected(null) }}>Reject</button>
                      <button className="btn btn-primary btn-md" onClick={() => { updateStatus(selected.id, 'approved'); setSelected(null) }}>Approve</button>
                    </>
                  )}
                  {selected.status !== 'pending' && (
                    <button className="btn btn-outline btn-md" onClick={() => setSelected(null)}>Close</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


