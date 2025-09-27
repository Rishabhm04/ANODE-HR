import React, { useState } from 'react'
import { 
  DollarSign, 
  Download, 
  Eye, 
  Play, 
  Pause, 
  Settings,
  Calculator,
  FileText,
  User,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface PayrollRun {
  id: string
  period: string
  status: 'draft' | 'processing' | 'completed' | 'failed'
  totalEmployees: number
  totalAmount: number
  createdDate: string
  completedDate?: string
}

interface Payslip {
  id: string
  employeeId: string
  employeeName: string
  period: string
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  status: 'generated' | 'sent' | 'viewed'
  generatedDate: string
}

interface Allowance {
  id: string
  name: string
  type: 'fixed' | 'percentage'
  value: number
  department: string
  isActive: boolean
}

const mockPayrollRuns: PayrollRun[] = [
  {
    id: '1',
    period: 'December 2023',
    status: 'completed',
    totalEmployees: 150,
    totalAmount: 1250000,
    createdDate: '2023-12-01',
    completedDate: '2023-12-05'
  },
  {
    id: '2',
    period: 'January 2024',
    status: 'processing',
    totalEmployees: 152,
    totalAmount: 1280000,
    createdDate: '2024-01-01'
  },
  {
    id: '3',
    period: 'February 2024',
    status: 'draft',
    totalEmployees: 0,
    totalAmount: 0,
    createdDate: '2024-02-01'
  }
]

const mockPayslips: Payslip[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    period: 'December 2023',
    basicSalary: 8500,
    allowances: 1200,
    deductions: 850,
    netSalary: 8850,
    status: 'viewed',
    generatedDate: '2023-12-05'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    period: 'December 2023',
    basicSalary: 7500,
    allowances: 800,
    deductions: 750,
    netSalary: 7550,
    status: 'sent',
    generatedDate: '2023-12-05'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Chen',
    period: 'December 2023',
    basicSalary: 9500,
    allowances: 1500,
    deductions: 950,
    netSalary: 10050,
    status: 'generated',
    generatedDate: '2023-12-05'
  }
]

const mockAllowances: Allowance[] = [
  {
    id: '1',
    name: 'Transport Allowance',
    type: 'fixed',
    value: 500,
    department: 'All',
    isActive: true
  },
  {
    id: '2',
    name: 'Housing Allowance',
    type: 'percentage',
    value: 15,
    department: 'Engineering',
    isActive: true
  },
  {
    id: '3',
    name: 'Meal Allowance',
    type: 'fixed',
    value: 300,
    department: 'All',
    isActive: true
  },
  {
    id: '4',
    name: 'Performance Bonus',
    type: 'percentage',
    value: 10,
    department: 'Sales',
    isActive: false
  }
]

export default function PayrollManagement() {
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(mockPayrollRuns)
  const [payslips, setPayslips] = useState<Payslip[]>(mockPayslips)
  const [allowances, setAllowances] = useState<Allowance[]>(mockAllowances)
  const [selectedPeriod, setSelectedPeriod] = useState('December 2023')
  const [showAllowanceModal, setShowAllowanceModal] = useState(false)
  const [showPayslipModal, setShowPayslipModal] = useState(false)
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processing':
        return <Play className="h-4 w-4 text-blue-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Pause className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const handleRunPayroll = (period: string) => {
    setPayrollRuns(prev => prev.map(run => 
      run.period === period 
        ? { ...run, status: 'processing' as const }
        : run
    ))
    
    // Simulate processing
    setTimeout(() => {
      setPayrollRuns(prev => prev.map(run => 
        run.period === period 
          ? { ...run, status: 'completed' as const, completedDate: new Date().toISOString().split('T')[0] }
          : run
      ))
    }, 3000)
  }

  const handleViewPayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip)
    setShowPayslipModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Payroll Management</h1>
          <p className="text-secondary-600">Process payroll, manage allowances, and generate payslips</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAllowanceModal(true)}
            className="btn btn-outline btn-md"
          >
            <Settings className="mr-2 h-4 w-4" />
            Allowances
          </button>
          <button className="btn btn-primary btn-md">
            <Calculator className="mr-2 h-4 w-4" />
            Run Payroll
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Payroll</p>
              <p className="text-2xl font-bold text-green-600">$2.4M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Employees Paid</p>
              <p className="text-2xl font-bold text-blue-600">152</p>
            </div>
            <User className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Avg. Salary</p>
              <p className="text-2xl font-bold text-purple-600">$15.8K</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Payslips Sent</p>
              <p className="text-2xl font-bold text-orange-600">148</p>
            </div>
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Payroll Runs */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Payroll Runs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Period</th>
                <th className="table-head">Status</th>
                <th className="table-head">Employees</th>
                <th className="table-head">Total Amount</th>
                <th className="table-head">Created Date</th>
                <th className="table-head">Completed Date</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {payrollRuns.map((run) => (
                <tr key={run.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      <span className="font-medium text-secondary-900">{run.period}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(run.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                        {run.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">{run.totalEmployees}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">${run.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{new Date(run.createdDate).toLocaleDateString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">
                      {run.completedDate ? new Date(run.completedDate).toLocaleDateString() : '-'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {run.status === 'draft' && (
                        <button 
                          onClick={() => handleRunPayroll(run.period)}
                          className="btn btn-primary btn-sm"
                        >
                          <Play className="mr-1 h-3 w-3" />
                          Run
                        </button>
                      )}
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslips */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Payslips</h3>
          <div className="flex space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input"
            >
              <option value="December 2023">December 2023</option>
              <option value="January 2024">January 2024</option>
              <option value="February 2024">February 2024</option>
            </select>
            <button className="btn btn-outline btn-sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="table-head">Employee</th>
                <th className="table-head">Period</th>
                <th className="table-head">Basic Salary</th>
                <th className="table-head">Allowances</th>
                <th className="table-head">Deductions</th>
                <th className="table-head">Net Salary</th>
                <th className="table-head">Status</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{payslip.employeeName}</p>
                        <p className="text-sm text-secondary-500">ID: {payslip.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{payslip.period}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium">${payslip.basicSalary.toLocaleString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium text-green-600">+${payslip.allowances.toLocaleString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium text-red-600">-${payslip.deductions.toLocaleString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-bold text-secondary-900">${payslip.netSalary.toLocaleString()}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payslip.status === 'viewed' ? 'bg-green-100 text-green-800' :
                      payslip.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payslip.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewPayslip(payslip)}
                        className="p-1 text-secondary-400 hover:text-primary-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allowances Configuration */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Allowances & Deductions</h3>
          <button 
            onClick={() => setShowAllowanceModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-secondary-900 mb-4">Allowances</h4>
              <div className="space-y-3">
                {allowances.filter(a => a.isActive).map((allowance) => (
                  <div key={allowance.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-secondary-900">{allowance.name}</p>
                      <p className="text-sm text-secondary-600">{allowance.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {allowance.type === 'fixed' ? `$${allowance.value}` : `${allowance.value}%`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 mb-4">Deductions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-secondary-900">Provident Fund</p>
                    <p className="text-sm text-secondary-600">Employee: 3%, Employer: 2%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">5%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-secondary-900">Social Security</p>
                    <p className="text-sm text-secondary-600">Standard rate</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">2.5%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-secondary-900">Income Tax</p>
                    <p className="text-sm text-secondary-600">Based on salary bracket</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">Variable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payslip Detail Modal */}
      {showPayslipModal && selectedPayslip && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowPayslipModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Payslip Details</h3>
                  <button 
                    onClick={() => setShowPayslipModal(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Employee Info */}
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <h4 className="font-medium text-secondary-900 mb-2">Employee Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-secondary-600">Name:</p>
                        <p className="font-medium">{selectedPayslip.employeeName}</p>
                      </div>
                      <div>
                        <p className="text-secondary-600">Employee ID:</p>
                        <p className="font-medium">{selectedPayslip.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-secondary-600">Period:</p>
                        <p className="font-medium">{selectedPayslip.period}</p>
                      </div>
                      <div>
                        <p className="text-secondary-600">Generated:</p>
                        <p className="font-medium">{new Date(selectedPayslip.generatedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-3">Earnings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Basic Salary</span>
                        <span className="font-medium">${selectedPayslip.basicSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Allowances</span>
                        <span className="font-medium text-green-600">+${selectedPayslip.allowances.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total Earnings</span>
                          <span>${(selectedPayslip.basicSalary + selectedPayslip.allowances).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-3">Deductions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Provident Fund</span>
                        <span className="font-medium text-red-600">-${(selectedPayslip.deductions * 0.4).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Social Security</span>
                        <span className="font-medium text-red-600">-${(selectedPayslip.deductions * 0.3).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Income Tax</span>
                        <span className="font-medium text-red-600">-${(selectedPayslip.deductions * 0.3).toFixed(0)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total Deductions</span>
                          <span className="text-red-600">-${selectedPayslip.deductions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-secondary-900">Net Salary</span>
                      <span className="text-2xl font-bold text-primary-600">${selectedPayslip.netSalary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button 
                    onClick={() => setShowPayslipModal(false)}
                    className="btn btn-outline btn-md"
                  >
                    Close
                  </button>
                  <button className="btn btn-primary btn-md">
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
