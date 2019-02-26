import request from '../utils/request'

const URL = {
  Notebooks: '/notebooks',
  EditNotebook: '/notebooks/:notebookId'
}

export default {
  Notebooks() {
    return request(URL.Notebooks, 'POST', { title, content })
  },
  editNotebook({notebookId,title}) {
    console.log(123321);
    return request(URL.EditNotebook.replace(':notebookId', notebookId),'PATCH',{title})
  }
}