import React, { useState } from 'react'
import { 
  TrendingUp, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Star,
  User,
  Calendar,
  Target,
  Award,
  BarChart3
} from 'lucide-react'

interface PerformanceTemplate {
  id: string
  name: string
  description: string
  categories: string[]
  isActive: boolean
  createdDate: string
}

interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  reviewerId: string
  reviewerName: string
  period: string
  overallScore: number
  status: 'draft' | 'in-progress' | 'completed'
  createdDate: string
  completedDate?: string
}

interface PerformanceGoal {
  id: string
  employeeId: string
  employeeName: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  deadline: string
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue'
}

const mockTemplates: PerformanceTemplate[] = [
  {
    id: '1',
    name: 'Annual Performance Review',
    description: 'Comprehensive annual evaluation covering all key performance areas',
    categories: ['Technical Skills', 'Communication', 'Leadership', 'Goal Achievement'],
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Quarterly Review',
    description: 'Quarterly performance check-in and goal assessment',
    categories: ['Goal Progress', 'Skills Development', 'Team Collaboration'],
    isActive: true,
    createdDate: '2024-01-01'
  },
  {
    id: '3',
    name: '360-Degree Feedback',
    description: 'Multi-source feedback from peers, subordinates, and supervisors',
    categories: ['Leadership', 'Communication', 'Teamwork', 'Problem Solving'],
    isActive: false,
    createdDate: '2024-01-01'
  }
]

const mockReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    reviewerId: 'MGR001',
    reviewerName: 'Sarah Johnson',
    period: 'Q4 2023',
    overallScore: 4.2,
    status: 'completed',
    createdDate: '2023-12-01',
    completedDate: '2023-12-15'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Mike Chen',
    reviewerId: 'MGR002',
    reviewerName: 'Emily Davis',
    period: 'Q4 2023',
    overallScore: 3.8,
    status: 'in-progress',
    createdDate: '2023-12-01'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Emily Davis',
    reviewerId: 'MGR001',
    reviewerName: 'Sarah Johnson',
    period: 'Q4 2023',
    overallScore: 0,
    status: 'draft',
    createdDate: '2023-12-01'
  }
]

const mockGoals: PerformanceGoal[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    title: 'Increase Sales Revenue',
    description: 'Achieve 20% increase in quarterly sales revenue',
    targetValue: 100000,
    currentValue: 75000,
    deadline: '2024-03-31',
    status: 'in-progress'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Mike Chen',
    title: 'Complete Certification',
    description: 'Obtain AWS Solutions Architect certification',
    targetValue: 1,
    currentValue: 0,
    deadline: '2024-06-30',
    status: 'not-started'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Emily Davis',
    title: 'Team Leadership',
    description: 'Successfully lead 3 major projects',
    targetValue: 3,
    currentValue: 2,
    deadline: '2024-12-31',
    status: 'in-progress'
  }
]

export default function PerformanceManagement() {
  const [templates, setTemplates] = useState<PerformanceTemplate[]>(mockTemplates)
  const [reviews, setReviews] = useState<PerformanceReview[]>(mockReviews)
  const [goals, setGoals] = useState<PerformanceGoal[]>(mockGoals)
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2023')
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<PerformanceTemplate | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Award className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Target className="h-4 w-4 text-blue-500" />
      case 'overdue':
        return <Calendar className="h-4 w-4 text-red-500" />
      default:
        return <Star className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'not-started':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600'
    if (score >= 3) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Performance Management</h1>
          <p className="text-secondary-600">Track employee performance, set goals, and conduct reviews</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowGoalModal(true)}
            className="btn btn-outline btn-md"
          >
            <Target className="mr-2 h-4 w-4" />
            Set Goals
          </button>
          <button 
            onClick={() => setShowReviewModal(true)}
            className="btn btn-primary btn-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Start Review
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Avg. Performance Score</p>
              <p className="text-2xl font-bold text-blue-600">4.1</p>
            </div>
            <Star className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Reviews Completed</p>
              <p className="text-2xl font-bold text-green-600">45</p>
            </div>
            <Award className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Goals Achieved</p>
              <p className="text-2xl font-bold text-purple-600">78%</p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Performance Reviews */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Performance Reviews</h3>
          <div className="flex space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input"
            >
              <option value="Q4 2023">Q4 2023</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
            </select>
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
                <th className="table-head">Reviewer</th>
                <th className="table-head">Period</th>
                <th className="table-head">Overall Score</th>
                <th className="table-head">Status</th>
                <th className="table-head">Created Date</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {reviews.map((review) => (
                <tr key={review.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{review.employeeName}</p>
                        <p className="text-sm text-secondary-500">ID: {review.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{review.reviewerName}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{review.period}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className={`text-sm font-medium ${getScoreColor(review.overallScore)}`}>
                        {review.overallScore > 0 ? review.overallScore.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      review.status === 'completed' ? 'bg-green-100 text-green-800' :
                      review.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{new Date(review.createdDate).toLocaleDateString()}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-400 hover:text-primary-600">
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

      {/* Performance Goals */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Performance Goals</h3>
          <button 
            onClick={() => setShowGoalModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border border-secondary-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-secondary-900">{goal.title}</h4>
                    <p className="text-sm text-secondary-600 mt-1">{goal.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-500">
                      <span>Employee: {goal.employeeName}</span>
                      <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.currentValue} / {goal.targetValue}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(goal.currentValue, goal.targetValue)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-secondary-500">
                    <span>{Math.round(getProgressPercentage(goal.currentValue, goal.targetValue))}% Complete</span>
                    <span>{goal.targetValue - goal.currentValue} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Templates */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-secondary-900">Performance Templates</h3>
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="border border-secondary-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-secondary-900">{template.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-secondary-600 mb-3">{template.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-secondary-700">Categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.categories.map((category, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button className="p-1 text-secondary-400 hover:text-primary-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-secondary-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Performance Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="font-medium text-secondary-900 mb-3">Top Performers</h4>
            <div className="space-y-3">
              {reviews.filter(r => r.overallScore > 0).sort((a, b) => b.overallScore - a.overallScore).slice(0, 3).map((review, index) => (
                <div key={review.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">#{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium">{review.employeeName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{review.overallScore.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="font-medium text-secondary-900 mb-3">Goal Achievement Rate</h4>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{goal.title}</p>
                    <p className="text-xs text-secondary-600">{goal.employeeName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(getProgressPercentage(goal.currentValue, goal.targetValue))}%</p>
                    <div className="w-16 bg-secondary-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-primary-600 h-1 rounded-full"
                        style={{ width: `${getProgressPercentage(goal.currentValue, goal.targetValue)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
