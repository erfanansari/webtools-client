import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isClientError } from '../apiClient'

const onError = (error: unknown) => {
    if (isClientError(error)) {
        toast.error(error.message)
        console.error('error', error)
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            onError,
        },
    },
    queryCache: new QueryCache({
        // https://tkdodo.eu/blog/react-query-error-handling
        // https://tkdodo.eu/blog/react-query-and-type-script
        onError,
    }),
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer position="bottom-right" autoClose={3000} />
        </QueryClientProvider>
    )
}

export default MyApp
