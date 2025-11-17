import axios, { type AxiosResponse } from 'axios'
import type ApiEndpoints from './apiEndpoints'
import type { Product } from '@/types/products'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
})

const useApi = () => ({
  get: <K extends keyof ApiEndpoints>(url: K): Promise<AxiosResponse<ApiEndpoints[K]>> =>
    axiosInstance.get(url),
  post: <K extends keyof ApiEndpoints>(
    url: K,
    data?: Product,
  ): Promise<AxiosResponse<ApiEndpoints[K]>> => axiosInstance.post(url, data),
  patch: <K extends keyof ApiEndpoints>(
    url: K,
    data?: Product,
  ): Promise<AxiosResponse<ApiEndpoints[K]>> => axiosInstance.patch(url, data),
  delete: <K extends keyof ApiEndpoints>(url: K): Promise<AxiosResponse<ApiEndpoints[K]>> =>
    axiosInstance.delete(url),
})

export default useApi
