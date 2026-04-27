import React, { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TagFilter from './components/TagFilter'
import NoteCard from './components/NoteCard'
import NoteModal from './components/NoteModal'
import ViewNoteModal from './components/ViewNoteModal'
import EmptyState from './components/EmptyState'

const App = () => {
  const [notes, setNotes] = useLocalStorage()
  const [activeTab, setActiveTab] = useState('notes')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [viewingNote, setViewingNote] = useState(null)

  // CRUD Operations
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      title: noteData.title,
      description: noteData.description,
      tags: noteData.tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t),
      isPinned: false,
      isArchived: false,
      isTrashed: false,
      createdAt: Date.now()
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
  }

  const updateNote = (id, updates) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, ...updates } : note))
  }

  const deletePermanently = (id) => {
    if (confirm('Permanently delete this note? This action cannot be undone!')) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    }
  }

  const togglePin = (id) => {
    setNotes(prevNotes => {
      const note = prevNotes.find(n => n.id === id)
      if (note && !note.isTrashed && !note.isArchived) {
        return prevNotes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n)
      }
      return prevNotes
    })
  }

  const toggleArchive = (id) => {
    setNotes(prevNotes => {
      const note = prevNotes.find(n => n.id === id)
      if (note && !note.isTrashed) {
        return prevNotes.map(n => n.id === id ? { ...n, isArchived: !n.isArchived, isPinned: false } : n)
      }
      return prevNotes
    })
  }

  const moveToTrash = (id) => {
    if (confirm('Move this note to trash?')) {
      setNotes(prevNotes => prevNotes.map(note => 
        note.id === id ? { ...note, isTrashed: true, isPinned: false, isArchived: false } : note
      ))
    }
  }

  const restoreFromTrash = (id) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === id ? { ...note, isTrashed: false } : note
    ))
  }

  const handleSave = (formData) => {
    if (editingNote) {
      updateNote(editingNote.id, {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t)
      })
    } else {
      addNote(formData)
    }
    setEditingNote(null)
  }

  // Filtering Logic
  const getFilteredNotes = () => {
    let filtered = notes.filter(note => {
      if (activeTab === 'notes') return !note.isTrashed && !note.isArchived
      if (activeTab === 'archived') return !note.isTrashed && note.isArchived
      if (activeTab === 'trash') return note.isTrashed
      return true
    })

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.description.toLowerCase().includes(query)
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(note => note.tags.includes(selectedTag))
    }

    if (activeTab === 'notes') {
      filtered = filtered.sort((a, b) => {
        if (a.isPinned === b.isPinned) return b.createdAt - a.createdAt
        return a.isPinned ? -1 : 1
      })
    } else {
      filtered = filtered.sort((a, b) => b.createdAt - a.createdAt)
    }

    return filtered
  }

  const getAllTags = () => {
    const tags = new Set()
    notes.forEach(note => {
      if (!note.isTrashed) {
        note.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }

  const filteredNotes = getFilteredNotes()
  const allTags = getAllTags()
  const notesCount = notes.filter(n => !n.isTrashed && !n.isArchived).length
  const archivedCount = notes.filter(n => !n.isTrashed && n.isArchived).length
  const trashCount = notes.filter(n => n.isTrashed).length
  const hasActiveFilters = searchQuery || selectedTag

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-ping"></div>
      </div>

      <Header 
        onNewNote={() => {
          setEditingNote(null)
          setIsModalOpen(true)
        }}
        notesCount={notesCount}
        archivedCount={archivedCount}
        trashCount={trashCount}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab)
          setSelectedTag('')
          setSearchQuery('')
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-0">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <TagFilter allTags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

        {hasActiveFilters && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-300">Active filters:</span>
            {searchQuery && (
              <span className="bg-red-900/50 text-red-200 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm border border-red-500/30">
                <i className="fas fa-search"></i> "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-400">
                  <i className="fas fa-times-circle"></i>
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="bg-gray-800/50 text-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm border border-gray-500/30">
                <i className="fas fa-tag"></i> #{selectedTag}
                <button onClick={() => setSelectedTag('')} className="hover:text-gray-400">
                  <i className="fas fa-times-circle"></i>
                </button>
              </span>
            )}
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <EmptyState activeTab={activeTab} searchQuery={searchQuery} selectedTag={selectedTag} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                activeTab={activeTab}
                onView={setViewingNote}
                onEdit={(note) => {
                  setEditingNote(note)
                  setIsModalOpen(true)
                }}
                onPin={togglePin}
                onArchive={toggleArchive}
                onTrash={moveToTrash}
                onRestore={restoreFromTrash}
                onDelete={deletePermanently}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingNote(null)
        }}
        onSave={handleSave}
        editingNote={editingNote}
      />

      <ViewNoteModal
        note={viewingNote}
        onClose={() => setViewingNote(null)}
        onEdit={(note) => {
          setEditingNote(note)
          setIsModalOpen(true)
        }}
      />
    </div>
  )
}

export default App