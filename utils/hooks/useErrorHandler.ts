import { toast } from 'react-toastify'

export function useErrorHandler() {
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
            toast.error(err.response.data.msg)
            // return err.response.data.msg
        } else if (
            typeof err === 'object' &&
            err !== null &&
            'message' in err &&
            typeof err.message === 'string'
        ) {
            toast.error(err.message)
            // return err.message
        }
    }
}
