import axios from 'axios'
import Store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
      Authorization: 'Bearer ' + Store.state.token
    }
  })
}