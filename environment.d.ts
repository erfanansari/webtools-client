declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_ENDPOINT: string
        NODE_ENV: 'development' | 'production' | 'test'
    }
}
