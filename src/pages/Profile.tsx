import React from 'react'

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">John Doe</h2>
            <p className="text-secondary-500">HR Manager</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Contact</h3>
            <p className="text-secondary-700">john.doe@example.com</p>
            <p className="text-secondary-700">+91 90000 00000</p>
          </div>
          <div className="card p-4">
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Organization</h3>
            <p className="text-secondary-700">ANOCAB GROUP</p>
            <p className="text-secondary-700">Unit 2</p>
          </div>
        </div>
      </div>
    </div>
  )
}


