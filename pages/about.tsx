import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const About: NextPage = () => {
    const { data, isLoading } = useQuery(['shoes'], () =>
        axios('http://localhost:8080/about').then((res) => res.data),
    )
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <h1>{JSON.stringify(data)}</h1>
            <Link href={'/'}>Home</Link>
        </>
    )
}

export default About
