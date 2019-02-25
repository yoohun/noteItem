import request from '../utils/request'

const URL = {
  Notebooks: '/notebooks'
}

export default {
  Notebooks() {
    return request(URL.Notebooks, 'POST', { title, content })
  }
}