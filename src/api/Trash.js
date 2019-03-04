import request from '../utils/request'

const URL={
  GETDELNOTES: '/notes/trash',
  RECOVERY: '/notes/:noteId/revert',
  DEEPDELETE: '/notes/:noteId/confirm',
}

export default {
  getDelnotes () {
    return request(URL.GETDELNOTES)
  },
  recoveryNote({ noteId}) {
    return request(URL.RECOVERY.replace(':noteId', noteId),'PATCH')
  },
  deepDelNote({ noteId }) {
    return request(URL.DEEPDELETE.replace(':noteId', noteId),'DELETE')
  }
}