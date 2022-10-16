import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
})

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
