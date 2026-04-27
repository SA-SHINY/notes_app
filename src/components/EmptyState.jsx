import React from 'react'

const EmptyState = ({ activeTab, searchQuery, selectedTag }) => {
  
  const getMessage = () => {
    if (activeTab === 'trash') return 'Trash is empty. Deleted notes will appear here.'
    if (activeTab === 'archived') return 'No archived notes. Archive notes to keep them organized.'
    if (searchQuery || selectedTag) return 'Try adjusting your search or filters.'
    return 'Click "New Note" to create your first note!'
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-16 text-center border border-red-500/20 shadow-2xl">
      
      <h3 className="text-2xl font-semibold text-white mb-2">No notes found</h3>
      <p className="text-gray-400">{getMessage()}</p>
    </div>
  )
}

export default EmptyState