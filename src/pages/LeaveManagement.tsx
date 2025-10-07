import React, { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  AlertCircle,
  Eye,
  Edit,
  
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  leaveType: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
  approvedBy?: string
  approvedDate?: string
  balance: number
}

interface LeaveType {
  id: string
  name: string
  maxDays: number
  requiresApproval: boolean
  isActive: boolean
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    leaveType: 'Annual Leave',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    days: 3,
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2024-01-15',
    balance: 12
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    leaveType: 'Sick Leave',
    startDate: '2024-01-18',
    endDate: '2024-01-18',
    days: 1,
    reason: 'Medical appointment',
    status: 'approved',
    appliedDate: '2024-01-17',
    approvedBy: 'Mike Chen',
    approvedDate: '2024-01-17',
    balance: 8
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Chen',
    leaveType: 'Personal Leave',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    days: 1,
    reason: 'Personal matters',
    status: 'rejected',
    appliedDate: '2024-01-20',
    approvedBy: 'Sarah Johnson',
    approvedDate: '2024-01-21',
    balance: 5
  }
]

const mockLeaveTypes: LeaveType[] = [
  {
    id: '1',
    name: 'Annual Leave',
    maxDays: 20,
    requiresApproval: true,
    isActive: true
  },
  {
    id: '2',
    name: 'Sick Leave',
    maxDays: 10,
    requiresApproval: false,
    isActive: true
  },
  {
    id: '3',
    name: 'Personal Leave',
    maxDays: 5,
    requiresApproval: true,
    isActive: true
  },
  {
    id: '4',
    name: 'Maternity Leave',
    maxDays: 90,
    requiresApproval: true,
    isActive: true
  }
]

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests)
  const [leaveTypes] = useState<LeaveType[]>(mockLeaveTypes)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedLeaveType, setSelectedLeaveType] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null)
  const [viewingRequest, setViewingRequest] = useState<LeaveRequest | null>(null)
  
  // Listen to approval queue updates and reflect status changes
  React.useEffect(() => {
    const syncFromQueue = () => {
      try {
        const raw = localStorage.getItem('approvalQueue')
        const queue = raw ? JSON.parse(raw) : []
        if (!Array.isArray(queue)) return
        setLeaveRequests(prev => prev.map(req => {
          const match = queue.find((i: any) => i.entityType === 'leave' && i.entityId === req.id)
          if (!match) return req
          if (match.status === 'approved' && req.status !== 'approved') {
            return { ...req, status: 'approved', approvedBy: match.decisionBy || 'Current User', approvedDate: match.decisionAt || new Date().toISOString().split('T')[0] }
          }
          if (match.status === 'rejected' && req.status !== 'rejected') {
            return { ...req, status: 'rejected', approvedBy: match.decisionBy || 'Current User', approvedDate: match.decisionAt || new Date().toISOString().split('T')[0] }
          }
          return req
        }))
      } catch {}
    }
    syncFromQueue()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'approvalQueue') syncFromQueue()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  
  // Form state for editing/adding leave requests
  const [formData, setFormData] = useState({
    leaveType: '',
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-secondary-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  const handleApproveRequest = (id: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status: 'approved' as const, approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ))
    // sync approval queue if present
    try {
      const raw = localStorage.getItem('approvalQueue')
      const queue = raw ? JSON.parse(raw) : []
      const updated = Array.isArray(queue) ? queue.map((i: any) => i.entityType === 'leave' && i.entityId === id ? { ...i, status: 'approved', decisionBy: 'Current User', decisionAt: new Date().toISOString().split('T')[0] } : i) : []
      localStorage.setItem('approvalQueue', JSON.stringify(updated))
    } catch {}
  }

  const handleRejectRequest = (id: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status: 'rejected' as const, approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ))
    // sync approval queue if present
    try {
      const raw = localStorage.getItem('approvalQueue')
      const queue = raw ? JSON.parse(raw) : []
      const updated = Array.isArray(queue) ? queue.map((i: any) => i.entityType === 'leave' && i.entityId === id ? { ...i, status: 'rejected', decisionBy: 'Current User', decisionAt: new Date().toISOString().split('T')[0] } : i) : []
      localStorage.setItem('approvalQueue', JSON.stringify(updated))
    } catch {}
  }

  const handleViewRequest = (request: LeaveRequest) => {
    setViewingRequest(request)
    setShowViewModal(true)
  }

  const handleEditRequest = (request: LeaveRequest) => {
    setEditingRequest(request)
    setFormData({
      leaveType: request.leaveType,
      employeeId: request.employeeId,
      startDate: request.startDate,
      endDate: request.endDate,
      reason: request.reason,
      status: request.status
    })
    setShowAddModal(true)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingRequest) {
      // Update existing request
      setLeaveRequests(prev => prev.map(req => 
        req.id === editingRequest.id 
          ? { 
              ...req, 
              leaveType: formData.leaveType,
              startDate: formData.startDate,
              endDate: formData.endDate,
              reason: formData.reason,
              status: formData.status as 'pending' | 'approved' | 'rejected',
              days: Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
              approvedBy: formData.status === 'approved' || formData.status === 'rejected' ? 'Current User' : req.approvedBy,
              approvedDate: formData.status === 'approved' || formData.status === 'rejected' ? new Date().toISOString().split('T')[0] : req.approvedDate
            }
          : req
      ))
    } else {
      // Add new request
      const newRequest: LeaveRequest = {
        id: String(leaveRequests.length + 1),
        employeeId: formData.employeeId,
        employeeName: formData.employeeId === 'EMP001' ? 'John Smith' : 
                     formData.employeeId === 'EMP002' ? 'Sarah Johnson' : 'Mike Chen',
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
        reason: formData.reason,
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0],
        balance: 15
      }
      setLeaveRequests(prev => [...prev, newRequest])
      // If leave type requires approval, push to approval queue
      const type = leaveTypes.find(t => t.name === newRequest.leaveType)
      if (type?.requiresApproval) {
        try {
          const raw = localStorage.getItem('approvalQueue')
          const queue = raw ? JSON.parse(raw) : []
          const item = {
            id: `leave-${newRequest.id}`,
            entityId: newRequest.id,
            entityType: 'leave',
            title: `${newRequest.employeeName} - ${newRequest.leaveType} (${newRequest.days} days)`,
            details: `${newRequest.startDate} to ${newRequest.endDate}: ${newRequest.reason}`,
            status: 'pending',
            submittedBy: 'Current User',
            submittedAt: new Date().toISOString(),
          }
          const next = Array.isArray(queue) ? [item, ...queue] : [item]
          localStorage.setItem('approvalQueue', JSON.stringify(next))
        } catch {}
      }
    }
    
    // Reset form and close modal
    setFormData({
      leaveType: '',
      employeeId: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    })
    setEditingRequest(null)
    setShowAddModal(false)
  }

  const handleCloseModal = () => {
    setFormData({
      leaveType: '',
      employeeId: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    })
    setEditingRequest(null)
    setShowAddModal(false)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = [
      'Employee ID', 
      'Employee Name', 
      'Leave Type', 
      'Start Date', 
      'End Date', 
      'Days', 
      'Reason', 
      'Applied Date', 
      'Status', 
      'Approved By', 
      'Approved Date', 
      'Balance'
    ]
    
    const csvContent = [
      headers.join(','),
      ...filteredRequests.map(request => [
        request.employeeId,
        `"${request.employeeName}"`,
        request.leaveType,
        request.startDate,
        request.endDate,
        request.days,
        `"${request.reason}"`,
        request.appliedDate,
        request.status,
        request.approvedBy || '',
        request.approvedDate || '',
        request.balance
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `leave-requests-${selectedStatus.toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = selectedStatus === 'All' || request.status === selectedStatus
    const matchesLeaveType = selectedLeaveType === 'All' || request.leaveType === selectedLeaveType
    return matchesStatus && matchesLeaveType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Leave Management</h1>
          <p className="text-secondary-600">Manage employee leave requests, balances, and approval workflows</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/approval" className="btn btn-outline btn-md">
            <CheckCircle className="mr-2 h-4 w-4" />
            Go to Approvals
          </Link>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Apply Leave
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">On Leave Today</p>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Leave Type</label>
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className="input"
            >
              <option value="All">All Types</option>
              {leaveTypes.map(type => (
                <option key={type.id} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date Range</label>
            <input type="date" className="input" />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleExport}
              className="btn btn-outline btn-md w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Employee</th>
                <th className="table-head">Leave Type</th>
                <th className="table-head">Duration</th>
                <th className="table-head">Reason</th>
                <th className="table-head">Applied Date</th>
                <th className="table-head">Status</th>
                <th className="table-head">Balance</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{request.employeeName}</p>
                        <p className="text-sm text-secondary-500">ID: {request.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">{request.leaveType}</span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-secondary-500">{request.days} day(s)</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-secondary-600">{request.reason}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{new Date(request.appliedDate).toLocaleDateString()}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">{request.balance} days</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveRequest(request.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleRejectRequest(request.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              try {
                                const raw = localStorage.getItem('approvalQueue')
                                const queue = raw ? JSON.parse(raw) : []
                                // Avoid duplicates
                                const exists = Array.isArray(queue) && queue.some((i: any) => i.entityType === 'leave' && i.entityId === request.id)
                                if (!exists) {
                                  const item = {
                                    id: `leave-${request.id}`,
                                    entityId: request.id,
                                    entityType: 'leave',
                                    title: `${request.employeeName} - ${request.leaveType} (${request.days} days)`,
                                    details: `${request.startDate} to ${request.endDate}: ${request.reason}`,
                                    status: 'pending',
                                    submittedBy: 'Current User',
                                    submittedAt: new Date().toISOString(),
                                  }
                                  const next = Array.isArray(queue) ? [item, ...queue] : [item]
                                  localStorage.setItem('approvalQueue', JSON.stringify(next))
                                }
                              } catch {}
                            }}
                            className="p-1 text-yellow-600 hover:text-yellow-700"
                            title="Send to Approval"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleViewRequest(request)}
                        className="p-1 text-secondary-400 hover:text-primary-600"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditRequest(request)}
                        className="p-1 text-secondary-400 hover:text-primary-600"
                        title="Edit Request"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Balance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Leave Balance Summary</h3>
          <div className="space-y-4">
            {leaveTypes.map((type) => (
              <div key={type.id} className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">{type.name}</p>
                  <p className="text-sm text-secondary-600">Max: {type.maxDays} days</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">Available</p>
                  <p className="text-lg font-bold text-primary-600">{type.maxDays - 5}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Leave Calendar</h3>
          <div className="bg-secondary-50 rounded-lg p-4 text-center">
            <Calendar className="h-12 w-12 text-primary-600 mx-auto mb-2" />
            <p className="text-secondary-600">Calendar view coming soon</p>
            <p className="text-sm text-secondary-500">Track leave patterns and availability</p>
          </div>
        </div>
      </div>

      {/* Apply/Edit Leave Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleCloseModal} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {editingRequest ? 'Edit Leave Request' : 'Apply for Leave'}
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Leave Type</label>
                      <select 
                        className="input" 
                        value={formData.leaveType}
                        onChange={(e) => handleFormChange('leaveType', e.target.value)}
                        required
                      >
                        <option value="">Select Leave Type</option>
                        {leaveTypes.map(type => (
                          <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Employee</label>
                      <select 
                        className="input" 
                        value={formData.employeeId}
                        onChange={(e) => handleFormChange('employeeId', e.target.value)}
                        required
                      >
                        <option value="">Select Employee</option>
                        <option value="EMP001">John Smith</option>
                        <option value="EMP002">Sarah Johnson</option>
                        <option value="EMP003">Mike Chen</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Start Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        value={formData.startDate}
                        onChange={(e) => handleFormChange('startDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">End Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        value={formData.endDate}
                        onChange={(e) => handleFormChange('endDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Status field - only show when editing */}
                  {editingRequest && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                        <select 
                          className="input" 
                          value={formData.status}
                          onChange={(e) => handleFormChange('status', e.target.value)}
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        {/* Empty div for grid alignment */}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Reason</label>
                    <textarea 
                      className="input min-h-[80px]"
                      value={formData.reason}
                      onChange={(e) => handleFormChange('reason', e.target.value)}
                      placeholder="Enter reason for leave"
                      required
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Available balance: 15 days. This request will use {formData.startDate && formData.endDate ? 
                          Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0} days.
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={handleCloseModal}
                      className="btn btn-outline btn-md"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      {editingRequest ? 'Update Request' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Leave Request Modal */}
      {showViewModal && viewingRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowViewModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Leave Request Details</h3>
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Employee Information */}
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Employee Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Employee Name</p>
                        <p className="text-lg font-semibold text-secondary-900">{viewingRequest.employeeName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Employee ID</p>
                        <p className="text-lg font-semibold text-secondary-900">{viewingRequest.employeeId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Leave Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Leave Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Leave Type</p>
                        <p className="text-lg font-semibold text-secondary-900">{viewingRequest.leaveType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Duration</p>
                        <p className="text-lg font-semibold text-secondary-900">{viewingRequest.days} day(s)</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Start Date</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {new Date(viewingRequest.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">End Date</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {new Date(viewingRequest.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Status Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Current Status</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(viewingRequest.status)}
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewingRequest.status)}`}>
                            {viewingRequest.status.charAt(0).toUpperCase() + viewingRequest.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Applied Date</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {new Date(viewingRequest.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      {viewingRequest.approvedBy && (
                        <div>
                          <p className="text-sm font-medium text-secondary-600">Approved By</p>
                          <p className="text-lg font-semibold text-secondary-900">{viewingRequest.approvedBy}</p>
                        </div>
                      )}
                      {viewingRequest.approvedDate && (
                        <div>
                          <p className="text-sm font-medium text-secondary-600">Approved Date</p>
                          <p className="text-lg font-semibold text-secondary-900">
                            {new Date(viewingRequest.approvedDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Reason for Leave
                    </h4>
                    <p className="text-secondary-700">{viewingRequest.reason}</p>
                  </div>

                  {/* Leave Balance */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      Leave Balance
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-600">Remaining Balance</span>
                      <span className="text-2xl font-bold text-primary-600">{viewingRequest.balance} days</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-secondary-200">
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="btn btn-outline btn-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
