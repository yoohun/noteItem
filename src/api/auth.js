import request from '../utils/request'

const URL = {
  REGISTER:'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth',
  GETNOTE:'/notebooks',
  NEWNOTE:'/notebooks',
  DELNOTEBOOK: '/notebooks/:notebookId',
  NOTES:'/notes/from/:notebookId',
  DELNOTE: '/notes/:noteId'
}

export default {
  register({username,password}) {
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}) {
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo(){
    return request(URL.GET_INFO)
  },
  note () {
    return request(URL.GETNOTE)
  },
  newnote({title=''} = {title:''}) {
    return request(URL.NEWNOTE, 'POST', {title})
  },
  delnote({ notebookId}) {
    return request(URL.DELNOTEBOOK.replace(':notebookId', notebookId), 'DELETE')
  },
  notes({notebookId}) {
    return request(URL.NOTES.replace(':notebookId', notebookId), 'GET')
  },
  delnotein({noteId}) {
    return request(URL.DELNOTE.replace(':noteId', noteId), 'DELETE')
  }
}