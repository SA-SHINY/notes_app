import React, { useState, useEffect } from 'react'

const NoteModal = ({ isOpen, onClose, onSave, editingNote }) => {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' })

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        description: editingNote.description,
        tags: editingNote.tags.join(', ')
      })
    } else {
      setFormData({ title: '', description: '', tags: '' })
    }
  }, [editingNote, isOpen])

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-lg w-full shadow-2xl border border-red-500/30 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-t-2xl px-5 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {editingNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title </label>
            <input 
              type="text" 
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-white placeholder-gray-500" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="Enter note title..."
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea 
              rows="4" 
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-500 outline-none text-white placeholder-gray-500" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder="Write your note content here..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500" 
              value={formData.tags} 
              onChange={e => setFormData({...formData, tags: e.target.value})} 
              placeholder="react, project, idea"
            />
            <p className="text-xs text-gray-500 mt-2">Tip: Add tags to easily filter your notes</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-900/50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 text-gray-400 hover:bg-gray-800 rounded-xl transition">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-xl shadow-md transition transform hover:scale-105">
            {editingNote ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal