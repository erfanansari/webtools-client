import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const FourOFour: NextPage = () => {
    return (
        <Layout title="This page does not exist">
            <h1
                className="font-bold text-3xl max-w-[80%] mx-auto md:text-[2.5rem] mt-20 md:mt-28 text-center capitalize text-neutral-dark"
                style={{
                    lineHeight: '1.5',
                }}
            >
                Oops! Looks like you got lost
                <br />
                Click here to go back to the homepage
            </h1>
            <Link href="/">
                <button className="btn-secondary mt-10 mx-auto block">
                    Go Back
                </button>
            </Link>
        </Layout>
    )
}

export default FourOFour
