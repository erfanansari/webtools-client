import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    // queryCache: new QueryCache({
    //     // https://tkdodo.eu/blog/react-query-error-handling
    //     // https://tkdodo.eu/blog/react-query-and-type-script
    //     onError: (err) => {
    //         console.error(err)
    //     },
    // }),
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
