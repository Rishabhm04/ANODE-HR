import React, { useState } from 'react'
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Home,
  UserCheck
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const kpiData = [
  {
    title: 'Total Employees',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Today',
    value: '1,156',
    change: '+5%',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    title: 'On Leave',
    value: '89',
    change: '-2%',
    changeType: 'negative',
    icon: Calendar,
    color: 'bg-yellow-500'
  },
  {
    title: 'Monthly Payroll',
    value: '$2.4M',
    change: '+8%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-purple-500'
  }
]

const attendanceData = [
  { name: 'Mon', present: 1200, absent: 47 },
  { name: 'Tue', present: 1180, absent: 67 },
  { name: 'Wed', present: 1220, absent: 27 },
  { name: 'Thu', present: 1190, absent: 57 },
  { name: 'Fri', present: 1210, absent: 37 },
  { name: 'Sat', present: 800, absent: 20 },
  { name: 'Sun', present: 600, absent: 15 }
]

const departmentData = [
  { name: 'Engineering', value: 400, color: '#3b82f6' },
  { name: 'Sales', value: 300, color: '#10b981' },
  { name: 'Marketing', value: 200, color: '#f59e0b' },
  { name: 'HR', value: 150, color: '#ef4444' },
  { name: 'Finance', value: 100, color: '#8b5cf6' }
]

const recentActivities = [
  {
    id: 1,
    type: 'leave',
    message: 'Sarah Johnson applied for 3 days leave',
    time: '2 hours ago',
    status: 'pending',
    icon: AlertCircle
  },
  {
    id: 2,
    type: 'attendance',
    message: 'Mike Chen marked late arrival',
    time: '4 hours ago',
    status: 'approved',
    icon: CheckCircle
  },
  {
    id: 3,
    type: 'payroll',
    message: 'December payroll processed successfully',
    time: '1 day ago',
    status: 'completed',
    icon: CheckCircle
  },
  {
    id: 4,
    type: 'employee',
    message: 'New employee John Smith joined Engineering',
    time: '2 days ago',
    status: 'completed',
    icon: Users
  }
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('employee')
  const [selectedPeriod, setSelectedPeriod] = useState('3 Days')

  const periodFilters = [
    { label: '3 Days', value: '3 Days', color: 'bg-black text-white' },
    { label: '7 Days', value: '7 Days', color: 'bg-blue-600 text-white' },
    { label: '15 Days', value: '15 Days', color: 'bg-red-600 text-white' },
    { label: '1 Month', value: '1 Month', color: 'bg-orange-600 text-white' },
    { label: '2 Months', value: '2 Months', color: 'bg-gray-600 text-white' }
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('employee')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'employee'
              ? 'bg-primary-100 text-primary-700'
              : 'text-secondary-600 hover:bg-secondary-100'
          }`}
        >
          <Home className="mr-2 h-4 w-4" />
          Employee Dashboard
        </button>
        <button
          onClick={() => setActiveTab('management')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'management'
              ? 'bg-primary-100 text-primary-700'
              : 'text-secondary-600 hover:bg-secondary-100'
          }`}
        >
          <UserCheck className="mr-2 h-4 w-4" />
          Management Dashboard
        </button>
      </div>

      {/* Date Range Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex space-x-2">
          {periodFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedPeriod(filter.value)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedPeriod === filter.value
                  ? filter.color
                  : 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="6/1/2023"
            className="px-3 py-1 border border-secondary-300 rounded text-sm"
          />
          <Calendar className="h-4 w-4 text-secondary-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="6/9/2023"
            className="px-3 py-1 border border-secondary-300 rounded text-sm"
          />
          <Calendar className="h-4 w-4 text-secondary-400" />
        </div>
        
        <button className="px-4 py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700">
          Show
        </button>
      </div>

      {/* Employee Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center">
              {/* Profile Picture */}
              <div className="w-24 h-24 mx-auto mb-4 bg-secondary-200 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IR</span>
                </div>
              </div>
              
              {/* Employee Name */}
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Ibad ur Rahman</h3>
              
              {/* Photo Upload */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Choose Photo..."
                    className="flex-1 px-3 py-2 border border-secondary-300 rounded text-sm"
                    readOnly
                  />
                  <button className="px-3 py-2 bg-secondary-100 text-secondary-700 rounded text-sm hover:bg-secondary-200">
                    Browse
                  </button>
                </div>
                
                <button className="w-full px-4 py-2 bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content Area */}
        <div className="lg:col-span-2">
          <div className="card p-6 min-h-96">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-secondary-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-secondary-400" />
                </div>
                <p className="text-lg font-medium">Dashboard Content</p>
                <p className="text-sm">Additional dashboard widgets and information will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-secondary-900">{kpi.value}</p>
                <p className={`text-sm ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${kpi.color}`}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#3b82f6" name="Present" />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100' :
                    activity.status === 'approved' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    <activity.icon className={`h-4 w-4 ${
                      activity.status === 'completed' ? 'text-green-600' :
                      activity.status === 'approved' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-secondary-900">{activity.message}</p>
                    <p className="text-xs text-secondary-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'approved' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary btn-md">
              <Users className="mr-2 h-4 w-4" />
              Add New Employee
            </button>
            <button className="w-full btn btn-outline btn-md">
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </button>
            <button className="w-full btn btn-outline btn-md">
              <Calendar className="mr-2 h-4 w-4" />
              Process Leave
            </button>
            <button className="w-full btn btn-outline btn-md">
              <DollarSign className="mr-2 h-4 w-4" />
              Run Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Organizational Chart Preview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Organizational Structure</h3>
        <div className="flex justify-center">
          <div className="bg-secondary-50 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-lg p-4 mb-4 inline-block">
                <h4 className="font-semibold">CEO</h4>
                <p className="text-sm opacity-90">John Smith</p>
              </div>
              <div className="flex justify-center space-x-8 mb-4">
                <div className="bg-secondary-200 rounded-lg p-3 text-center">
                  <h5 className="font-medium">COO</h5>
                  <p className="text-sm text-secondary-600">Jane Doe</p>
                </div>
                <div className="bg-secondary-200 rounded-lg p-3 text-center">
                  <h5 className="font-medium">CFO</h5>
                  <p className="text-sm text-secondary-600">Bob Johnson</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="bg-secondary-100 rounded p-2 text-center">
                  <p className="text-sm font-medium">HR Head</p>
                </div>
                <div className="bg-secondary-100 rounded p-2 text-center">
                  <p className="text-sm font-medium">Engineering</p>
                </div>
                <div className="bg-secondary-100 rounded p-2 text-center">
                  <p className="text-sm font-medium">Sales</p>
                </div>
                <div className="bg-secondary-100 rounded p-2 text-center">
                  <p className="text-sm font-medium">Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
