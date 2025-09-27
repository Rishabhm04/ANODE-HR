import { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Award, 
  Download, 
  Eye, 
  Edit, 
  Plus,
  CheckCircle,
  AlertCircle,
  User,
  TrendingUp,
  Search,
  X,
  Save,
  CreditCard,
  Shield,
  Briefcase
} from 'lucide-react'


interface TrainingEnrollment {
  id: string
  employeeId: string
  employeeName: string
  programId: string
  programTitle: string
  enrollmentDate: string
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped'
  completionDate?: string
  score?: number
  certificate?: string
}


interface EmployeeEnrollmentForm {
  // Personal Information
  name: string
  dateOfBirth: string
  age: number
  mobileNumber: string
  address: string
  
  // Employment Information
  unit: string
  dateOfAppointment: string
  department: string
  designation: string
  
  // Verification & Documentation
  aadharNumber: string
  verificationStatus: 'verified' | 'not-verified' | 'rejected'
  payrollAmount: number
  policyConfirm: boolean
  faceToFaceVerify: boolean
  documentation: boolean
  offerLetter: boolean
  activeStatus: boolean
  
  // Bank Details
  bankAccountNumber: string
  bankName: string
  ifscCode: string
  accountHolderName: string
  
  // Employee Status
  employeeStatus: 'active' | 'inactive' | 'terminated' | 'on-leave'
}


const mockEnrollments: TrainingEnrollment[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    programId: '1',
    programTitle: 'Leadership Development Program',
    enrollmentDate: '2024-01-10',
    status: 'in-progress',
    score: 85
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    programId: '2',
    programTitle: 'Digital Marketing Fundamentals',
    enrollmentDate: '2024-01-25',
    status: 'completed',
    completionDate: '2024-02-28',
    score: 92,
    certificate: 'cert_001.pdf'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Chen',
    programId: '1',
    programTitle: 'Leadership Development Program',
    enrollmentDate: '2024-01-12',
    status: 'enrolled'
  }
]

const mockEmployeeData: EmployeeEnrollmentForm[] = [
  {
    name: 'John Smith',
    dateOfBirth: '1990-05-15',
    age: 34,
    mobileNumber: '+91 9876543210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    unit: 'Unit A',
    dateOfAppointment: '2020-03-15',
    department: 'HR',
    designation: 'Manager',
    aadharNumber: '1234 5678 9012',
    verificationStatus: 'verified',
    payrollAmount: 55000,
    policyConfirm: true,
    faceToFaceVerify: true,
    documentation: true,
    offerLetter: true,
    activeStatus: true,
    bankAccountNumber: '1234567890123456',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    accountHolderName: 'John Smith',
    employeeStatus: 'active'
  },
  {
    name: 'Sarah Johnson',
    dateOfBirth: '1988-12-20',
    age: 35,
    mobileNumber: '+91 9876543211',
    address: '456 Park Avenue, Delhi, Delhi 110001',
    unit: 'Unit B',
    dateOfAppointment: '2019-07-10',
    department: 'IT',
    designation: 'Developer',
    aadharNumber: '2345 6789 0123',
    verificationStatus: 'verified',
    payrollAmount: 42000,
    policyConfirm: true,
    faceToFaceVerify: true,
    documentation: true,
    offerLetter: true,
    activeStatus: true,
    bankAccountNumber: '2345678901234567',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    accountHolderName: 'Sarah Johnson',
    employeeStatus: 'active'
  },
  {
    name: 'Mike Chen',
    dateOfBirth: '1992-08-10',
    age: 31,
    mobileNumber: '+91 9876543212',
    address: '789 Tech Park, Bangalore, Karnataka 560001',
    unit: 'Unit C',
    dateOfAppointment: '2021-01-20',
    department: 'Finance',
    designation: 'Analyst',
    aadharNumber: '3456 7890 1234',
    verificationStatus: 'not-verified',
    payrollAmount: 38000,
    policyConfirm: false,
    faceToFaceVerify: false,
    documentation: false,
    offerLetter: false,
    activeStatus: false,
    bankAccountNumber: '3456789012345678',
    bankName: 'ICICI Bank',
    ifscCode: 'ICIC0001234',
    accountHolderName: 'Mike Chen',
    employeeStatus: 'active'
  }
]


export default function TrainingManagement() {
  const [enrollments] = useState<TrainingEnrollment[]>(mockEnrollments)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [showEmployeeInfoModal, setShowEmployeeInfoModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeEnrollmentForm | null>(null)
  const [activeTab, setActiveTab] = useState('verified')
  
  // Employee Enrollment Form State
  const [enrollmentForm, setEnrollmentForm] = useState<EmployeeEnrollmentForm>({
    name: '',
    dateOfBirth: '',
    age: 0,
    mobileNumber: '',
    address: '',
    unit: '',
    dateOfAppointment: '',
    department: '',
    designation: '',
    aadharNumber: '',
    verificationStatus: 'not-verified',
    payrollAmount: 0,
    policyConfirm: false,
    faceToFaceVerify: false,
    documentation: false,
    offerLetter: false,
    activeStatus: false,
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: '',
    employeeStatus: 'active'
  })


  const handleEnrollmentFormChange = (field: keyof EmployeeEnrollmentForm, value: any) => {
    setEnrollmentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEnrollmentSubmit = () => {
    // Here you would typically save the enrollment data
    console.log('Enrollment Form Data:', enrollmentForm)
    setShowEnrollmentModal(false)
    // Reset form
    setEnrollmentForm({
      name: '',
      dateOfBirth: '',
      age: 0,
      mobileNumber: '',
      address: '',
      unit: '',
      dateOfAppointment: '',
      department: '',
      designation: '',
      aadharNumber: '',
      verificationStatus: 'not-verified',
      payrollAmount: 0,
      policyConfirm: false,
      faceToFaceVerify: false,
      documentation: false,
      offerLetter: false,
      activeStatus: false,
      bankAccountNumber: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: '',
      employeeStatus: 'active'
    })
  }

  const handleViewEmployeeInfo = (employeeName: string) => {
    const employee = mockEmployeeData.find(emp => emp.name === employeeName)
    if (employee) {
      setSelectedEmployee(employee)
      setShowEmployeeInfoModal(true)
    }
  }

  const handleEditEmployee = (employeeName: string) => {
    const employee = mockEmployeeData.find(emp => emp.name === employeeName)
    if (employee) {
      setEnrollmentForm(employee)
      setShowEnrollmentModal(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Training Management</h1>
          <p className="text-secondary-600">Manage training programs, enrollments, and track progress</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowEnrollmentModal(true)}
            className="btn btn-outline btn-md"
          >
            <Users className="mr-2 h-4 w-4" />
            Enroll Employee
          </button>
          <button 
            onClick={() => setShowEnrollmentModal(true)}
            className="btn btn-primary btn-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Active Programs</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Enrolled Employees</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-600">87%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Certificates Issued</p>
              <p className="text-2xl font-bold text-orange-600">89</p>
            </div>
            <Award className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-secondary-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'verified', name: 'Verified', icon: CheckCircle, color: 'text-green-600' },
              { id: 'not-verified', name: 'Not Verified', icon: AlertCircle, color: 'text-yellow-600' },
              { id: 'rejected', name: 'Rejected', icon: X, color: 'text-red-600' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <tab.icon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? tab.color : ''}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Verified Tab */}
          {activeTab === 'verified' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                    <input
                      type="text"
                      placeholder="Search verified employees..."
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select className="input">
                    <option>All Departments</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Employee</th>
                      <th className="table-head">Department</th>
                      <th className="table-head">Designation</th>
                      <th className="table-head">Verification Date</th>
                      <th className="table-head">Payroll Amount</th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {enrollments.filter(emp => emp.status === 'completed').map((enrollment) => (
                      <tr key={enrollment.id} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{enrollment.employeeName}</p>
                              <p className="text-sm text-secondary-500">ID: {enrollment.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">HR</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">Manager</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹55,000</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="Edit Employee"
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
          )}

          {/* Not Verified Tab */}
          {activeTab === 'not-verified' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                    <input
                      type="text"
                      placeholder="Search not verified employees..."
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select className="input">
                    <option>All Departments</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Employee</th>
                      <th className="table-head">Department</th>
                      <th className="table-head">Designation</th>
                      <th className="table-head">Enrollment Date</th>
                      <th className="table-head">Payroll Amount</th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {enrollments.filter(emp => emp.status === 'enrolled').map((enrollment) => (
                      <tr key={enrollment.id} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{enrollment.employeeName}</p>
                              <p className="text-sm text-secondary-500">ID: {enrollment.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">IT</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">Developer</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹42,000</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Not Verified
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="Edit Employee"
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
          )}

          {/* Rejected Tab */}
          {activeTab === 'rejected' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                    <input
                      type="text"
                      placeholder="Search rejected employees..."
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select className="input">
                    <option>All Departments</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="table-header">
                    <tr className="table-row">
                      <th className="table-head">Employee</th>
                      <th className="table-head">Department</th>
                      <th className="table-head">Designation</th>
                      <th className="table-head">Rejection Date</th>
                      <th className="table-head">Payroll Amount</th>
                      <th className="table-head">Status</th>
                      <th className="table-head">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {enrollments.filter(emp => emp.status === 'dropped').map((enrollment) => (
                      <tr key={enrollment.id} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{enrollment.employeeName}</p>
                              <p className="text-sm text-secondary-500">ID: {enrollment.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">Finance</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">Analyst</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹38,000</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Rejected
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(enrollment.employeeName)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="Edit Employee"
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
          )}
        </div>
      </div>

      {/* Employee Enrollment Modal */}
      {showEnrollmentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowEnrollmentModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Employee Enrollment Form</h3>
                  <button 
                    onClick={() => setShowEnrollmentModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="bg-secondary-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Name *</label>
                        <input
                          type="text"
                          value={enrollmentForm.name}
                          onChange={(e) => handleEnrollmentFormChange('name', e.target.value)}
                          className="input w-full"
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          value={enrollmentForm.dateOfBirth}
                          onChange={(e) => handleEnrollmentFormChange('dateOfBirth', e.target.value)}
                          className="input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Age</label>
                        <input
                          type="number"
                          value={enrollmentForm.age}
                          onChange={(e) => handleEnrollmentFormChange('age', parseInt(e.target.value) || 0)}
                          className="input w-full"
                          placeholder="Enter age"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Mobile Number *</label>
                        <input
                          type="tel"
                          value={enrollmentForm.mobileNumber}
                          onChange={(e) => handleEnrollmentFormChange('mobileNumber', e.target.value)}
                          className="input w-full"
                          placeholder="Enter mobile number"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Address *</label>
                        <textarea
                          value={enrollmentForm.address}
                          onChange={(e) => handleEnrollmentFormChange('address', e.target.value)}
                          className="input w-full"
                          rows={3}
                          placeholder="Enter complete address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Information Section */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Employment Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Unit *</label>
                        <input
                          type="text"
                          value={enrollmentForm.unit}
                          onChange={(e) => handleEnrollmentFormChange('unit', e.target.value)}
                          className="input w-full"
                          placeholder="Enter unit"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Date of Appointment *</label>
                        <input
                          type="date"
                          value={enrollmentForm.dateOfAppointment}
                          onChange={(e) => handleEnrollmentFormChange('dateOfAppointment', e.target.value)}
                          className="input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Department *</label>
                        <select
                          value={enrollmentForm.department}
                          onChange={(e) => handleEnrollmentFormChange('department', e.target.value)}
                          className="input w-full"
                          required
                        >
                          <option value="">Select Department</option>
                          <option value="HR">Human Resources</option>
                          <option value="IT">Information Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Operations">Operations</option>
                          <option value="Sales">Sales</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Designation *</label>
                        <input
                          type="text"
                          value={enrollmentForm.designation}
                          onChange={(e) => handleEnrollmentFormChange('designation', e.target.value)}
                          className="input w-full"
                          placeholder="Enter designation"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Verification & Documentation Section */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Verification & Documentation
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Aadhar Number *</label>
                        <input
                          type="text"
                          value={enrollmentForm.aadharNumber}
                          onChange={(e) => handleEnrollmentFormChange('aadharNumber', e.target.value)}
                          className="input w-full"
                          placeholder="Enter Aadhar number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Verification Status *</label>
                        <select
                          value={enrollmentForm.verificationStatus}
                          onChange={(e) => handleEnrollmentFormChange('verificationStatus', e.target.value)}
                          className="input w-full"
                          required
                        >
                          <option value="not-verified">Not Verified</option>
                          <option value="verified">Verified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Payroll Amount *</label>
                        <input
                          type="number"
                          value={enrollmentForm.payrollAmount}
                          onChange={(e) => handleEnrollmentFormChange('payrollAmount', parseFloat(e.target.value) || 0)}
                          className="input w-full"
                          placeholder="Enter payroll amount"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Employee Status *</label>
                        <select
                          value={enrollmentForm.employeeStatus}
                          onChange={(e) => handleEnrollmentFormChange('employeeStatus', e.target.value)}
                          className="input w-full"
                          required
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="terminated">Terminated</option>
                          <option value="on-leave">On Leave</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Checkboxes for verification steps */}
                    <div className="mt-6">
                      <h5 className="font-medium text-secondary-700 mb-4">Verification Checklist</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={enrollmentForm.policyConfirm}
                            onChange={(e) => handleEnrollmentFormChange('policyConfirm', e.target.checked)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">Policy Confirm</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={enrollmentForm.faceToFaceVerify}
                            onChange={(e) => handleEnrollmentFormChange('faceToFaceVerify', e.target.checked)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">Face to Face Verify</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={enrollmentForm.documentation}
                            onChange={(e) => handleEnrollmentFormChange('documentation', e.target.checked)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">Documentation</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={enrollmentForm.offerLetter}
                            onChange={(e) => handleEnrollmentFormChange('offerLetter', e.target.checked)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">Offer Letter</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={enrollmentForm.activeStatus}
                            onChange={(e) => handleEnrollmentFormChange('activeStatus', e.target.checked)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">Active Status</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Bank Account Details Section */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Bank Account Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Bank Account Number *</label>
                        <input
                          type="text"
                          value={enrollmentForm.bankAccountNumber}
                          onChange={(e) => handleEnrollmentFormChange('bankAccountNumber', e.target.value)}
                          className="input w-full"
                          placeholder="Enter account number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Bank Name *</label>
                        <input
                          type="text"
                          value={enrollmentForm.bankName}
                          onChange={(e) => handleEnrollmentFormChange('bankName', e.target.value)}
                          className="input w-full"
                          placeholder="Enter bank name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">IFSC Code *</label>
                        <input
                          type="text"
                          value={enrollmentForm.ifscCode}
                          onChange={(e) => handleEnrollmentFormChange('ifscCode', e.target.value)}
                          className="input w-full"
                          placeholder="Enter IFSC code"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Account Holder Name *</label>
                        <input
                          type="text"
                          value={enrollmentForm.accountHolderName}
                          onChange={(e) => handleEnrollmentFormChange('accountHolderName', e.target.value)}
                          className="input w-full"
                          placeholder="Enter account holder name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-end space-x-3 pt-6 border-t border-secondary-200">
                  <button 
                    onClick={() => setShowEnrollmentModal(false)}
                    className="btn btn-outline btn-md"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleEnrollmentSubmit}
                    className="btn btn-primary btn-md"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Enroll Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Info Modal */}
      {showEmployeeInfoModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowEmployeeInfoModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Employee Information</h3>
                  <button 
                    onClick={() => setShowEmployeeInfoModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="bg-secondary-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Name</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Date of Birth</p>
                        <p className="text-lg font-semibold text-secondary-900">{new Date(selectedEmployee.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Age</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Mobile Number</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.mobileNumber}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-secondary-600">Address</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Employment Information Section */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Employment Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Unit</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Date of Appointment</p>
                        <p className="text-lg font-semibold text-secondary-900">{new Date(selectedEmployee.dateOfAppointment).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Department</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Designation</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.designation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Verification & Documentation Section */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Verification & Documentation
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Aadhar Number</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.aadharNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Verification Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedEmployee.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                          selectedEmployee.verificationStatus === 'not-verified' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedEmployee.verificationStatus === 'verified' ? 'Verified' :
                           selectedEmployee.verificationStatus === 'not-verified' ? 'Not Verified' : 'Rejected'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Payroll Amount</p>
                        <p className="text-lg font-semibold text-secondary-900">₹{selectedEmployee.payrollAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Employee Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedEmployee.employeeStatus === 'active' ? 'bg-green-100 text-green-800' :
                          selectedEmployee.employeeStatus === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          selectedEmployee.employeeStatus === 'terminated' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedEmployee.employeeStatus.charAt(0).toUpperCase() + selectedEmployee.employeeStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Verification Checklist */}
                    <div className="mt-6">
                      <h5 className="font-medium text-secondary-700 mb-4">Verification Checklist</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            selectedEmployee.policyConfirm ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {selectedEmployee.policyConfirm && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-secondary-700">Policy Confirm</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            selectedEmployee.faceToFaceVerify ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {selectedEmployee.faceToFaceVerify && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-secondary-700">Face to Face Verify</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            selectedEmployee.documentation ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {selectedEmployee.documentation && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-secondary-700">Documentation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            selectedEmployee.offerLetter ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {selectedEmployee.offerLetter && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-secondary-700">Offer Letter</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                            selectedEmployee.activeStatus ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {selectedEmployee.activeStatus && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-secondary-700">Active Status</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Account Details Section */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Bank Account Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Bank Account Number</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.bankAccountNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Bank Name</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.bankName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">IFSC Code</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Account Holder Name</p>
                        <p className="text-lg font-semibold text-secondary-900">{selectedEmployee.accountHolderName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-secondary-200">
                  <button 
                    onClick={() => setShowEmployeeInfoModal(false)}
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
