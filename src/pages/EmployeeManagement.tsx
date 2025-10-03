import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  X
} from 'lucide-react'

type EmployeeStatus = 'active' | 'inactive' | 'hold'

interface Employee {
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

const activeEmployees: Employee[] = [
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

const inactiveEmployees: Employee[] = [
  {
    id: '101',
    fullName: 'ROHAN MEHTA',
    employeeCode: 'ANO/0521/6621',
    dateOfHire: '2021-05-12',
    completedMonths: 28,
    company: 'ANOCAB GROUP',
    unit: 'Unit 1',
    mobileNo: '9812345678',
    dateOfBirth: '1994-09-21',
    department: 'SALES',
    jobTitle: 'Sales Executive',
    helmet: 'OFF',
    shoes: 0,
    onRollStatus: 'OF ROLL',
    payrollInformation: 0,
    emergencyContact: '9812341111',
    emergencyContactName: 'ARUN MEHTA',
    emergencyContactRelation: 'FATHER',
    highestQualification: 'B.COM',
    pfEsicNo: 'NA',
    panNo: 'ABCDE1234F',
    aadharNo: '789456123987',
    bankAccountName: 'HDFC BANK',
    bankAccountNo: '50100123456789',
    ifscCode: 'HDFC0000123',
    salaryAdvancesRelated: 'Related SALARY ADVANCES (0)',
    status: 'inactive'
  }
]

const holdEmployees: Employee[] = [
  {
    id: '201',
    fullName: 'PRIYA SHARMA',
    employeeCode: 'ANO/0823/3321',
    dateOfHire: '2023-08-10',
    completedMonths: 14,
    company: 'ANOCAB GROUP',
    unit: 'Unit 3',
    mobileNo: '9876501234',
    dateOfBirth: '1995-11-12',
    department: 'HR',
    jobTitle: 'HR Executive',
    helmet: 'OFF',
    shoes: 0,
    onRollStatus: 'ON ROLL',
    payrollInformation: 0,
    emergencyContact: '9876501111',
    emergencyContactName: 'RAVI SHARMA',
    emergencyContactRelation: 'FATHER',
    highestQualification: 'MBA',
    pfEsicNo: 'NA',
    panNo: 'ABCDE9999Z',
    aadharNo: '789456123654',
    bankAccountName: 'SBI',
    bankAccountNo: '123456789012',
    ifscCode: 'SBIN0000123',
    salaryAdvancesRelated: 'Related SALARY ADVANCES (0)',
    status: 'hold'
  }
]

function formatDate(dateISO: string) {
  const d = new Date(dateISO)
  return d.toLocaleDateString()
}

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'hold'>('active')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All')
  const [showColumnFilters, setShowColumnFilters] = useState(false)
  const [selectedForDetails, setSelectedForDetails] = useState<Employee | null>(null)
  const [panelMode, setPanelMode] = useState<'view' | 'edit'>('view')
  const [openMoreForId, setOpenMoreForId] = useState<string | null>(null)
  const [editingTab, setEditingTab] = useState<'active' | 'inactive' | 'hold'>(activeTab)
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

  const [employees, setEmployees] = useState({
    active: activeEmployees,
    inactive: inactiveEmployees,
    hold: holdEmployees
  })
  const currentEmployees = activeTab === 'active' ? employees.active : activeTab === 'inactive' ? employees.inactive : employees.hold

  const departments = useMemo(() => {
    const set = new Set<string>()
    currentEmployees.forEach(e => set.add(e.department))
    return ['All', ...Array.from(set)]
  }, [currentEmployees])

  const filtered = useMemo(() => {
    return currentEmployees.filter(e => {
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
  }, [searchTerm, selectedDepartment, filters, currentEmployees])

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
    a.download = `${activeTab}-employees.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end items-center">
        <div className="flex space-x-3">
          <button className="btn btn-primary btn-md" onClick={() => { setSelectedForDetails({
            id: String(Date.now()),
            fullName: '',
            employeeCode: '',
            dateOfHire: new Date().toISOString().slice(0,10),
            completedMonths: 0,
            company: '',
            unit: '',
            mobileNo: '',
            dateOfBirth: new Date().toISOString().slice(0,10),
            department: '',
            jobTitle: '',
            helmet: 'OFF',
            shoes: 0,
            onRollStatus: activeTab === 'inactive' ? 'OF ROLL' : 'ON ROLL',
            payrollInformation: 0,
            emergencyContact: '',
            emergencyContactName: '',
            emergencyContactRelation: '',
            highestQualification: '',
            pfEsicNo: '',
            panNo: '',
            aadharNo: '',
            bankAccountName: '',
            bankAccountNo: '',
            ifscCode: '',
            salaryAdvancesRelated: '',
            status: activeTab,
          }); setPanelMode('edit'); setEditingTab(activeTab) }}>
            <Edit className="mr-2 h-4 w-4" />
            Add Employee
          </button>
          <button className="btn btn-outline btn-md" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Active Employees
            <span className="ml-2 inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              {employees.active.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inactive'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Inactive Employees
            <span className="ml-2 inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              {employees.inactive.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('hold')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'hold'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Hold
            <span className="ml-2 inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
              {employees.hold.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total {activeTab === 'active' ? 'Active' : activeTab === 'inactive' ? 'Inactive' : 'Hold'}</p>
              <p className={`text-2xl font-bold ${activeTab === 'active' ? 'text-green-600' : activeTab === 'inactive' ? 'text-red-600' : 'text-yellow-600'}`}>{filtered.length}</p>
            </div>
            <div className={`h-8 w-8 ${activeTab === 'active' ? 'bg-green-100' : activeTab === 'inactive' ? 'bg-red-100' : 'bg-yellow-100'} rounded-full flex items-center justify-center`}>
              <span className={`${activeTab === 'active' ? 'text-green-600' : activeTab === 'inactive' ? 'text-red-600' : 'text-yellow-700'} font-semibold text-sm`}>
                {activeTab === 'active' ? '✓' : activeTab === 'inactive' ? '✗' : '⏸'}
              </span>
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
              <p className="text-sm font-medium text-secondary-600">{activeTab === 'inactive' ? 'Off Roll' : 'On Roll'}</p>
              <p className="text-2xl font-bold text-purple-600">
                {filtered.filter(e => activeTab === 'inactive' ? e.onRollStatus === 'OF ROLL' : e.onRollStatus === 'ON ROLL').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">👥</span>
            </div>
          </div>
        </div>
        
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-secondary-700">{activeTab === 'active' ? 'Active' : 'Inactive'}</span>
              <span className="inline-flex items-center justify-center h-6 px-2 rounded-full text-xs font-semibold bg-secondary-100 text-secondary-700">
                {filtered.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search name, code, mobile..."
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
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <button
                className="btn btn-outline btn-md"
                onClick={() => setShowColumnFilters(v => !v)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {showColumnFilters ? 'Hide Filters' : 'Filters'}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Full Name</th>
                <th className="table-head">Employee Code</th>
                <th className="table-head">PF/ESIC No.</th>
                <th className="table-head">PAN No.</th>
                <th className="table-head">AADHAR No.</th>
                <th className="table-head">Bank Account Name</th>
                <th className="table-head">Bank Account No.</th>
                <th className="table-head">IFSC Code</th>
                <th className="table-head">Actions</th>
              </tr>
              {showColumnFilters && (
                <tr className="table-row">
                  <th className="table-head">
                    <input className="input" value={filters.fullName} onChange={(e) => setFilters({ ...filters, fullName: e.target.value })} placeholder="Filter" />
                  </th>
                  <th className="table-head">
                    <input className="input" value={filters.employeeCode} onChange={(e) => setFilters({ ...filters, employeeCode: e.target.value })} placeholder="Filter" />
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
                  <th className="table-head"></th>
                </tr>
              )}
            </thead>
            <tbody className="table-body">
               {filtered.map(emp => (
                <React.Fragment key={emp.id}>
                  <tr className="table-row">
                    <td className="table-cell whitespace-nowrap">{emp.fullName}</td>
                    <td className="table-cell whitespace-nowrap">{emp.employeeCode}</td>
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
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 text-secondary-400 hover:text-primary-600"
                          title={'View details'}
                          onClick={() => { setSelectedForDetails(emp); setPanelMode('view'); setEditingTab(activeTab) }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-secondary-400 hover:text-primary-600" title="Edit" onClick={() => { setSelectedForDetails(emp); setPanelMode('edit'); setEditingTab(activeTab) }}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <a href={`tel:${emp.mobileNo}`} className="p-1 text-secondary-400 hover:text-primary-600" title="Call">
                          <Phone className="h-4 w-4" />
                        </a>
                        <a href={`mailto:hr@example.com`} className="p-1 text-secondary-400 hover:text-primary-600" title="Email">
                          <Mail className="h-4 w-4" />
                        </a>
                        <div className="relative">
                          <button className="p-1 text-secondary-400 hover:text-secondary-600" title="More" onClick={() => setOpenMoreForId(id => id === emp.id ? null : emp.id)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          {openMoreForId === emp.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-secondary-200 rounded shadow z-10">
                              <button className="w-full text-left px-3 py-2 hover:bg-secondary-50 text-sm" onClick={() => { navigator.clipboard.writeText(emp.mobileNo); setOpenMoreForId(null); }}>Copy Mobile No.</button>
                              <button className="w-full text-left px-3 py-2 hover:bg-secondary-50 text-sm" onClick={() => { navigator.clipboard.writeText(emp.ifscCode || ''); setOpenMoreForId(null); }}>Copy IFSC Code</button>
                              <button className="w-full text-left px-3 py-2 hover:bg-secondary-50 text-sm" onClick={() => { navigator.clipboard.writeText(emp.employeeCode); setOpenMoreForId(null); }}>Copy Employee Code</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* details moved to side panel */}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {selectedForDetails && (
      <>
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSelectedForDetails(null)}
        />
        <div className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out`}
          style={{ transform: 'translateX(0%)' }}
        >
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            <div>
              <p className="text-sm text-secondary-600">{panelMode === 'view' ? 'Employee Details' : 'Edit Employee'}</p>
              <h3 className="text-lg font-semibold">{selectedForDetails?.fullName}</h3>
            </div>
            <button className="p-2 text-secondary-500 hover:text-secondary-700" onClick={() => setSelectedForDetails(null)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-full">
            {panelMode === 'edit' ? (
              <div className="grid grid-cols-1 gap-3">
                <label className="text-xs text-secondary-500">Full Name
                  <input className="input mt-1 w-full" value={selectedForDetails?.fullName || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, fullName: e.target.value } : s)} />
                </label>
                <label className="text-xs text-secondary-500">Employee Code
                  <input className="input mt-1 w-full" value={selectedForDetails?.employeeCode || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, employeeCode: e.target.value } : s)} />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Date of Hire
                    <input type="date" className="input mt-1 w-full" value={selectedForDetails?.dateOfHire || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, dateOfHire: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Date of Birth
                    <input type="date" className="input mt-1 w-full" value={selectedForDetails?.dateOfBirth || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, dateOfBirth: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Completed Months
                    <input type="number" className="input mt-1 w-full" value={selectedForDetails?.completedMonths ?? 0} onChange={(e) => setSelectedForDetails(s => s ? { ...s, completedMonths: parseInt(e.target.value || '0', 10) } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Payroll Information
                    <input type="number" className="input mt-1 w-full" value={selectedForDetails?.payrollInformation ?? 0} onChange={(e) => setSelectedForDetails(s => s ? { ...s, payrollInformation: parseInt(e.target.value || '0', 10) } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Company
                    <input className="input mt-1 w-full" value={selectedForDetails?.company || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, company: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Unit
                    <input className="input mt-1 w-full" value={selectedForDetails?.unit || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, unit: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Department
                    <input className="input mt-1 w-full" value={selectedForDetails?.department || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, department: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Job Title
                    <input className="input mt-1 w-full" value={selectedForDetails?.jobTitle || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, jobTitle: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Helmet
                    <select className="input mt-1 w-full" value={selectedForDetails?.helmet || 'OFF'} onChange={(e) => setSelectedForDetails(s => s ? { ...s, helmet: e.target.value as 'ON' | 'OFF' } : s)}>
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </label>
                  <label className="text-xs text-secondary-500">On Roll Status
                    <select className="input mt-1 w-full" value={selectedForDetails?.onRollStatus || 'ON ROLL'} onChange={(e) => setSelectedForDetails(s => s ? { ...s, onRollStatus: e.target.value as 'ON ROLL' | 'OF ROLL' } : s)}>
                      <option value="ON ROLL">ON ROLL</option>
                      <option value="OF ROLL">OF ROLL</option>
                    </select>
                  </label>
                </div>
                <label className="text-xs text-secondary-500">Shoes
                  <input type="number" className="input mt-1 w-full" value={selectedForDetails?.shoes ?? 0} onChange={(e) => setSelectedForDetails(s => s ? { ...s, shoes: parseInt(e.target.value || '0', 10) } : s)} />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Mobile No.
                    <input className="input mt-1 w-full" value={selectedForDetails?.mobileNo || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, mobileNo: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Emergency Contact
                    <input className="input mt-1 w-full" value={selectedForDetails?.emergencyContact || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, emergencyContact: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Emergency Contact Name
                    <input className="input mt-1 w-full" value={selectedForDetails?.emergencyContactName || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, emergencyContactName: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Emergency Contact Relation
                    <input className="input mt-1 w-full" value={selectedForDetails?.emergencyContactRelation || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, emergencyContactRelation: e.target.value } : s)} />
                  </label>
                </div>
                <label className="text-xs text-secondary-500">Highest Qualification
                  <input className="input mt-1 w-full" value={selectedForDetails?.highestQualification || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, highestQualification: e.target.value } : s)} />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">PF/ESIC No.
                    <input className="input mt-1 w-full" value={selectedForDetails?.pfEsicNo || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, pfEsicNo: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">PAN No.
                    <input className="input mt-1 w-full" value={selectedForDetails?.panNo || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, panNo: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">AADHAR No.
                    <input className="input mt-1 w-full" value={selectedForDetails?.aadharNo || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, aadharNo: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">Bank Account Name
                    <input className="input mt-1 w-full" value={selectedForDetails?.bankAccountName || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, bankAccountName: e.target.value } : s)} />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-xs text-secondary-500">Bank Account No.
                    <input className="input mt-1 w-full" value={selectedForDetails?.bankAccountNo || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, bankAccountNo: e.target.value } : s)} />
                  </label>
                  <label className="text-xs text-secondary-500">IFSC Code
                    <input className="input mt-1 w-full" value={selectedForDetails?.ifscCode || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, ifscCode: e.target.value } : s)} />
                  </label>
                </div>
                <label className="text-xs text-secondary-500">Related SALARY ADVANCES
                  <input className="input mt-1 w-full" value={selectedForDetails?.salaryAdvancesRelated || ''} onChange={(e) => setSelectedForDetails(s => s ? { ...s, salaryAdvancesRelated: e.target.value } : s)} />
                </label>
                <div className="flex justify-end gap-2 pt-2">
                  <button className="btn btn-outline btn-md" onClick={() => setPanelMode('view')}>Cancel</button>
                  <button className="btn btn-primary btn-md" onClick={() => {
                    if (!selectedForDetails) return
                    setEmployees(prev => {
                      const tabKey = editingTab
                      const list = [...(prev as any)[tabKey]] as Employee[]
                      const existsIdx = list.findIndex(e => e.id === selectedForDetails.id)
                      if (existsIdx >= 0) {
                        list[existsIdx] = selectedForDetails
                      } else {
                        list.unshift({ ...selectedForDetails, status: activeTab })
                      }
                      return { ...prev, [tabKey]: list }
                    })
                    setPanelMode('view')
                  }}>Save</button>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <span className="text-secondary-500 text-xs">Employee Code</span>
                <div className="font-medium">{selectedForDetails?.employeeCode}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Related SALARY ADVANCES</span>
                <div className="font-medium">{selectedForDetails?.salaryAdvancesRelated || '—'}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Helmet</span>
                <div className="font-medium">{selectedForDetails?.helmet}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Shoes</span>
                <div className="font-medium">{selectedForDetails?.shoes}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">On Roll / Off Roll Status</span>
                <div className="font-medium">{selectedForDetails?.onRollStatus}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Date of Hire</span>
                <div className="font-medium">{selectedForDetails ? formatDate(selectedForDetails.dateOfHire) : ''}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Completed Months</span>
                <div className="font-medium">{selectedForDetails?.completedMonths}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Company</span>
                <div className="font-medium">{selectedForDetails?.company}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Unit</span>
                <div className="font-medium">{selectedForDetails?.unit}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Payroll Information</span>
                <div className="font-medium">{selectedForDetails ? selectedForDetails.payrollInformation.toLocaleString() : ''}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Mobile No.</span>
                <div className="font-medium">{selectedForDetails?.mobileNo}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Date of Birth</span>
                <div className="font-medium">{selectedForDetails ? formatDate(selectedForDetails.dateOfBirth) : ''}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Department</span>
                <div className="font-medium">{selectedForDetails?.department}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Job Title</span>
                <div className="font-medium">{selectedForDetails?.jobTitle}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Emergency Contact</span>
                <div className="font-medium">{selectedForDetails?.emergencyContact}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Emergency Contact Name</span>
                <div className="font-medium">{selectedForDetails?.emergencyContactName}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Emergency Contact Relation</span>
                <div className="font-medium">{selectedForDetails?.emergencyContactRelation}</div>
              </div>
              <div>
                <span className="text-secondary-500 text-xs">Highest Qualification</span>
                <div className="font-medium">{selectedForDetails?.highestQualification}</div>
              </div>
            </div>
            )}
          </div>
        </div>
      </>
    )}
    </>
  )
}
