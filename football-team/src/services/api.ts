import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://https://reqres.in/api/'
})

export default instance
