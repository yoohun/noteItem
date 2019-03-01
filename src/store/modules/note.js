import Note from '../../api/note'
import { rejects } from 'assert';

const state={
  notes: null,
  curNoteId: null
}

const getters={
  notes: state=> state.notes || [],
  curNote: state => {
    if(!Array.isArray(state.notes)) return {}
    if (!state.curNoteId) return state.notes[0] || {}
    return state.notes.find(notes => notes.id == state.curNoteId) || {}
  }
}

const mutations={
  getNote(state, payload) {
    state.notes = payload.notes
  },
  addNote(state, payload) {
    state.notes.unshift(payload.notes)
  },
  updateNnote (state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  },
  deleteNote (state,payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  },
  setCurNote(state,payload) {
    state.curNoteId = payload.curNoteId
  }
}


const actions={
  getnotes({commit}, {notebookId}) {
    return Note.getnotes({ notebookId }).then(res => {
      commit('getNote', { notes: res.data})
      commit('setCurNote', { curNoteId: res.data[0].id})
    })
  },
  addNote({ commit }, {notebookId}) {
    return Note.addnote({notebookId}).then(res=>{
      console.log('success:',res);
      commit('addNote', { notes:res.data})
    })
  },
  updateNote({ commit }, { noteId, title, content }) {
    return Note.updatenote({ noteId, title, content }).then(res=>{
      commit('updateNnote', { noteId, title, content })
    })
  },
  deleteNote({commit}, {noteId}) {
    return Note.delnote({noteId}).then(res=>{
      commit('deleteNote',{noteId:noteId})
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}