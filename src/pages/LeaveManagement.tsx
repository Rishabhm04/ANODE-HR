import React, { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

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
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(mockLeaveTypes)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedLeaveType, setSelectedLeaveType] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showLeaveTypeModal, setShowLeaveTypeModal] = useState(false)
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null)

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
  }

  const handleRejectRequest = (id: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status: 'rejected' as const, approvedBy: 'Current User', approvedDate: new Date().toISOString().split('T')[0] }
        : req
    ))
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
          <button 
            onClick={() => setShowLeaveTypeModal(true)}
            className="btn btn-outline btn-md"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Leave Types
          </button>
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
            <button className="btn btn-outline btn-md w-full">
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
                        </>
                      )}
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
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

      {/* Apply Leave Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {editingRequest ? 'Edit Leave Request' : 'Apply for Leave'}
                </h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Leave Type</label>
                      <select className="input" defaultValue={editingRequest?.leaveType || ''}>
                        {leaveTypes.map(type => (
                          <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Employee</label>
                      <select className="input" defaultValue={editingRequest?.employeeId || ''}>
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
                        defaultValue={editingRequest?.startDate || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">End Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        defaultValue={editingRequest?.endDate || ''}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Reason</label>
                    <textarea 
                      className="input min-h-[80px]"
                      defaultValue={editingRequest?.reason || ''}
                      placeholder="Enter reason for leave"
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Available balance: 15 days. This request will use 3 days.
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
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
    </div>
  )
}
