const STORAGE_KEY = 'notewise_app_data'

export const loadNotes = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch(e) {
      console.error('Error loading notes:', e)
      return getDefaultNotes()
    }
  }
  return getDefaultNotes()
}

export const saveNotes = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export const getDefaultNotes = () => {
  return [
    { id: '1', title: 'Welcome to Notewise', description: 'Experience the beauty of note-taking! Pin important notes, archive old ones, and organize with colorful tags.', tags: ['welcome', 'feature', 'getting-started'], isPinned: true, isArchived: false, isTrashed: false, createdAt: Date.now() },
    { id: '2', title: 'Pro Tip', description: 'Try adding tags to your notes! Scroll through the tags bar to see all your tags.', tags: ['tip', 'productivity', 'organization'], isPinned: false, isArchived: false, isTrashed: false, createdAt: Date.now() - 86400000 },
    { id: '3', title: 'Get Started', description: 'Click the "New Note" button to create your first note. Add multiple tags to organize better!', tags: ['getting-started', 'tutorial'], isPinned: false, isArchived: false, isTrashed: false, createdAt: Date.now() - 172800000 }
  ]
}
