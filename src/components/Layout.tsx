import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  CheckCircle,
  Folder,
  ChevronRight,
  Home,
  UserCheck,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, active: true },
  { name: 'Attendance', href: '/attendance', icon: Clock, hasSubmenu: true },
  { name: 'Leave', href: '/leave', icon: Calendar, hasSubmenu: true },
  { name: 'Approval', href: '/approval', icon: CheckCircle, hasSubmenu: true },
  { name: 'HR Reports', href: '/reports', icon: BarChart3, hasSubmenu: true },
  { name: 'General Setup', href: '/settings', icon: Settings, hasSubmenu: true },
  { name: 'Training', href: '/training', icon: BookOpen, hasSubmenu: true },
  { name: 'Salary', href: '/payroll', icon: DollarSign, hasSubmenu: true },
  { name: 'Shift Setup', href: '/shift', icon: Settings, hasSubmenu: true },
  { name: 'Management', href: '/management', icon: Folder, hasSubmenu: true },
  { name: 'Performance', href: '/performance', icon: TrendingUp, hasSubmenu: true },
  { name: 'Profile', href: '/profile', icon: User, hasSubmenu: true },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-primary-600">HRMS</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 px-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href

              // Special handling for Profile dropdown
              if (item.name === 'Profile') {
                return (
                  <div key={item.name} className="mb-1">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </div>
                      {profileDropdownOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {profileDropdownOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        <Link
                          to="/employees"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/employees'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          Employees
                        </Link>
                        <Link
                          to="/add-employee"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/add-employee'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          Add Employee
                        </Link>
                        <Link
                          to="/department"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/department'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          Department
                        </Link>
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-secondary-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-primary-600">HRMS</h1>
          </div>
          <nav className="mt-4 flex-1 px-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href

              // Special handling for Profile dropdown
              if (item.name === 'Profile') {
                return (
                  <div key={item.name} className="mb-1">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </div>
                      {profileDropdownOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {profileDropdownOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        <Link
                          to="/employees"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/employees'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                        >
                          Employees
                        </Link>
                        <Link
                          to="/add-employee"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/add-employee'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                        >
                          Add Employee
                        </Link>
                        <Link
                          to="/department"
                          className={`block px-3 py-2 rounded-md text-sm ${
                            location.pathname === '/department'
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                          }`}
                        >
                          Department
                        </Link>
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white border-b border-secondary-200 px-4 lg:px-6">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0">
              {location.pathname === '/training' && (
                <h1 className="text-xl font-bold text-secondary-900">Training Management</h1>
              )}
              {location.pathname === '/employees' && (
                <h1 className="text-xl font-bold text-secondary-900">Employee Management</h1>
              )}
              {location.pathname === '/profile' && (
                <h1 className="text-xl font-bold text-secondary-900">Profile</h1>
              )}
              {location.pathname === '/add-employee' && (
                <h1 className="text-xl font-bold text-secondary-900">Add Employee</h1>
              )}
              {location.pathname === '/department' && (
                <h1 className="text-xl font-bold text-secondary-900">Department Management</h1>
              )}
              {location.pathname === '/management' && (
                <h1 className="text-xl font-bold text-secondary-900">Management</h1>
              )}
              {location.pathname === '/shift' && (
                <h1 className="text-xl font-bold text-secondary-900">Shift Setup</h1>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-secondary-400 hover:text-secondary-600">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-secondary-900">John Doe</p>
                <p className="text-xs text-secondary-500">HR Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
