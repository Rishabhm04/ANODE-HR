import { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Award, 
  Download, 
  Eye, 
  Edit, 
  CheckCircle,
  AlertCircle,
  User,
  TrendingUp,
  Search,
  X,
  Save,
  CreditCard,
  Shield,
  Briefcase,
  FileText,
  Edit3
} from 'lucide-react'




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
  
  // Additional Properties
  employeeId: string
  verificationDate: string
}



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
    employeeStatus: 'active',
    employeeId: 'EMP001',
    verificationDate: '2020-03-20'
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
    employeeStatus: 'active',
    employeeId: 'EMP002',
    verificationDate: '2019-07-15'
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
    employeeStatus: 'active',
    employeeId: 'EMP003',
    verificationDate: '2021-11-10'
  }
]


export default function TrainingManagement() {
  const [employeeData, setEmployeeData] = useState<EmployeeEnrollmentForm[]>(mockEmployeeData)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [showEmployeeInfoModal, setShowEmployeeInfoModal] = useState(false)
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeEnrollmentForm | null>(null)
  const [activeTab, setActiveTab] = useState('verified')
  
  // Offer Letter Form State
  const [offerLetterForm, setOfferLetterForm] = useState({
    employeeName: '',
    dateOfJoining: '',
    duration: '',
    salary: '',
    position: 'Software Developer',
    letterDate: new Date().toISOString().split('T')[0],
    customBenefits: ''
  })

  // Benefits editing state
  const [isEditingBenefits, setIsEditingBenefits] = useState(false)
  const [editingBenefits, setEditingBenefits] = useState('')

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Position-specific content
  const positionContent = {
    'Data Analyst': {
      description: 'data analysis and business intelligence',
      benefits: [
        'Hands-on Projects: Work on real data analysis projects',
        'Mentorship: Guidance from experienced data scientists',
        'Workshops: Access to training on latest analytics tools',
        'Networking: Build connections in the data science community',
        'Career Growth: Opportunities for advancement in analytics'
      ]
    },
    'Digital Marketing Person': {
      description: 'digital marketing and brand promotion',
      benefits: [
        'Hands-on Projects: Work on live digital marketing campaigns',
        'Mentorship: Guidance from experienced marketing professionals',
        'Workshops: Access to training on latest marketing tools',
        'Networking: Build connections in the marketing industry',
        'Career Growth: Opportunities for advancement in marketing'
      ]
    },
    'Accountant': {
      description: 'financial management and accounting',
      benefits: [
        'Hands-on Projects: Work on real financial projects',
        'Mentorship: Guidance from experienced accountants',
        'Workshops: Access to training on latest accounting software',
        'Networking: Build connections in the finance industry',
        'Career Growth: Opportunities for advancement in finance'
      ]
    },
    'Software Developer': {
      description: 'software development and programming',
      benefits: [
        'Hands-on Projects: Work on live software development projects',
        'Mentorship: Guidance from experienced developers',
        'Workshops: Access to training on latest development tools',
        'Networking: Build connections in the tech industry',
        'Career Growth: Opportunities for advancement in development'
      ]
    },
    'Software Developer Intern': {
      description: 'software development and programming',
      benefits: [
        'Hands-on Projects: Work on live software development projects',
        'Mentorship: Guidance from experienced developers',
        'Workshops: Access to training on latest development tools',
        'Networking: Build connections in the tech industry',
        'Completion Certificate: Boost your resume with a certificate'
      ]
    },
    'Telecaller': {
      description: 'customer service and sales support',
      benefits: [
        'Hands-on Projects: Work on real customer interaction projects',
        'Mentorship: Guidance from experienced sales professionals',
        'Workshops: Access to training on communication skills',
        'Networking: Build connections in the sales industry',
        'Career Growth: Opportunities for advancement in sales'
      ]
    },
    'HR': {
      description: 'human resources and people management',
      benefits: [
        'Hands-on Projects: Work on real HR management projects',
        'Mentorship: Guidance from experienced HR professionals',
        'Workshops: Access to training on latest HR tools',
        'Networking: Build connections in the HR industry',
        'Career Growth: Opportunities for advancement in human resources'
      ]
    }
  }
  
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
    employeeStatus: 'active',
    employeeId: '',
    verificationDate: ''
  })


  const handleEnrollmentFormChange = (field: keyof EmployeeEnrollmentForm, value: any) => {
    setEnrollmentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEnrollmentSubmit = () => {
    // Generate employee ID and verification date
    const employeeId = `EMP${String(employeeData.length + 1).padStart(3, '0')}`
    const verificationDate = new Date().toISOString().split('T')[0]
    
    // Add new employee to the employee data
    setEmployeeData(prev => [...prev, { 
      ...enrollmentForm, 
      employeeId, 
      verificationDate 
    }])
    
    // Switch to the appropriate tab based on verification status
    if (enrollmentForm.verificationStatus === 'verified') {
      setActiveTab('verified')
    } else if (enrollmentForm.verificationStatus === 'not-verified') {
      setActiveTab('not-verified')
    } else if (enrollmentForm.verificationStatus === 'rejected') {
      setActiveTab('rejected')
    }
    
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
      employeeStatus: 'active',
      employeeId: '',
      verificationDate: ''
    })
  }

  const handleViewEmployeeInfo = (employeeName: string) => {
    const employee = employeeData.find(emp => emp.name === employeeName)
    if (employee) {
      setSelectedEmployee(employee)
      setShowEmployeeInfoModal(true)
    }
  }

  const handleEditEmployee = (employeeName: string) => {
    const employee = employeeData.find(emp => emp.name === employeeName)
    if (employee) {
      setEnrollmentForm(employee)
      setShowEnrollmentModal(true)
    }
  }

  const handleOfferLetterFormChange = (field: string, value: string) => {
    setOfferLetterForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditBenefits = () => {
    // Get current benefits as text
    const currentBenefits = offerLetterForm.customBenefits || 
      (positionContent[offerLetterForm.position as keyof typeof positionContent]?.benefits || [
        'Hands-on Projects: Work on live software development projects',
        'Mentorship: Guidance from experienced developers',
        'Workshops: Access to training on latest development tools',
        'Networking: Build industry connections',
        'Career Growth: Opportunities for advancement'
      ]).join('\n')
    
    setEditingBenefits(currentBenefits)
    setIsEditingBenefits(true)
  }

  const handleSaveBenefits = () => {
    setOfferLetterForm(prev => ({
      ...prev,
      customBenefits: editingBenefits
    }))
    setIsEditingBenefits(false)
  }

  const handleCancelEditBenefits = () => {
    setIsEditingBenefits(false)
    setEditingBenefits('')
  }

  // Get unique departments from employee data
  const getUniqueDepartments = () => {
    const departments = employeeData.map(emp => emp.department).filter((dept, index, arr) => arr.indexOf(dept) === index)
    return departments.sort()
  }

  // Filter employees based on search term and department
  const getFilteredEmployees = () => {
    let filtered = employeeData.filter(emp => {
      const matchesTab = 
        (activeTab === 'verified' && emp.verificationStatus === 'verified') ||
        (activeTab === 'not-verified' && emp.verificationStatus === 'not-verified') ||
        (activeTab === 'rejected' && emp.verificationStatus === 'rejected')
      
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment
      
      return matchesTab && matchesSearch && matchesDepartment
    })
    
    return filtered
  }

  // Export functionality
  const handleExport = () => {
    const filteredEmployees = getFilteredEmployees()
    
    // Create CSV content
    const headers = ['Employee ID', 'Name', 'Department', 'Designation', 'Verification Date', 'Payroll Amount', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredEmployees.map(emp => [
        emp.employeeId,
        `"${emp.name}"`,
        emp.department,
        emp.designation,
        emp.verificationDate,
        emp.payrollAmount,
        emp.verificationStatus
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${activeTab}-employees-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadPDF = () => {
    // Create a new window with the offer letter content
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      // Use custom benefits if provided, otherwise use position-specific benefits
      let benefits = []
      if (offerLetterForm.customBenefits) {
        benefits = offerLetterForm.customBenefits.split('\n')
          .filter(benefit => benefit.trim())
          .map(benefit => {
            const cleanBenefit = benefit.replace(/^[•\-\*]\s*/, '').trim()
            return cleanBenefit
          })
      } else {
        benefits = positionContent[offerLetterForm.position as keyof typeof positionContent]?.benefits || [
          'Hands-on Projects: Work on live software development projects',
          'Mentorship: Guidance from experienced developers',
          'Workshops: Access to training on latest development tools',
          'Networking: Build industry connections',
          'Career Growth: Opportunities for advancement'
        ]
      }

      const benefitsHTML = benefits.map(benefit => {
        const [title, description] = benefit.includes(':') ? benefit.split(':') : [benefit, '']
        return `<li><strong>${title}:</strong> ${description}</li>`
      }).join('')

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Offer Letter - ${offerLetterForm.employeeName || 'Employee'}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
              color: #333;
            }
            .header { 
              display: flex; 
              justify-content: space-between; 
              align-items: start; 
              margin-bottom: 30px; 
            }
            .company-name { 
              font-size: 24px; 
              font-weight: bold; 
              color: #2563eb; 
              margin-bottom: 5px; 
            }
            .tagline { 
              font-size: 12px; 
              color: #666; 
            }
            .date-section { 
              text-align: right; 
            }
            .logo { 
              width: 60px; 
              height: 60px; 
              background: #dbeafe; 
              border-radius: 50%; 
              margin-bottom: 10px; 
              display: inline-block;
            }
            .date { 
              font-size: 12px; 
              font-weight: 500; 
            }
            .salutation { 
              font-size: 16px; 
              font-weight: 600; 
              margin-bottom: 20px; 
            }
            .content { 
              font-size: 12px; 
              line-height: 1.6; 
              margin-bottom: 20px; 
            }
            .content p { 
              margin-bottom: 15px; 
            }
            .info-box { 
              background: #f0f9ff; 
              padding: 15px; 
              border-radius: 8px; 
              margin: 20px 0; 
            }
            .benefits-box { 
              background: #f0fdf4; 
              padding: 15px; 
              border-radius: 8px; 
              margin: 20px 0; 
            }
            .info-title { 
              font-weight: 600; 
              color: #1e40af; 
              margin-bottom: 10px; 
            }
            .benefits-title { 
              font-weight: 600; 
              color: #166534; 
              margin-bottom: 10px; 
            }
            .info-list, .benefits-list { 
              margin: 0; 
              padding-left: 0; 
              list-style: none;
            }
            .info-list li, .benefits-list li { 
              margin-bottom: 5px; 
              font-size: 12px; 
            }
            .signature { 
              margin-top: 30px; 
            }
            .signature-text { 
              margin-bottom: 15px; 
            }
            .signature-section { 
              display: flex; 
              align-items: center; 
              gap: 15px; 
            }
            .signature-stamp { 
              width: 80px; 
              height: 80px; 
              background: #dbeafe; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 10px; 
              font-weight: 600; 
              color: #2563eb; 
              text-align: center; 
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 15px; 
              border-top: 1px solid #e5e7eb; 
              font-size: 10px; 
              color: #6b7280; 
            }
            .footer-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 20px; 
            }
            @media print { 
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="company-name">ANOCAB</div>
              <div class="tagline">A Positive Connection....</div>
            </div>
            <div class="date-section">
              <div class="logo"></div>
              <div class="date">DATE: ${new Date(offerLetterForm.letterDate).toLocaleDateString('en-GB')}</div>
            </div>
          </div>

          <div class="salutation">Dear <strong>${offerLetterForm.employeeName || 'EMPLOYEE NAME'}</strong></div>

          <div class="content">
            <p>We are pleased to extend an offer for the <strong>${offerLetterForm.position}</strong> position at <strong>Anode Electric PVT LTD.</strong> We were impressed by your skills and enthusiasm for ${positionContent[offerLetterForm.position as keyof typeof positionContent]?.description || 'your field of expertise'} and are excited about the possibility of you joining our team.</p>
            
            <p>The duration of the employment will be of <strong>${offerLetterForm.duration || 'Permanent'}</strong>, starting from <strong>${offerLetterForm.dateOfJoining ? new Date(offerLetterForm.dateOfJoining).toLocaleDateString('en-GB') : '1st January 2025'}</strong>.</p>
            
            <p>This is an educational opportunity focused on learning and developing new skills and gaining hands-on knowledge. We expect you to perform all your tasks/projects assigned to you to the best of your ability and follow any lawful and reasonable instructions.</p>

            <div class="info-box">
              <div class="info-title">Key Information:</div>
              <ul class="info-list">
                <li><strong>Position:</strong> ${offerLetterForm.position}</li>
                <li><strong>Date of joining:</strong> ${offerLetterForm.dateOfJoining ? new Date(offerLetterForm.dateOfJoining).toLocaleDateString('en-GB') : '1st Jan. 2025'}</li>
                <li><strong>Duration:</strong> ${offerLetterForm.duration || 'Permanent'}</li>
                <li><strong>Salary:</strong> ${offerLetterForm.salary || '₹50,000 per month'}</li>
              </ul>
            </div>

            <div class="benefits-box">
              <div class="benefits-title">Benefits:</div>
              <ul class="benefits-list">
                ${benefitsHTML}
              </ul>
            </div>

            <p>We are excited to have you join our team and look forward to your contributions to Anode Electric PVT LTD.</p>
          </div>

          <div class="signature">
            <div class="signature-text">Sincerely,</div>
            <div class="signature-section">
              <div class="signature-stamp">ANODE ELECTRIC PVT. LTD.</div>
              <div>
                <div style="font-weight: 600;">Anode Electric PVT LTD</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="footer-grid">
              <div>
                <p><strong>Address:</strong> Plot no 10-15, IT Park, Bargi hills, Jabalpur-482003 M.P.</p>
                <p><strong>Website:</strong> www.anocab.com</p>
              </div>
              <div>
                <p><strong>CIN:</strong> U31103MP2015PTC034653</p>
                <p><strong>Tel:</strong> +91 18002700075</p>
                <p><strong>E-mail:</strong> info@anocab.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
      
      printWindow.document.close()
      
      // Wait for content to load then trigger print
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
      }, 1000)
    } else {
      alert('Please allow popups for this site to download the PDF')
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
            className="btn btn-primary btn-md"
          >
            <Users className="mr-2 h-4 w-4" />
            Enroll Employee
          </button>
          <button 
            onClick={() => setShowOfferLetterModal(true)}
            className="btn btn-outline btn-md"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Offer Letter
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
                onClick={() => {
                  setActiveTab(tab.id)
                  // Reset filters when switching tabs
                  setSearchTerm('')
                  setSelectedDepartment('all')
                }}
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input"
                  >
                    <option value="all">All Departments</option>
                    {getUniqueDepartments().map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleExport}
                    className="btn btn-outline btn-sm"
                  >
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
                    {getFilteredEmployees().map((employee, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{employee.name}</p>
                              <p className="text-sm text-secondary-500">ID: EMP{String(index + 1).padStart(3, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">{employee.department}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{employee.designation}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(employee.dateOfAppointment).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹{employee.payrollAmount.toLocaleString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(employee.name)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(employee.name)}
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input"
                  >
                    <option value="all">All Departments</option>
                    {getUniqueDepartments().map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleExport}
                    className="btn btn-outline btn-sm"
                  >
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
                    {getFilteredEmployees().map((employee, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{employee.name}</p>
                              <p className="text-sm text-secondary-500">ID: EMP{String(index + 1).padStart(3, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">{employee.department}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{employee.designation}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(employee.dateOfAppointment).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹{employee.payrollAmount.toLocaleString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Not Verified
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(employee.name)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(employee.name)}
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input"
                  >
                    <option value="all">All Departments</option>
                    {getUniqueDepartments().map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleExport}
                    className="btn btn-outline btn-sm"
                  >
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
                    {getFilteredEmployees().map((employee, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{employee.name}</p>
                              <p className="text-sm text-secondary-500">ID: EMP{String(index + 1).padStart(3, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">{employee.department}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{employee.designation}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm">{new Date(employee.dateOfAppointment).toLocaleDateString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium">₹{employee.payrollAmount.toLocaleString()}</span>
                        </td>
                        <td className="table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Rejected
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewEmployeeInfo(employee.name)}
                              className="p-1 text-secondary-400 hover:text-primary-600"
                              title="View Employee Info"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditEmployee(employee.name)}
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

      {/* Offer Letter Generation Modal */}
      {showOfferLetterModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowOfferLetterModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Generate Offer Letter</h3>
                  <button 
                    onClick={() => setShowOfferLetterModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Offer Letter Form */}
                  <div className="bg-secondary-50 rounded-lg p-6">
                    <h4 className="font-medium text-secondary-900 mb-4">Offer Letter Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Employee Name *</label>
                        <input
                          type="text"
                          value={offerLetterForm.employeeName}
                          onChange={(e) => handleOfferLetterFormChange('employeeName', e.target.value)}
                          className="input w-full"
                          placeholder="Enter employee name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Date of Joining *</label>
                        <input
                          type="date"
                          value={offerLetterForm.dateOfJoining}
                          onChange={(e) => handleOfferLetterFormChange('dateOfJoining', e.target.value)}
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Duration *</label>
                        <input
                          type="text"
                          value={offerLetterForm.duration}
                          onChange={(e) => handleOfferLetterFormChange('duration', e.target.value)}
                          className="input w-full"
                          placeholder="e.g., 6 Months, Permanent, 1 Year"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Salary *</label>
                        <input
                          type="text"
                          value={offerLetterForm.salary}
                          onChange={(e) => handleOfferLetterFormChange('salary', e.target.value)}
                          className="input w-full"
                          placeholder="e.g., ₹50,000 per month"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Letter Date *</label>
                        <input
                          type="date"
                          value={offerLetterForm.letterDate}
                          onChange={(e) => handleOfferLetterFormChange('letterDate', e.target.value)}
                          className="input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Position *</label>
                        <select
                          value={offerLetterForm.position}
                          onChange={(e) => handleOfferLetterFormChange('position', e.target.value)}
                          className="input w-full"
                        >
                          <option value="Software Developer">Software Developer</option>
                          <option value="Data Analyst">Data Analyst</option>
                          <option value="Digital Marketing Person">Digital Marketing Person</option>
                          <option value="Accountant">Accountant</option>
                          <option value="Software Developer Intern">Software Developer Intern</option>
                          <option value="Telecaller">Telecaller</option>
                          <option value="HR">HR</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Offer Letter Preview */}
                  <div className="bg-white border border-secondary-200 rounded-lg p-8">
                    <div className="max-w-4xl mx-auto">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h1 className="text-3xl font-bold text-blue-600 mb-2">ANOCAB</h1>
                          <p className="text-sm text-secondary-600">A Positive Connection....</p>
                        </div>
                        <div className="text-right">
                          <div className="w-16 h-16 bg-blue-100 rounded-full mb-2"></div>
                          <p className="text-sm font-medium">DATE: {new Date(offerLetterForm.letterDate).toLocaleDateString('en-GB')}</p>
                        </div>
                      </div>

                      {/* Salutation */}
                      <div className="mb-6">
                        <p className="text-lg font-semibold">Dear <span className="text-blue-600">{offerLetterForm.employeeName || 'EMPLOYEE NAME'}</span></p>
                      </div>

                      {/* Main Content */}
                      <div className="space-y-4 text-sm leading-relaxed">
                        <p>
                          We are pleased to extend an offer for the <strong>{offerLetterForm.position}</strong> position at <strong>Anode Electric PVT LTD.</strong> 
                          We were impressed by your skills and enthusiasm for {positionContent[offerLetterForm.position as keyof typeof positionContent]?.description || 'your field of expertise'} and are excited about the possibility of you joining our team.
                        </p>
                        
                        <p>
                          The duration of the employment will be of <strong>{offerLetterForm.duration || 'Permanent'}</strong>, starting from <strong>{offerLetterForm.dateOfJoining ? new Date(offerLetterForm.dateOfJoining).toLocaleDateString('en-GB') : '1st January 2025'}</strong>.
                        </p>
                        
                        <p>
                          This is an educational opportunity focused on learning and developing new skills and gaining hands-on knowledge. 
                          We expect you to perform all your tasks/projects assigned to you to the best of your ability and follow any lawful and reasonable instructions.
                        </p>

                        {/* Key Information */}
                        <div className="bg-blue-50 p-4 rounded-lg my-6">
                          <h4 className="font-semibold mb-3 text-blue-800">Key Information:</h4>
                          <ul className="space-y-1 text-sm">
                            <li><strong>Position:</strong> {offerLetterForm.position}</li>
                            <li><strong>Date of joining:</strong> {offerLetterForm.dateOfJoining ? new Date(offerLetterForm.dateOfJoining).toLocaleDateString('en-GB') : '1st Jan. 2025'}</li>
                            <li><strong>Duration:</strong> {offerLetterForm.duration || 'Permanent'}</li>
                            <li><strong>Salary:</strong> {offerLetterForm.salary || '₹50,000 per month'}</li>
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div className="bg-green-50 p-4 rounded-lg my-6 relative">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-green-800">Benefits:</h4>
                            <button
                              onClick={handleEditBenefits}
                              className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </button>
                          </div>
                          
                          {isEditingBenefits ? (
                            <div className="space-y-3">
                              <textarea
                                value={editingBenefits}
                                onChange={(e) => setEditingBenefits(e.target.value)}
                                className="w-full p-3 border border-green-300 rounded-lg text-sm"
                                rows={6}
                                placeholder="Enter benefits (one per line):&#10;• Hands-on Projects: Work on real projects&#10;• Mentorship: Guidance from experts&#10;• Workshops: Training sessions"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={handleSaveBenefits}
                                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                >
                                  <Save className="h-3 w-3" />
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEditBenefits}
                                  className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                                >
                                  <X className="h-3 w-3" />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <ul className="space-y-1 text-sm">
                              {offerLetterForm.customBenefits ? (
                                offerLetterForm.customBenefits.split('\n').filter(benefit => benefit.trim()).map((benefit, index) => {
                                  const cleanBenefit = benefit.replace(/^[•\-\*]\s*/, '').trim()
                                  const [title, description] = cleanBenefit.includes(':') ? cleanBenefit.split(':') : [cleanBenefit, '']
                                  return (
                                    <li key={index}>
                                      <strong>{title}:</strong> {description}
                                    </li>
                                  )
                                })
                              ) : (
                                positionContent[offerLetterForm.position as keyof typeof positionContent]?.benefits.map((benefit, index) => (
                                  <li key={index}><strong>{benefit.split(':')[0]}:</strong> {benefit.split(':')[1]}</li>
                                )) || [
                                  <li key="1"><strong>Hands-on Projects:</strong> Work on live software development projects</li>,
                                  <li key="2"><strong>Mentorship:</strong> Guidance from experienced developers</li>,
                                  <li key="3"><strong>Workshops:</strong> Access to training on latest development tools</li>,
                                  <li key="4"><strong>Networking:</strong> Build industry connections</li>,
                                  <li key="5"><strong>Career Growth:</strong> Opportunities for advancement</li>
                                ]
                              )}
                            </ul>
                          )}
                        </div>

                        <p>
                          We are excited to have you join our team and look forward to your contributions to Anode Electric PVT LTD.
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="mt-8">
                        <p className="mb-4">Sincerely,</p>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600">ANODE ELECTRIC PVT. LTD.</span>
                          </div>
                          <div>
                            <p className="font-semibold">Anode Electric PVT LTD</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-8 pt-4 border-t border-secondary-200 text-xs text-secondary-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p><strong>Address:</strong> Plot no 10-15, IT Park, Bargi hills, Jabalpur-482003 M.P.</p>
                            <p><strong>Website:</strong> www.anocab.com</p>
                          </div>
                          <div>
                            <p><strong>CIN:</strong> U31103MP2015PTC034653</p>
                            <p><strong>Tel:</strong> +91 18002700075</p>
                            <p><strong>E-mail:</strong> info@anocab.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-secondary-200">
                  <button 
                    onClick={() => setShowOfferLetterModal(false)}
                    className="btn btn-outline btn-md"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="btn btn-primary btn-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
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
