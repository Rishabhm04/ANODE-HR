import React, { useState } from 'react'
import { 
  BarChart3, 
  Download, 
  Filter, 
  Plus, 
  Calendar,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface Report {
  id: string
  name: string
  type: 'attendance' | 'payroll' | 'leave' | 'performance' | 'employee'
  description: string
  createdDate: string
  lastRun?: string
  isScheduled: boolean
}

interface ReportData {
  name: string
  value: number
  color?: string
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Attendance Report',
    type: 'attendance',
    description: 'Comprehensive attendance summary for the month',
    createdDate: '2024-01-01',
    lastRun: '2024-01-15',
    isScheduled: true
  },
  {
    id: '2',
    name: 'Payroll Summary',
    type: 'payroll',
    description: 'Monthly payroll breakdown by department',
    createdDate: '2024-01-01',
    lastRun: '2024-01-05',
    isScheduled: false
  },
  {
    id: '3',
    name: 'Leave Analytics',
    type: 'leave',
    description: 'Leave patterns and trends analysis',
    createdDate: '2024-01-01',
    isScheduled: true
  },
  {
    id: '4',
    name: 'Employee Directory',
    type: 'employee',
    description: 'Complete employee information export',
    createdDate: '2024-01-01',
    lastRun: '2024-01-10',
    isScheduled: false
  }
]

const attendanceData = [
  { name: 'Jan', present: 1200, absent: 47, late: 23 },
  { name: 'Feb', present: 1180, absent: 67, late: 31 },
  { name: 'Mar', present: 1220, absent: 27, late: 19 },
  { name: 'Apr', present: 1190, absent: 57, late: 28 },
  { name: 'May', present: 1210, absent: 37, late: 25 },
  { name: 'Jun', present: 1230, absent: 17, late: 15 }
]

const departmentData = [
  { name: 'Engineering', employees: 45, avgSalary: 85000, turnover: 5 },
  { name: 'Sales', employees: 32, avgSalary: 75000, turnover: 8 },
  { name: 'Marketing', employees: 18, avgSalary: 65000, turnover: 3 },
  { name: 'HR', employees: 12, avgSalary: 70000, turnover: 2 },
  { name: 'Finance', employees: 8, avgSalary: 80000, turnover: 1 }
]

const leaveData = [
  { name: 'Annual Leave', value: 45, color: '#3b82f6' },
  { name: 'Sick Leave', value: 23, color: '#ef4444' },
  { name: 'Personal Leave', value: 12, color: '#f59e0b' },
  { name: 'Maternity Leave', value: 8, color: '#10b981' },
  { name: 'Other', value: 5, color: '#8b5cf6' }
]

const performanceData = [
  { name: 'Q1', score: 3.8 },
  { name: 'Q2', score: 4.1 },
  { name: 'Q3', score: 4.2 },
  { name: 'Q4', score: 4.3 }
]

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReportType, setSelectedReportType] = useState('All')
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'payroll':
        return <DollarSign className="h-4 w-4 text-green-500" />
      case 'leave':
        return <Calendar className="h-4 w-4 text-yellow-500" />
      case 'performance':
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      case 'employee':
        return <Users className="h-4 w-4 text-orange-500" />
      default:
        return <FileText className="h-4 w-4 text-secondary-500" />
    }
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'bg-blue-100 text-blue-800'
      case 'payroll':
        return 'bg-green-100 text-green-800'
      case 'leave':
        return 'bg-yellow-100 text-yellow-800'
      case 'performance':
        return 'bg-purple-100 text-purple-800'
      case 'employee':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  const filteredReports = reports.filter(report => 
    selectedReportType === 'All' || report.type === selectedReportType
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Reports & Analytics</h1>
          <p className="text-secondary-600">Generate custom reports and analyze HR data</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline btn-md"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary btn-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Reports</p>
              <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Scheduled Reports</p>
              <p className="text-2xl font-bold text-green-600">{reports.filter(r => r.isScheduled).length}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Reports Run Today</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Data Exports</p>
              <p className="text-2xl font-bold text-orange-600">45</p>
            </div>
            <Download className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Report Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Report Type</label>
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="input"
              >
                <option value="All">All Types</option>
                <option value="attendance">Attendance</option>
                <option value="payroll">Payroll</option>
                <option value="leave">Leave</option>
                <option value="performance">Performance</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Date Range</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="input"
              >
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="Last year">Last year</option>
                <option value="Custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
              <select className="input">
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
              <select className="input">
                <option value="All">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Saved Reports */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Saved Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Report Name</th>
                <th className="table-head">Type</th>
                <th className="table-head">Description</th>
                <th className="table-head">Created Date</th>
                <th className="table-head">Last Run</th>
                <th className="table-head">Status</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredReports.map((report) => (
                <tr key={report.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      {getReportIcon(report.type)}
                      <div>
                        <p className="font-medium text-secondary-900">{report.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-secondary-600">{report.description}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{new Date(report.createdDate).toLocaleDateString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">
                      {report.lastRun ? new Date(report.lastRun).toLocaleDateString() : 'Never'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.isScheduled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.isScheduled ? 'Scheduled' : 'Manual'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Download className="h-4 w-4" />
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

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#3b82f6" name="Present" />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              <Bar dataKey="late" fill="#f59e0b" name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Leave Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Department Overview</h3>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary-900">{dept.name}</p>
                  <p className="text-sm text-secondary-600">{dept.employees} employees</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${dept.avgSalary.toLocaleString()}</p>
                  <p className="text-xs text-secondary-500">Avg. Salary</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{dept.turnover}%</p>
                  <p className="text-xs text-secondary-500">Turnover</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[3, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Custom Report Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-secondary-900">Data Sources</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm">Employee Data</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm">Attendance Records</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Payroll Information</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Leave Records</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Performance Data</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-secondary-900">Filters</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
                <select className="input">
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Date Range</label>
                <select className="input">
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 3 months">Last 3 months</option>
                  <option value="Last year">Last year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Employee Status</label>
                <select className="input">
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-secondary-900">Output Format</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="format" value="excel" className="mr-2" defaultChecked />
                <span className="text-sm">Excel (.xlsx)</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="format" value="pdf" className="mr-2" />
                <span className="text-sm">PDF</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="format" value="csv" className="mr-2" />
                <span className="text-sm">CSV</span>
              </label>
            </div>
            <button className="btn btn-primary btn-md w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowCreateModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Create New Report</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Report Name</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="Enter report name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Report Type</label>
                    <select className="input">
                      <option value="">Select report type</option>
                      <option value="attendance">Attendance Report</option>
                      <option value="payroll">Payroll Report</option>
                      <option value="leave">Leave Report</option>
                      <option value="performance">Performance Report</option>
                      <option value="employee">Employee Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
                    <textarea 
                      className="input min-h-[80px]"
                      placeholder="Enter report description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Schedule</label>
                      <select className="input">
                        <option value="manual">Manual Only</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Format</label>
                      <select className="input">
                        <option value="excel">Excel</option>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn btn-outline btn-md"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      Create Report
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
