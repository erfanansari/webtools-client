import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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
    // .catch((error: unknown) => {
    //     if (isServerError(error)) {
    //         throw error
    //     }

    //     if (axios.isAxiosError(error)) {
    //         throw error
    //     }
    // })

    // @ts-ignore - it does exist
    promise.cancel = () => {
        source.cancel('Query was cancelled')
    }

    return promise
}
