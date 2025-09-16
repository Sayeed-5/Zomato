import React from 'react'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-gray-950 dark:to-black transition-colors">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
