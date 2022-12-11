import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const FourOFour: NextPage = () => {
    return (
        <Layout title="This page does not exist">
            <h1
                className="mx-auto mt-20 max-w-[80%] text-center text-3xl font-bold capitalize text-neutral-dark md:mt-28 md:text-[2.5rem]"
                style={{
                    lineHeight: '1.5',
                }}
            >
                Oops! Looks like you got lost
                <br />
                Click here to go back to the homepage
            </h1>
            <Link href="/">
                <button className="btn-secondary mx-auto mt-10 block">
                    Go Back
                </button>
            </Link>
        </Layout>
    )
}

export default FourOFour
