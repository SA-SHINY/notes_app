import React from 'react'

const ViewNoteModal = ({ note, onClose, onEdit }) => {
  if (!note) return null

  const getNoteGradient = (id) => {
    const gradients = [
      'from-gray-800 to-gray-900',
      'from-red-900 to-red-950',
      'from-gray-700 to-gray-800',
      'from-red-800 to-red-900',
      'from-gray-900 to-black'
    ]
    const index = parseInt(id) % gradients.length
    return gradients[index]
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-red-500/30" onClick={(e) => e.stopPropagation()}>
        <div className={`bg-gradient-to-r ${getNoteGradient(note.id)} rounded-t-2xl px-6 py-4 sticky top-0 border-b border-red-500/20`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {note.isPinned && <i className="fas fa-thumbtack text-red-500"></i>}
              <h2 className="text-2xl font-bold text-white">{note.title}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6">
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map(tag => (
                <span key={tag} className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-gray-300 whitespace-pre-wrap break-words leading-relaxed min-h-[200px]">
            {note.description || <span className="text-gray-500 italic">No additional content.</span>}
          </div>
          <div className="mt-6 text-xs text-gray-500 flex items-center gap-2 pt-4 border-t border-gray-800">
            <i className="far fa-clock"></i> Created: {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-900/50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-gray-800">
          <button onClick={() => {
            onClose()
            onEdit(note)
          }} className="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 hover:bg-gray-700 transition border border-gray-700">
            <i className="far fa-edit"></i> Edit
          </button>
          <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:shadow-lg transition">Close</button>
        </div>
      </div>
    </div>
  )
}

export default ViewNoteModal