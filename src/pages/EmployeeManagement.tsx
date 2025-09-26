import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  department: string
  designation: string
  joiningDate: string
  salary: number
  status: 'active' | 'inactive'
  avatar?: string
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    designation: 'Senior Developer',
    joiningDate: '2022-01-15',
    salary: 85000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '2021-03-20',
    salary: 75000,
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Sales',
    designation: 'Sales Director',
    joiningDate: '2020-06-10',
    salary: 95000,
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    joiningDate: '2023-02-01',
    salary: 65000,
    status: 'active'
  }
]

const departments = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance']
const designations = ['All', 'Senior Developer', 'HR Manager', 'Sales Director', 'Marketing Specialist', 'Junior Developer']

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedDesignation, setSelectedDesignation] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment
    const matchesDesignation = selectedDesignation === 'All' || employee.designation === selectedDesignation
    
    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setShowAddModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Employee Management</h1>
          <p className="text-secondary-600">Manage employee information, departments, and organizational structure</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="input"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="input"
          >
            {designations.map(designation => (
              <option key={designation} value={designation}>{designation}</option>
            ))}
          </select>
          
          <button className="btn btn-outline btn-md">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Employee</th>
                <th className="table-head">Contact</th>
                <th className="table-head">Department</th>
                <th className="table-head">Designation</th>
                <th className="table-head">Joining Date</th>
                <th className="table-head">Salary</th>
                <th className="table-head">Status</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{employee.name}</p>
                        <p className="text-sm text-secondary-500">ID: {employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-secondary-400" />
                        <span className="text-sm">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-secondary-400" />
                        <span className="text-sm">{employee.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {employee.department}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-secondary-900">{employee.designation}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm">{new Date(employee.joiningDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">${employee.salary.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditEmployee(employee)}
                        className="p-1 text-secondary-400 hover:text-primary-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 text-secondary-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-secondary-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="input" 
                        defaultValue={editingEmployee?.name || ''}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="input" 
                        defaultValue={editingEmployee?.email || ''}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        className="input" 
                        defaultValue={editingEmployee?.phone || ''}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Department</label>
                      <select className="input" defaultValue={editingEmployee?.department || ''}>
                        <option value="">Select Department</option>
                        {departments.slice(1).map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Designation</label>
                      <input 
                        type="text" 
                        className="input" 
                        defaultValue={editingEmployee?.designation || ''}
                        placeholder="Enter designation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Joining Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        defaultValue={editingEmployee?.joiningDate || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Salary</label>
                      <input 
                        type="number" 
                        className="input" 
                        defaultValue={editingEmployee?.salary || ''}
                        placeholder="Enter salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                      <select className="input" defaultValue={editingEmployee?.status || 'active'}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
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
                      {editingEmployee ? 'Update Employee' : 'Add Employee'}
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
