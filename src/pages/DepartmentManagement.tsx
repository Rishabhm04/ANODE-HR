import React, { useState } from 'react'
import { Building2, Plus, Edit, Trash2, Users, Search } from 'lucide-react'

interface Department {
  id: string
  name: string
  description: string
  head: string
  employeeCount: number
  budget: string
  status: 'active' | 'inactive'
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Human Resources',
      description: 'Manages employee relations, recruitment, and HR policies',
      head: 'Sarah Johnson',
      employeeCount: 12,
      budget: '$500,000',
      status: 'active'
    },
    {
      id: '2',
      name: 'Information Technology',
      description: 'Handles all IT infrastructure, software development, and technical support',
      head: 'Mike Chen',
      employeeCount: 25,
      budget: '$1,200,000',
      status: 'active'
    },
    {
      id: '3',
      name: 'Finance',
      description: 'Manages financial planning, accounting, and budget oversight',
      head: 'Emily Davis',
      employeeCount: 8,
      budget: '$300,000',
      status: 'active'
    },
    {
      id: '4',
      name: 'Marketing',
      description: 'Brand management, digital marketing, and customer acquisition',
      head: 'Alex Rodriguez',
      employeeCount: 15,
      budget: '$800,000',
      status: 'active'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    head: '',
    budget: ''
  })

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    const department: Department = {
      id: (departments.length + 1).toString(),
      name: newDepartment.name,
      description: newDepartment.description,
      head: newDepartment.head,
      employeeCount: 0,
      budget: newDepartment.budget,
      status: 'active'
    }
    setDepartments([...departments, department])
    setNewDepartment({ name: '', description: '', head: '', budget: '' })
    setShowAddForm(false)
  }

  const handleDeleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setDepartments(departments.map(dept =>
      dept.id === id
        ? { ...dept, status: dept.status === 'active' ? 'inactive' : 'active' }
        : dept
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Building2 className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Department Management</h1>
            <p className="text-secondary-500">Manage departments, budgets, and department heads</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search departments or department heads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Add Department Form */}
      {showAddForm && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Add New Department</h3>
          <form onSubmit={handleAddDepartment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Department Head *
                </label>
                <input
                  type="text"
                  value={newDepartment.head}
                  onChange={(e) => setNewDepartment({...newDepartment, head: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Budget
                </label>
                <input
                  type="text"
                  value={newDepartment.budget}
                  onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                  placeholder="$0"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Description
              </label>
              <textarea
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-secondary-300 rounded-md text-secondary-700 bg-white hover:bg-secondary-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Department
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Departments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">{department.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    department.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {department.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleToggleStatus(department.id)}
                  className="p-1 text-secondary-400 hover:text-secondary-600"
                  title={department.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(department.id)}
                  className="p-1 text-red-400 hover:text-red-600"
                  title="Delete Department"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-secondary-600 mb-4">{department.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500">Department Head:</span>
                <span className="font-medium text-secondary-900">{department.head}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500">Employees:</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-secondary-400" />
                  <span className="font-medium text-secondary-900">{department.employeeCount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500">Budget:</span>
                <span className="font-medium text-secondary-900">{department.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-secondary-400" />
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No departments found</h3>
          <p className="mt-1 text-sm text-secondary-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding a new department.'}
          </p>
        </div>
      )}
    </div>
  )
}
