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
  UserCheck,
  Plus,
  Filter,
  Maximize2
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Training Chart Data
const trainingData = [
  { name: 'PENDING', value: 50, color: '#ef4444' },
  { name: 'APPROVED', value: 50, color: '#6b7280' }
]

// Employee Chart Data
const employeeData = [
  { name: 'Active', value: 63, color: '#f97316' },
  { name: 'Inactive', value: 46, color: '#6b7280' }
]

// Leave Chart Data
const leaveData = [
  { name: 'PENDING', count: 5 },
  { name: 'APPROVED', count: 240 },
  { name: 'REJECT', count: 45 },
  { name: '', count: 15 }
]

// Salary Advance Chart Data
const salaryAdvanceData = [
  { name: 'APPROVED', count: 10 },
  { name: 'CLEARED', count: 130 },
  { name: 'PENDING', count: 0 },
  { name: 'REJECT', count: 5 }
]

// KPI Data
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
    title: 'Monthly Salary',
    value: '$2.4M',
    change: '+8%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-purple-500'
  }
]

// Recent Activities
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
    type: 'salary',
    message: 'December salary processed successfully',
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
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
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

      {/* Main Dashboard Charts - 2x2 Grid (Half Size) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">TRAINING CHART</h3>
              <p className="text-sm text-gray-600">VERIFIED STATUS</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4 inline mr-1" />
                Add
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trainingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {trainingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">PENDING</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-gray-600">APPROVED</span>
            </div>
          </div>
        </div>

        {/* Employee Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">EMPLOYEE CHART</h3>
              <p className="text-sm text-gray-600">ACTIVE / INACTIVE</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employeeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {employeeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Inactive</span>
            </div>
          </div>
        </div>

        {/* Leave Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">LEAVE CHART</h3>
              <p className="text-sm text-gray-600">Approval</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4 inline mr-1" />
                Add
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaveData} layout="horizontal">
              <XAxis type="number" domain={[0, 250]} />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Advance Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">SALARY ADVANCE CHART</h3>
              <p className="text-sm text-gray-600">APPROVAL</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4 inline mr-1" />
                Add
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryAdvanceData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 150]} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
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
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center justify-center">
              <Users className="mr-2 h-4 w-4" />
              Add New Employee
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center">
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" />
              Process Leave
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Run Salary
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
