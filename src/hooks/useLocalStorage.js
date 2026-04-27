import { useState, useEffect } from 'react'
import { loadNotes, saveNotes } from '../utils/storage'

export const useLocalStorage = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(loadNotes())
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes)
    }
  }, [notes])

  return [notes, setNotes]
}