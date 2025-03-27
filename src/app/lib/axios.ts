import axios from 'axios'

const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export default axiosAPI
