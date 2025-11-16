import axios, { type AxiosResponse } from 'axios'
import type ApiEndpoints from './apiEndpoints'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
})

const useApi = () => ({
  get: <K extends keyof ApiEndpoints>(url: K): Promise<AxiosResponse<ApiEndpoints[K]>> =>
    axiosInstance.get(url),
})

export default useApi
