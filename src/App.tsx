import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EmployeeManagement from './pages/EmployeeManagement'
import AttendanceManagement from './pages/AttendanceManagement'
import LeaveManagement from './pages/LeaveManagement'
import PayrollManagement from './pages/PayrollManagement'
import PerformanceManagement from './pages/PerformanceManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/leave" element={<LeaveManagement />} />
          <Route path="/payroll" element={<PayrollManagement />} />
          <Route path="/performance" element={<PerformanceManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
