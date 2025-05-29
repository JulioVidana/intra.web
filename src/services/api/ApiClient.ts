import axios from 'axios'
import { Config } from "@/common/config"
import { toast } from "sonner"





axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

class ApiClient {

  constructor(private defaultBaseUrl: string = Config.API_URL_INTRANET) { }

  getInstance = (baseUrl?: string, isMedia?: boolean) => {

    const headers: any = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    }

    if (isMedia) {
      headers['Content-Type'] = 'multipart/form-data'
    }

    const instance = axios.create({
      baseURL: baseUrl || this.defaultBaseUrl,
      headers: headers,
      withCredentials: true
    })

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {

          const isTokenExpired = error.response.data?.message?.includes('expired') ||
            error.response.data?.error?.includes('expired') ||
            error.response.data?.code === 'token_expired';

          if (isTokenExpired) {



            if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
              window.location.href = '/auth/login'
            }
          } else {

            console.error('Authentication error:', error.response.data)

           toast.error('No se tienen permisos para esta pagina')
          }
        }
        return Promise.reject(error)
      }
    )

    return instance
  }
}

const apiClientInstance = new ApiClient();
export default apiClientInstance;
