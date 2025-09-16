import React from 'react'

const IconButton = ({ label, children, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="group flex flex-col items-center text-white/90 hover:text-white transition-colors"
  >
    <span className="p-2 rounded-xl bg-white/15 dark:bg-black/20 group-hover:bg-white/25 dark:group-hover:bg-black/30 shadow-md transition-colors">
      {children}
    </span>
  </button>
)

const ActionBar = ({ likes = 120, comments = 34, saves = 18 }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-2 rounded-2xl shadow-lg backdrop-blur-md bg-white/20 dark:bg-black/20">
      <div className="flex flex-col items-center">
        <IconButton label="Like" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.203 3 12.931 3 10.25 3 7.322 5.322 5 8.25 5c1.6 0 3.042.692 4.01 1.786A5.225 5.225 0 0116.25 5C19.178 5 21.5 7.322 21.5 10.25c0 2.682-1.688 4.953-3.989 7.257a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003-.003.001a.75.75 0 01-.676 0l-.003-.001z"/>
          </svg>
        </IconButton>
        <span className="text-xs mt-1 opacity-90">{likes}</span>
      </div>

      <div className="flex flex-col items-center">
        <IconButton label="Comment" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M4.5 5.25a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 5.25v8.25a2.25 2.25 0 01-2.25 2.25H8.309a1.5 1.5 0 00-1.06.44l-2.47 2.47a.75.75 0 01-1.28-.53V5.25z" clipRule="evenodd"/>
          </svg>
        </IconButton>
        <span className="text-xs mt-1 opacity-90">{comments}</span>
      </div>

      <div className="flex flex-col items-center">
        <IconButton label="Save" onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M6.32 2.577A1.5 1.5 0 017.62 2h8.76a1.5 1.5 0 011.3.577l2.87 3.588A1.5 1.5 0 0121 7.5V20.25A1.5 1.5 0 0119.5 21.75h-15A1.5 1.5 0 013 20.25V7.5a1.5 1.5 0 01.45-1.064l2.87-3.859zM8.25 3.75a.75.75 0 100 1.5h7.5a.75.75 0 100-1.5h-7.5zM6.75 9A.75.75 0 017.5 8.25h9a.75.75 0 010 1.5h-9A.75.75 0 016.75 9zm0 3.75A.75.75 0 017.5 12h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm0 3.75a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z"/>
          </svg>
        </IconButton>
        <span className="text-xs mt-1 opacity-90">{saves}</span>
      </div>
    </div>
  )
}

export default ActionBar 