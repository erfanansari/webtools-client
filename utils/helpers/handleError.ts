import axios from 'axios'

export interface ServerError {
    response: {
        data: {
            msg: string
        }
    }
}

export function isServerError(err: unknown): err is ServerError {
    return (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof err.response === 'object' &&
        err.response !== null &&
        'data' in err.response &&
        typeof err.response.data === 'object' &&
        err.response.data !== null &&
        'msg' in err.response.data &&
        typeof err.response.data.msg === 'string'
    )
}

export function handleError(cb: (msg: string) => void) {
    return (err: unknown) => {
        if (isServerError(err)) {
            cb(err.response.data.msg)
        } else if (axios.isAxiosError(err)) {
            cb(err.message)
        }
    }
}
