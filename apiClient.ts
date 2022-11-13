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

export interface ServerError {
    response: {
        data: {
            msg: string
        }
        status: number
    }
}

export function isServerError(err: unknown): err is ServerError {
    return (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ServerError).response === 'object' &&
        (err as ServerError).response !== null &&
        'data' in (err as ServerError).response &&
        typeof (err as ServerError).response.data === 'object' &&
        (err as ServerError).response.data !== null &&
        'msg' in (err as ServerError).response.data &&
        typeof (err as ServerError).response.data.msg === 'string'
    )
}

export interface ClientError {
    status: number | undefined
    message: string
}

export function isClientError(err: unknown): err is ClientError {
    return (
        typeof err === 'object' &&
        err !== null &&
        'status' in err &&
        (typeof (err as ClientError).status === 'number' ||
            typeof (err as ClientError).status === 'undefined') &&
        'message' in err &&
        typeof (err as ClientError).message === 'string'
    )
}

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
    })
        .then(({ data }) => data)
        .catch((error: unknown) => {
            const clientError: ClientError = {
                status: undefined,
                message: 'Something went wrong',
            }

            if (isServerError(error)) {
                clientError.status = error.response?.status
                clientError.message = error.response?.data.msg
            } else if (axios.isAxiosError(error)) {
                clientError.status = error.response?.status
                clientError.message = error.message
            }

            throw clientError
        })

    // @ts-ignore - it does exist
    promise.cancel = () => {
        source.cancel('Query was cancelled')
    }

    return promise
}
