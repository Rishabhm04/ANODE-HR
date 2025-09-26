import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Users, 
  Mail, 
  Shield, 
  Database, 
  Bell,
  Globe,
  Key,
  Save,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Department {
  id: string
  name: string
  description: string
  head: string
  isActive: boolean
}

interface Designation {
  id: string
  name: string
  department: string
  level: string
  isActive: boolean
}

interface Holiday {
  id: string
  name: string
  date: string
  type: 'national' | 'company' | 'religious'
  isRecurring: boolean
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical operations',
    head: 'John Smith',
    isActive: true
  },
  {
    id: '2',
    name: 'Human Resources',
    description: 'Employee management and organizational development',
    head: 'Sarah Johnson',
    isActive: true
  },
  {
    id: '3',
    name: 'Sales',
    description: 'Business development and customer acquisition',
    head: 'Mike Chen',
    isActive: true
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Brand management and promotional activities',
    head: 'Emily Davis',
    isActive: false
  }
]

const mockDesignations: Designation[] = [
  {
    id: '1',
    name: 'Senior Developer',
    department: 'Engineering',
    level: 'Senior',
    isActive: true
  },
  {
    id: '2',
    name: 'HR Manager',
    department: 'Human Resources',
    level: 'Manager',
    isActive: true
  },
  {
    id: '3',
    name: 'Sales Director',
    department: 'Sales',
    level: 'Director',
    isActive: true
  },
  {
    id: '4',
    name: 'Marketing Specialist',
    department: 'Marketing',
    level: 'Specialist',
    isActive: true
  }
]

const mockHolidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year',
    date: '2024-01-01',
    type: 'national',
    isRecurring: true
  },
  {
    id: '2',
    name: 'Independence Day',
    date: '2024-08-14',
    type: 'national',
    isRecurring: true
  },
  {
    id: '3',
    name: 'Company Foundation Day',
    date: '2024-06-15',
    type: 'company',
    isRecurring: true
  },
  {
    id: '4',
    name: 'Eid-ul-Fitr',
    date: '2024-04-10',
    type: 'religious',
    isRecurring: false
  }
]

export default function Settings() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [designations, setDesignations] = useState<Designation[]>(mockDesignations)
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays)
  const [activeTab, setActiveTab] = useState('departments')
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showDesignationModal, setShowDesignationModal] = useState(false)
  const [showHolidayModal, setShowHolidayModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const tabs = [
    { id: 'departments', name: 'Departments', icon: Users },
    { id: 'designations', name: 'Designations', icon: Key },
    { id: 'holidays', name: 'Holidays', icon: Globe },
    { id: 'email', name: 'Email Config', icon: Mail },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  const handleDeleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  const handleDeleteDesignation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this designation?')) {
      setDesignations(designations.filter(des => des.id !== id))
    }
  }

  const handleDeleteHoliday = (id: string) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      setHolidays(holidays.filter(holiday => holiday.id !== id))
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'national':
        return 'bg-blue-100 text-blue-800'
      case 'company':
        return 'bg-green-100 text-green-800'
      case 'religious':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">System Settings</h1>
        <p className="text-secondary-600">Configure system parameters, departments, and organizational settings</p>
      </div>

      {/* Settings Tabs */}
      <div className="card">
        <div className="border-b border-secondary-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-900">Departments</h3>
                <button 
                  onClick={() => setShowDepartmentModal(true)}
                  className="btn btn-primary btn-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Department
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Name</th>
                      <th className="table-head">Description</th>
                      <th className="table-head">Head</th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {departments.map((dept) => (
                      <tr key={dept.id} className="table-row">
                        <td className="table-cell">
                          <span className="font-medium text-secondary-900">{dept.name}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm text-secondary-600">{dept.description}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{dept.head}</span>
                        </td>
                        <td className="table-cell">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            dept.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {dept.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setEditingItem(dept)
                                setShowDepartmentModal(true)
                              }}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDepartment(dept.id)}
                              className="p-1 text-secondary-400 hover:text-red-600"
                            >
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
          )}

          {/* Designations Tab */}
          {activeTab === 'designations' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-900">Designations</h3>
                <button 
                  onClick={() => setShowDesignationModal(true)}
                  className="btn btn-primary btn-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Designation
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Name</th>
                      <th className="table-head">Department</th>
                      <th className="table-head">Level</th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {designations.map((des) => (
                      <tr key={des.id} className="table-row">
                        <td className="table-cell">
                          <span className="font-medium text-secondary-900">{des.name}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{des.department}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{des.level}</span>
                        </td>
                        <td className="table-cell">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            des.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {des.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setEditingItem(des)
                                setShowDesignationModal(true)
                              }}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDesignation(des.id)}
                              className="p-1 text-secondary-400 hover:text-red-600"
                            >
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
          )}

          {/* Holidays Tab */}
          {activeTab === 'holidays' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-900">Holiday Calendar</h3>
                <button 
                  onClick={() => setShowHolidayModal(true)}
                  className="btn btn-primary btn-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Holiday
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Name</th>
                      <th className="table-head">Date</th>
                      <th className="table-head">Type</th>
                      <th className="table-head">Recurring</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {holidays.map((holiday) => (
                      <tr key={holiday.id} className="table-row">
                        <td className="table-cell">
                          <span className="font-medium text-secondary-900">{holiday.name}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(holiday.date).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(holiday.type)}`}>
                            {holiday.type}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            holiday.isRecurring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {holiday.isRecurring ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setEditingItem(holiday)
                                setShowHolidayModal(true)
                              }}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteHoliday(holiday.id)}
                              className="p-1 text-secondary-400 hover:text-red-600"
                            >
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
          )}

          {/* Email Configuration Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900">Email Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">SMTP Server</label>
                    <input type="text" className="input" placeholder="smtp.gmail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Port</label>
                    <input type="number" className="input" placeholder="587" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Username</label>
                    <input type="email" className="input" placeholder="hr@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Password</label>
                    <input type="password" className="input" placeholder="••••••••" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">From Name</label>
                    <input type="text" className="input" placeholder="HR Department" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">From Email</label>
                    <input type="email" className="input" placeholder="noreply@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Security</label>
                    <select className="input">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="test-email" className="rounded" />
                    <label htmlFor="test-email" className="text-sm text-secondary-700">Send test email</label>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-md">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900">Security Settings</h3>
              <div className="space-y-6">
                <div className="card p-4">
                  <h4 className="font-medium text-secondary-900 mb-3">Password Policy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minimum password length</span>
                      <select className="input w-20">
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require special characters</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require numbers</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Password expiration (days)</span>
                      <input type="number" className="input w-20" defaultValue="90" />
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-secondary-900 mb-3">Session Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Session timeout (minutes)</span>
                      <input type="number" className="input w-20" defaultValue="30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allow concurrent sessions</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require re-authentication for sensitive actions</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-secondary-900 mb-3">Access Control</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable two-factor authentication</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">IP whitelist</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit log retention (days)</span>
                      <input type="number" className="input w-20" defaultValue="365" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-md">
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-900">Notification Settings</h3>
              <div className="space-y-6">
                <div className="card p-4">
                  <h4 className="font-medium text-secondary-900 mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Leave applications</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payroll processing</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Attendance alerts</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Performance reviews</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-secondary-900 mb-3">System Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System maintenance</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security alerts</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data backup status</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">License expiration</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-md">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Department Modal */}
      {showDepartmentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowDepartmentModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {editingItem ? 'Edit Department' : 'Add Department'}
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      className="input" 
                      defaultValue={editingItem?.name || ''}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
                    <textarea 
                      className="input min-h-[80px]"
                      defaultValue={editingItem?.description || ''}
                      placeholder="Enter department description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Head</label>
                    <input 
                      type="text" 
                      className="input" 
                      defaultValue={editingItem?.head || ''}
                      placeholder="Enter department head name"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="isActive" 
                      className="rounded" 
                      defaultChecked={editingItem?.isActive !== false}
                    />
                    <label htmlFor="isActive" className="text-sm text-secondary-700">Active</label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowDepartmentModal(false)
                        setEditingItem(null)
                      }}
                      className="btn btn-outline btn-md"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary btn-md"
                    >
                      {editingItem ? 'Update' : 'Add'} Department
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
