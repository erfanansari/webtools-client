import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// add a second `options` argument here if you want to pass extra options to each generated query
export const apiClient = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = axios.CancelToken.source()

    const promise = axiosInstance({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data)

    // @ts-ignore - it does exist
    promise.cancel = () => {
        source.cancel('Query was cancelled')
    }

    return promise
}

// apiClient.interceptors.request.use((config) => {
//     const token = Cookies.get('token')
//     if (!token) return config

//     return {
//         ...config,
//         headers: {
//             ...config.headers,
//             Authorization: `Token ${token}`,
//         },
//     }
// })

// apiClient.interceptors.response.use(
//     (res) => res,
//     (err) => {
//         console.log(err.message)

//         if (err.response.status === 401) {
//             Cookies.remove('token')
//             window.location.href = '/auth/login'
//             console.log(err.response.data, '401')
//         }
//         return Promise.reject(err)
//     },
// )
