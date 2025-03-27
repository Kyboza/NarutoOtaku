import axios from 'axios'

const axiosAPI = axios.create({
  baseURL: 'https://johanclifford.com',
  withCredentials: true,
})

export default axiosAPI
