import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-gray-950 dark:to-black transition-colors">
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default Layout