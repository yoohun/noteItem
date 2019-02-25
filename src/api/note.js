import request from '../utils/request'

const URL = {
  GETNOTES: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  DELNOTE: '/notes/:noteId',
  UPDATENOTE: '/notes/:noteId'
}

export default {
  getnotes({ notebookId}){
    return request(URL.GETNOTE.replace(':notebookId', notebookId))
  },
  addnote({ notebookId },{title='',content=''}={title:'',content:''}){
    return request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
  },
  delnote({ noteId }) {
    return request(URL.DELNOTE.replace(':noteId', noteId), 'DELETE')
  },
  updatenote({ noteId, title, content }) {
    console.log('up');
    return request(URL.UPDATENOTE.replace(':noteId', noteId), 'PATCH', {title, content})
  }
}