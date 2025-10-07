import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EmployeeManagement from './pages/EmployeeManagement'
import ActiveEmployees from './pages/ActiveEmployees'
import InactiveEmployees from './pages/InactiveEmployees'
import AttendanceManagement from './pages/AttendanceManagement'
import LeaveManagement from './pages/LeaveManagement'
import PayrollManagement from './pages/PayrollManagement'
import PerformanceManagement from './pages/PerformanceManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import TrainingManagement from './pages/TrainingManagement'
import Profile from './pages/Profile'
import AddEmployee from './pages/AddEmployee'
import DepartmentManagement from './pages/DepartmentManagement'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/employees/active" element={<ActiveEmployees />} />
          <Route path="/employees/inactive" element={<InactiveEmployees />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/leave" element={<LeaveManagement />} />
          <Route path="/payroll" element={<PayrollManagement />} />
          <Route path="/performance" element={<PerformanceManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/training" element={<TrainingManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/department" element={<DepartmentManagement />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
