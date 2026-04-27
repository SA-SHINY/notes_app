import React from 'react'

const NoteCard = ({ note, activeTab, onView, onEdit, onPin, onArchive, onTrash, onRestore, onDelete }) => {
  const getNoteGradient = (id) => {
    const gradients = [
      'from-gray-800 to-gray-900',
      'from-red-900 to-red-950',
      'from-gray-700 to-gray-800',
      'from-red-800 to-red-900',
      'from-gray-900 to-black',
      'from-red-950 to-black',
      'from-gray-850 to-gray-950'
    ]
    const index = parseInt(id) % gradients.length
    return gradients[index]
  }

  return (
    <div className={`bg-gradient-to-br ${getNoteGradient(note.id)} rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-red-500/20 backdrop-blur-sm overflow-hidden`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 flex-1">
            {activeTab === 'notes' && note.isPinned && (
              <i className="fas fa-thumbtack text-red-500 text-sm rotate-45"></i>
            )}
            <h3 className="font-bold text-white text-lg break-words line-clamp-2">{note.title}</h3>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {note.description || "No description"}
        </p>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.tags.map(tag => (
              <span key={tag} className="bg-red-900/40 backdrop-blur-sm text-red-300 text-xs px-2 py-1 rounded-full font-medium border border-red-500/30">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <i className="far fa-calendar-alt"></i>
          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-3 border-t border-red-500/20">
          {activeTab !== 'trash' ? (
            <>
              <button onClick={() => onView(note)} className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-blue-400 text-xs py-1.5 px-2 rounded-lg transition border border-gray-700">
                <i className="far fa-eye"></i> View
              </button>
              <button onClick={() => onEdit(note)} className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-gray-300 text-xs py-1.5 px-2 rounded-lg transition border border-gray-700">
                <i className="far fa-edit"></i> Edit
              </button>
              {activeTab !== 'archived' && (
                <button onClick={() => onPin(note.id)} className={`flex-1 text-xs py-1.5 px-2 rounded-lg transition border ${note.isPinned ? 'bg-red-900/50 text-red-400 border-red-500' : 'bg-gray-800/80 hover:bg-gray-700 text-gray-400 border-gray-700'}`}>
                  <i className="fas fa-thumbtack"></i> {note.isPinned ? 'Unpin' : 'Pin'}
                </button>
              )}
              <button onClick={() => onArchive(note.id)} className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-purple-400 text-xs py-1.5 px-2 rounded-lg transition border border-gray-700">
                <i className="fas fa-archive"></i> {activeTab === 'archived' ? 'Unarchive' : 'Archive'}
              </button>
              <button onClick={() => onTrash(note.id)} className="flex-1 bg-gray-800/80 hover:bg-gray-700 text-red-500 text-xs py-1.5 px-2 rounded-lg transition border border-gray-700">
                <i className="far fa-trash-alt"></i> Trash
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onRestore(note.id)} className="flex-1 bg-green-900/50 hover:bg-green-800 text-green-400 text-xs py-1.5 px-2 rounded-lg transition border border-green-700">
                <i className="fas fa-trash-restore"></i> Restore
              </button>
              <button onClick={() => onDelete(note.id)} className="flex-1 bg-red-900/50 hover:bg-red-800 text-red-400 text-xs py-1.5 px-2 rounded-lg transition border border-red-700">
                <i className="fas fa-skull"></i> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteCard