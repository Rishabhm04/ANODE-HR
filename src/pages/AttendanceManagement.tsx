import React, { useState } from 'react'
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Fingerprint,
  Smartphone
} from 'lucide-react'

interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  clockIn: string
  clockOut: string
  totalHours: number
  status: 'present' | 'late' | 'absent' | 'half-day'
  location: string
  method: 'biometric' | 'online'
}

interface Shift {
  id: string
  name: string
  startTime: string
  endTime: string
  graceTime: number
  isActive: boolean
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    date: '2024-01-15',
    clockIn: '09:15 AM',
    clockOut: '06:30 PM',
    totalHours: 8.5,
    status: 'late',
    location: 'Main Office',
    method: 'biometric'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    date: '2024-01-15',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    totalHours: 8.0,
    status: 'present',
    location: 'Remote',
    method: 'online'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Chen',
    date: '2024-01-15',
    clockIn: '08:45 AM',
    clockOut: '06:15 PM',
    totalHours: 8.5,
    status: 'present',
    location: 'Main Office',
    method: 'biometric'
  }
]

const mockShifts: Shift[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    graceTime: 15,
    isActive: true
  },
  {
    id: '2',
    name: 'Evening Shift',
    startTime: '02:00 PM',
    endTime: '11:00 PM',
    graceTime: 15,
    isActive: true
  },
  {
    id: '3',
    name: 'Night Shift',
    startTime: '10:00 PM',
    endTime: '06:00 AM',
    graceTime: 30,
    isActive: false
  }
]

export default function AttendanceManagement() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance)
  const [shifts, setShifts] = useState<Shift[]>(mockShifts)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedShift, setSelectedShift] = useState('All')
  const [showShiftModal, setShowShiftModal] = useState(false)
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-secondary-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800'
      case 'late':
        return 'bg-yellow-100 text-yellow-800'
      case 'absent':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Attendance Management</h1>
          <p className="text-secondary-600">Track employee attendance, manage shifts, and monitor time records</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowBulkAssignModal(true)}
            className="btn btn-outline btn-md"
          >
            <Users className="mr-2 h-4 w-4" />
            Bulk Assign
          </button>
          <button className="btn btn-primary btn-md">
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Online Punches</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <Smartphone className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Shift</label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="input"
            >
              <option value="All">All Shifts</option>
              {shifts.map(shift => (
                <option key={shift.id} value={shift.id}>{shift.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select className="input">
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn btn-outline btn-md w-full">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Employee</th>
                <th className="table-head">Date</th>
                <th className="table-head">Clock In</th>
                <th className="table-head">Clock Out</th>
                <th className="table-head">Total Hours</th>
                <th className="table-head">Status</th>
                <th className="table-head">Location</th>
                <th className="table-head">Method</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {attendance.map((record) => (
                <tr key={record.id} className="table-row">
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-secondary-900">{record.employeeName}</p>
                      <p className="text-sm text-secondary-500">ID: {record.employeeId}</p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm">{record.clockIn}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm">{record.clockOut}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">{record.totalHours}h</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm">{record.location}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {record.method === 'biometric' ? (
                        <Fingerprint className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Smartphone className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm capitalize">{record.method}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-red-600">
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

      {/* Shift Management */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Shift Management</h3>
          <button 
            onClick={() => setShowShiftModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Shift
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="border border-secondary-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-secondary-900">{shift.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    shift.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shift.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Start Time:</span>
                    <span className="font-medium">{shift.startTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">End Time:</span>
                    <span className="font-medium">{shift.endTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Grace Time:</span>
                    <span className="font-medium">{shift.graceTime} min</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button className="p-1 text-secondary-400 hover:text-primary-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-secondary-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Punching Interface */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Online Punching</h3>
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="text-center">
            <div className="mb-4">
              <Clock className="h-16 w-16 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-900">09:45 AM</p>
              <p className="text-secondary-600">Monday, January 15, 2024</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="btn btn-primary btn-lg">
                <Clock className="mr-2 h-5 w-5" />
                Clock In
              </button>
              <button className="btn btn-outline btn-lg">
                <Clock className="mr-2 h-5 w-5" />
                Clock Out
              </button>
            </div>
            <div className="mt-4 text-sm text-secondary-600">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location: Main Office, Building A
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Assignment Modal */}
      {showBulkAssignModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowBulkAssignModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Bulk Shift Assignment</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Select Shift</label>
                    <select className="input">
                      {shifts.map(shift => (
                        <option key={shift.id} value={shift.id}>{shift.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Assignment Scope</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="scope" value="company" className="mr-2" />
                        <span className="text-sm">Entire Company</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="scope" value="department" className="mr-2" />
                        <span className="text-sm">Specific Department</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="scope" value="individual" className="mr-2" />
                        <span className="text-sm">Individual Employees</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Effective Date</label>
                    <input type="date" className="input" />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowBulkAssignModal(false)}
                      className="btn btn-outline btn-md"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      Assign Shift
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
