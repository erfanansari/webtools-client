export function useErrorHandler(cb: (...args: any[]) => void) {
    return (err: unknown) => {
        if (
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
        ) {
            cb(err.response.data.msg)
        } else if (
            typeof err === 'object' &&
            err !== null &&
            'message' in err &&
            typeof err.message === 'string'
        ) {
            cb(err.message)
        }
    }
}
