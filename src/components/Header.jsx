import React from 'react'

const Header = ({ onNewNote, notesCount, archivedCount, trashCount, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'notes', label: 'All Notes', icon: 'fa-pen-fancy', count: notesCount },
    { id: 'archived', label: 'Archive', icon: 'fa-archive', count: archivedCount },
    { id: 'trash', label: 'Trash', icon: 'fa-trash-alt', count: trashCount }
  ]

  return (
    <header className="bg-black/80 backdrop-blur-md shadow-2xl border-b border-red-500/30 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-2 rounded-xl shadow-lg">
              <i className="fas fa-sticky-note text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Notewise
              </h1>
              <p className="text-xs text-gray-400">Smart Notes Organizer</p>
            </div>
          </div>
          <button
            onClick={onNewNote}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <i className="fas fa-plus"></i> New Note
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); }}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-red-400/30 text-white' : 'bg-gray-700 text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header