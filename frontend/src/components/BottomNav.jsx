import React from 'react'

const NavIcon = ({ label, children, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="p-2 rounded-xl text-white/90 hover:text-white bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 shadow-md transition-colors"
  >
    {children}
  </button>
)

const BottomNav = () => {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md bg-white/20 dark:bg-black/20 text-white">
      <div className="flex items-center justify-between text-xl">
        <NavIcon label="Home" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M11.47 3.84a.75.75 0 01.99 0l8.25 7.5a.75.75 0 11-.99 1.12l-.72-.65V19.5A1.5 1.5 0 0117.5 21h-3.75a.75.75 0 01-.75-.75V15h-2.5v5.25a.75.75 0 01-.75.75H5.5A1.5 1.5 0 014 19.5v-7.69l-.98.89a.75.75 0 11-.99-1.12l8.25-7.5z"/>
          </svg>
        </NavIcon>
        <NavIcon label="Saved" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M6.32 2.577A1.5 1.5 0 017.62 2h8.76a1.5 1.5 0 011.3.577l2.87 3.588A1.5 1.5 0 0121 7.5V20.25A1.5 1.5 0 0119.5 21.75h-15A1.5 1.5 0 013 20.25V7.5a1.5 1.5 0 01.45-1.064l2.87-3.859z"/>
          </svg>
        </NavIcon>
        <NavIcon label="Create Post" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
            <path d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"/>
          </svg>
        </NavIcon>
        <NavIcon label="Profile" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M12 2.25a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM4.5 20.25a7.5 7.5 0 0115 0V21a.75.75 0 01-.75.75h-13.5A.75.75 0 014.5 21v-.75z" clipRule="evenodd"/>
          </svg>
        </NavIcon>
      </div>
    </nav>
  )
}

export default BottomNav 