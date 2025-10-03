import { useMemo, useState } from 'react'
import {
  Search,
  Download,
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  FileText
} from 'lucide-react'

type EmployeeStatus = 'active' | 'inactive'

interface ActiveEmployee {
  id: string
  fullName: string
  employeeCode: string
  dateOfHire: string
  completedMonths: number
  company: string
  unit: string
  mobileNo: string
  dateOfBirth: string
  department: string
  jobTitle: string
  helmet: 'ON' | 'OFF'
  shoes: number
  onRollStatus: 'ON ROLL' | 'OF ROLL'
  payrollInformation: number
  emergencyContact: string
  emergencyContactName: string
  emergencyContactRelation: string
  highestQualification: string
  pfEsicNo?: string
  panNo?: string
  aadharNo?: string
  bankAccountName?: string
  bankAccountNo?: string
  ifscCode?: string
  salaryAdvancesRelated?: string
  status: EmployeeStatus
}

const activeEmployees: ActiveEmployee[] = [
  {
    id: '1',
    fullName: 'ANUSHREE NAMDEO',
    employeeCode: 'ANO/0720/9578',
    dateOfHire: '2020-07-09',
    completedMonths: 62,
    company: 'ANOCAB GROUP',
    unit: 'Unit 2',
    mobileNo: '7581911744',
    dateOfBirth: '1996-07-01',
    department: 'Management',
    jobTitle: 'Chief Manager',
    helmet: 'ON',
    shoes: 0,
    onRollStatus: 'ON ROLL',
    payrollInformation: 20000,
    emergencyContact: '9300158615',
    emergencyContactName: 'RAJESH NAMDEO',
    emergencyContactRelation: 'FATHER',
    highestQualification: 'GRADUATE',
    pfEsicNo: 'Yes',
    panNo: 'BFSPN8141M',
    aadharNo: '824453669578',
    bankAccountName: 'HDFC BANK JABALPUR',
    bankAccountNo: '50100736962543',
    ifscCode: 'HDFC000026',
    salaryAdvancesRelated: 'Related SALARY ADVANCES (0)',
    status: 'active'
  },
  {
    id: '2',
    fullName: 'RAJVANSH SAMAL',
    employeeCode: 'ANO/0124/7289',
    dateOfHire: '2024-01-01',
    completedMonths: 20,
    company: 'ANOCAB GROUP',
    unit: 'Unit 2',
    mobileNo: '8349434325',
    dateOfBirth: '2002-02-03',
    department: 'MANAGEMENT',
    jobTitle: 'Production Planning',
    helmet: 'ON',
    shoes: 0,
    onRollStatus: 'ON ROLL',
    payrollInformation: 14000,
    emergencyContact: '9926750502',
    emergencyContactName: 'UTKAL SAMAL',
    emergencyContactRelation: 'FATHER',
    highestQualification: 'BBA',
    pfEsicNo: 'NO',
    panNo: 'NZWPS04949G',
    aadharNo: '805691583371',
    bankAccountName: 'HDFC BANK',
    bankAccountNo: '50100736963240',
    ifscCode: 'HDFC0000224',
    salaryAdvancesRelated: 'Related SALARY ADVANCES (0)',
    status: 'active'
  },
  {
    id: '3',
    fullName: 'DEEPSHIKHA JHARIYA',
    employeeCode: 'ANO/0124/1738',
    dateOfHire: '2024-02-02',
    completedMonths: 20,
    company: 'ANOCAB GROUP',
    unit: 'Unit 2',
    mobileNo: '7047407599',
    dateOfBirth: '1998-04-23',
    department: 'ACCOUNTS',
    jobTitle: 'Junior Accountant',
    helmet: 'ON',
    shoes: 0,
    onRollStatus: 'ON ROLL',
    payrollInformation: 10000,
    emergencyContact: '9993256890',
    emergencyContactName: 'RAJKUMAR JHARIYA',
    emergencyContactRelation: 'FATHER',
    highestQualification: 'M.TECH',
    pfEsicNo: 'NA',
    panNo: 'BHXPJ9183J',
    aadharNo: '893037765988',
    bankAccountName: 'CANARA BANK',
    bankAccountNo: '110156858735',
    ifscCode: 'CNRB0002898',
    salaryAdvancesRelated: 'Related SALARY ADVANCES (0)',
    status: 'active'
  }
]

function formatDate(dateISO: string) {
  const d = new Date(dateISO)
  return d.toLocaleDateString()
}

export default function ActiveEmployees() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All')
  const [showColumnFilters, setShowColumnFilters] = useState(false)
  const [filters, setFilters] = useState({
    fullName: '',
    pfEsicNo: '',
    panNo: '',
    aadharNo: '',
    bankAccountName: '',
    bankAccountNo: '',
    ifscCode: '',
    salaryAdvancesRelated: '',
    helmet: '',
    shoes: '',
    onRollStatus: '',
    employeeCode: '',
    dateOfHire: '',
    completedMonths: '',
    company: '',
    unit: '',
    payrollInformation: '',
    mobileNo: '',
    dateOfBirth: '',
    department: '',
    jobTitle: '',
    emergencyContact: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    highestQualification: ''
  })

  const departments = useMemo(() => {
    const set = new Set<string>()
    activeEmployees.forEach(e => set.add(e.department))
    return ['All', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return activeEmployees.filter(e => {
      const matchesSearch =
        e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = selectedDepartment === 'All' || e.department === selectedDepartment

      const includesCI = (val: string | number | undefined, needle: string) => {
        if (!needle) return true
        if (val === undefined || val === null) return false
        return String(val).toLowerCase().includes(needle.toLowerCase())
      }

      const matchesColumnFilters =
        includesCI(e.fullName, filters.fullName) &&
        includesCI(e.pfEsicNo, filters.pfEsicNo) &&
        includesCI(e.panNo, filters.panNo) &&
        includesCI(e.aadharNo, filters.aadharNo) &&
        includesCI(e.bankAccountName, filters.bankAccountName) &&
        includesCI(e.bankAccountNo, filters.bankAccountNo) &&
        includesCI(e.ifscCode, filters.ifscCode) &&
        includesCI(e.salaryAdvancesRelated, filters.salaryAdvancesRelated) &&
        (filters.helmet ? e.helmet === (filters.helmet as 'ON' | 'OFF') : true) &&
        includesCI(e.shoes, filters.shoes) &&
        (filters.onRollStatus ? e.onRollStatus === (filters.onRollStatus as 'ON ROLL' | 'OF ROLL') : true) &&
        includesCI(e.employeeCode, filters.employeeCode) &&
        includesCI(formatDate(e.dateOfHire), filters.dateOfHire) &&
        includesCI(e.completedMonths, filters.completedMonths) &&
        includesCI(e.company, filters.company) &&
        includesCI(e.unit, filters.unit) &&
        includesCI(e.payrollInformation, filters.payrollInformation) &&
        includesCI(e.mobileNo, filters.mobileNo) &&
        includesCI(formatDate(e.dateOfBirth), filters.dateOfBirth) &&
        includesCI(e.department, filters.department) &&
        includesCI(e.jobTitle, filters.jobTitle) &&
        includesCI(e.emergencyContact, filters.emergencyContact) &&
        includesCI(e.emergencyContactName, filters.emergencyContactName) &&
        includesCI(e.emergencyContactRelation, filters.emergencyContactRelation) &&
        includesCI(e.highestQualification, filters.highestQualification)

      return matchesSearch && matchesDept && matchesColumnFilters
    })
  }, [searchTerm, selectedDepartment, filters])

  const handleExportCSV = () => {
    const header = [
      'Full Name','Helmet','Shoes','On Roll/Off Roll','Employee Code','Date of Hire','Completed Months','Company','Unit','Payroll Information','Mobile No.','Date of Birth','Department','Job Title','Emergency Contact','Emergency Contact Name','Emergency Contact Relation','Highest Qualification','PF/ESIC No.','PAN No.','AADHAR No.','Bank Account Name','Bank Account No.','IFSC Code','Related Salary Advances'
    ]
    const rows = filtered.map(e => [
      e.fullName,
      e.helmet,
      String(e.shoes),
      e.onRollStatus,
      e.employeeCode,
      formatDate(e.dateOfHire),
      String(e.completedMonths),
      e.company,
      e.unit,
      String(e.payrollInformation),
      e.mobileNo,
      formatDate(e.dateOfBirth),
      e.department,
      e.jobTitle,
      e.emergencyContact,
      e.emergencyContactName,
      e.emergencyContactRelation,
      e.highestQualification,
      e.pfEsicNo || '',
      e.panNo || '',
      e.aadharNo || '',
      e.bankAccountName || '',
      e.bankAccountNo || '',
      e.ifscCode || '',
      e.salaryAdvancesRelated || ''
    ])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'active-employees.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end items-center">
        <div className="flex space-x-3">
          <button className="btn btn-primary btn-md">
            <Edit className="mr-2 h-4 w-4" />
            Add Employee
          </button>
          <button className="btn btn-outline btn-md" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Active</p>
              <p className="text-2xl font-bold text-green-600">{filtered.length}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold text-sm">✓</span>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Departments</p>
              <p className="text-2xl font-bold text-blue-600">{departments.length - 1}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">🏢</span>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">On Roll</p>
              <p className="text-2xl font-bold text-purple-600">{filtered.filter(e => e.onRollStatus === 'ON ROLL').length}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">👥</span>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Avg. Salary</p>
              <p className="text-2xl font-bold text-orange-600">₹{Math.round(filtered.reduce((sum, e) => sum + e.payrollInformation, 0) / filtered.length || 0).toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-semibold text-sm">₹</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Status Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Employee Status">
            <div className="flex items-center py-4 border-b-2 border-blue-500">
              <span className="text-blue-600 font-semibold text-sm">Active Employees</span>
              <span className="ml-3 inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                3
              </span>
            </div>
            <div className="flex items-center py-4 border-b-2 border-transparent hover:border-gray-300">
              <span className="text-gray-500 font-medium text-sm">Inactive Employees</span>
              <span className="ml-3 inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                1
              </span>
            </div>
            <div className="flex items-center py-4 border-b-2 border-transparent hover:border-gray-300">
              <span className="text-gray-500 font-medium text-sm">Hold</span>
              <span className="ml-3 inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">
                1
              </span>
            </div>
          </nav>
        </div>
        
        {/* Search and Filters */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name, code, mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setShowColumnFilters(v => !v)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {showColumnFilters ? 'Hide Filters' : 'Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Employee Code</th>
                <th className="table-head">Full Name</th>
                <th className="table-head">PF/ESIC No.</th>
                <th className="table-head">PAN No.</th>
                <th className="table-head">AADHAR No.</th>
                <th className="table-head">Bank Account Name</th>
                <th className="table-head">Bank Account No.</th>
                <th className="table-head">IFSC Code</th>
                <th className="table-head">Related SALARY ADVANCES</th>
                <th className="table-head">Helmet</th>
                <th className="table-head">Shoes</th>
                <th className="table-head">On Roll / Off Roll Status</th>
                <th className="table-head">Date of Hire</th>
                <th className="table-head">Completed Months</th>
                <th className="table-head">Company</th>
                <th className="table-head">Unit</th>
                <th className="table-head">Payroll Information</th>
                <th className="table-head">Mobile No.</th>
                <th className="table-head">Date of Birth</th>
                <th className="table-head">Department</th>
                <th className="table-head">Job Title</th>
                <th className="table-head">Emergency Contact</th>
                <th className="table-head">Emergency Contact Name</th>
                <th className="table-head">Emergency Contact Relation</th>
                <th className="table-head">Highest Qualification</th>
                <th className="table-head">Actions</th>
              </tr>
              {showColumnFilters && (
                <tr className="table-row">
                  <th className="table-head">
                    <input className="input" value={filters.employeeCode} onChange={(e) => setFilters({ ...filters, employeeCode: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.fullName} onChange={(e) => setFilters({ ...filters, fullName: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.pfEsicNo} onChange={(e) => setFilters({ ...filters, pfEsicNo: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.panNo} onChange={(e) => setFilters({ ...filters, panNo: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.aadharNo} onChange={(e) => setFilters({ ...filters, aadharNo: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.bankAccountName} onChange={(e) => setFilters({ ...filters, bankAccountName: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.bankAccountNo} onChange={(e) => setFilters({ ...filters, bankAccountNo: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.ifscCode} onChange={(e) => setFilters({ ...filters, ifscCode: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.salaryAdvancesRelated} onChange={(e) => setFilters({ ...filters, salaryAdvancesRelated: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <select className="input" value={filters.helmet} onChange={(e) => setFilters({ ...filters, helmet: e.target.value })}>
                      <option value="">All</option>
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.shoes} onChange={(e) => setFilters({ ...filters, shoes: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <select className="input" value={filters.onRollStatus} onChange={(e) => setFilters({ ...filters, onRollStatus: e.target.value })}>
                      <option value="">All</option>
                      <option value="ON ROLL">ON ROLL</option>
                      <option value="OF ROLL">OF ROLL</option>
                    </select>
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.dateOfHire} onChange={(e) => setFilters({ ...filters, dateOfHire: e.target.value })} placeholder="MM/DD/YYYY" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.completedMonths} onChange={(e) => setFilters({ ...filters, completedMonths: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.unit} onChange={(e) => setFilters({ ...filters, unit: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.payrollInformation} onChange={(e) => setFilters({ ...filters, payrollInformation: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.mobileNo} onChange={(e) => setFilters({ ...filters, mobileNo: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.dateOfBirth} onChange={(e) => setFilters({ ...filters, dateOfBirth: e.target.value })} placeholder="MM/DD/YYYY" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.jobTitle} onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.emergencyContact} onChange={(e) => setFilters({ ...filters, emergencyContact: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.emergencyContactName} onChange={(e) => setFilters({ ...filters, emergencyContactName: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.emergencyContactRelation} onChange={(e) => setFilters({ ...filters, emergencyContactRelation: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.highestQualification} onChange={(e) => setFilters({ ...filters, highestQualification: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head"></th>
                </tr>
              )}
            </thead>
            <tbody className="table-body">
              {filtered.map(emp => (
                <tr key={emp.id} className="table-row">
                  <td className="table-cell whitespace-nowrap">{emp.employeeCode}</td>
                  <td className="table-cell whitespace-nowrap">{emp.fullName}</td>
                  <td className="table-cell whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-secondary-400" />
                      <span>{emp.pfEsicNo || 'NA'}</span>
                    </div>
                  </td>
                  <td className="table-cell whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-secondary-400" />
                      <span>{emp.panNo || 'NA'}</span>
                    </div>
                  </td>
                  <td className="table-cell whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-secondary-400" />
                      <span>{emp.aadharNo || 'NA'}</span>
                    </div>
                  </td>
                  <td className="table-cell whitespace-nowrap">{emp.bankAccountName || '—'}</td>
                  <td className="table-cell whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-secondary-400" />
                      <span>{emp.bankAccountNo || '—'}</span>
                    </div>
                  </td>
                  <td className="table-cell whitespace-nowrap">{emp.ifscCode || '—'}</td>
                  <td className="table-cell whitespace-nowrap">{emp.salaryAdvancesRelated || '—'}</td>
                  <td className="table-cell whitespace-nowrap">{emp.helmet === 'ON' ? 'ON' : 'OFF'}</td>
                  <td className="table-cell whitespace-nowrap">{emp.shoes}</td>
                  <td className="table-cell whitespace-nowrap">{emp.onRollStatus}</td>
                  <td className="table-cell whitespace-nowrap">{formatDate(emp.dateOfHire)}</td>
                  <td className="table-cell text-right">{emp.completedMonths}</td>
                  <td className="table-cell whitespace-nowrap">{emp.company}</td>
                  <td className="table-cell whitespace-nowrap">{emp.unit}</td>
                  <td className="table-cell whitespace-nowrap">{emp.payrollInformation.toLocaleString()}</td>
                  <td className="table-cell whitespace-nowrap">{emp.mobileNo}</td>
                  <td className="table-cell whitespace-nowrap">{formatDate(emp.dateOfBirth)}</td>
                  <td className="table-cell whitespace-nowrap">{emp.department}</td>
                  <td className="table-cell whitespace-nowrap">{emp.jobTitle}</td>
                  <td className="table-cell whitespace-nowrap">{emp.emergencyContact}</td>
                  <td className="table-cell whitespace-nowrap">{emp.emergencyContactName}</td>
                  <td className="table-cell whitespace-nowrap">{emp.emergencyContactRelation}</td>
                  <td className="table-cell whitespace-nowrap">{emp.highestQualification}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <a href={`tel:${emp.mobileNo}`} className="p-1 text-secondary-400 hover:text-primary-600" title="Call">
                        <Phone className="h-4 w-4" />
                      </a>
                      <a href={`mailto:hr@example.com`} className="p-1 text-secondary-400 hover:text-primary-600" title="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                      <button className="p-1 text-secondary-400 hover:text-secondary-600" title="More">
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
    </div>
  )
}


