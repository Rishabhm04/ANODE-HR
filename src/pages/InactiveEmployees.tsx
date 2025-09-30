import React, { useMemo, useState } from 'react'
import {
  Search,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  FileText
} from 'lucide-react'

type EmployeeStatus = 'active' | 'inactive'

interface InactiveEmployee {
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

const inactiveEmployees: InactiveEmployee[] = [
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

function formatDate(dateISO: string) {
  const d = new Date(dateISO)
  return d.toLocaleDateString()
}

export default function InactiveEmployees() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All')

  const departments = useMemo(() => {
    const set = new Set<string>()
    inactiveEmployees.forEach(e => set.add(e.department))
    return ['All', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return inactiveEmployees.filter(e => {
      const matchesSearch =
        e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = selectedDepartment === 'All' || e.department === selectedDepartment
      return matchesSearch && matchesDept
    })
  }, [searchTerm, selectedDepartment])

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
    a.download = 'inactive-employees.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Header (match other tabs) */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Inactive Employees</h1>
          <p className="text-secondary-600">Employees currently off roll</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-secondary-700">Inactive</span>
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
          <button className="btn btn-outline btn-md" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
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
                <th className="table-head">Employee Code</th>
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
            </thead>
            <tbody className="table-body">
              {filtered.map(emp => (
                <tr key={emp.id} className="table-row">
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
                  <td className="table-cell whitespace-nowrap">{emp.employeeCode}</td>
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


