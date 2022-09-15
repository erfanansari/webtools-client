import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
    const { data, isLoading } = useQuery(['shoes'], () =>
        axios('http://localhost:8080').then((res) => res.data),
    )
    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <h1>{data.message}</h1>
            <Link href="/about">About</Link>
            <br />
            <Link href="/reservation">Reservation</Link>
        </div>
    )
}

export default Home
