import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { apiClient } from '../apiClient'
import Layout from '../components/Layout'

interface Props {
    spaces: Space[]
}

const Home: NextPage<Props> = ({ spaces }) => {
    // const openGoogle = () => {
    //     window.open('http://localhost:8080/api/auth/github', '_self')
    // }

    // const { data, isLoading, error, isError } = useQuery(
    //     ['user'],
    //     () =>
    //         axios('http://localhost:8080/api/auth/success', {
    //             headers: {
    //                 // 'Access-Control-Allow-Origin': '*',
    //                 // 'Access-Control-Allow-Methods':
    //                 // 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true,
    //         }).then((res) => res.data),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //     },
    // )

    // if (isLoading) return <div>Loading...</div>

    return (
        <Layout title="All Spaces">
            <div className="text-6xl mt-28">
                <h1 className="font-bold text-secondary-main">All Spaces</h1>
            </div>
            {/* {spaces.map((space) => (
                    <div
                        style={{
                            width: '300px',
                            height: '300px',
                            backgroundColor: 'lightcoral',
                            margin: '10px',
                        }}
                        key={space.slug}
                    >
                        <Link href={`/${encodeURIComponent(space.slug)}`}>
                            <a
                                style={{
                                    color: 'blue',
                                    fontSize: '22px',
                                    margin: '50px',
                                }}
                            >
                                {space.title}
                            </a>
                        </Link>
                        <Image
                            loader={({ src }) => src}
                            src="https://picsum.photos/200/300/"
                            alt={space.title}
                            width={300}
                            height={300}
                        />
                    </div>
                ))} */}
        </Layout>
    )
}

export async function getStaticProps() {
    const { data: spaces } = await apiClient.get<Space[]>('/spaces')

    return {
        props: {
            spaces,
        },
    }
}

export default Home
