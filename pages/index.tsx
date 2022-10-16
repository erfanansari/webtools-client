import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { apiClient } from '../apiClient'
import { IoChevronForward } from 'react-icons/io5'
import Layout from '../components/Layout'

interface Props {
    spaces: Space[]
}

const tags = [
    'All',
    'Developer Tools',
    'Design Tools',
    'Productivity',
    'Education',
    'News',
    'Auth',
    'Analytics',
]

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
    const [selected, setSelected] = useState('All')
    const selectedButtonClasses = 'border-b-2 border-b-primary-main'

    return (
        <Layout title="All Spaces">
            <div className="text-6xl mt-28">
                <h1 className="font-bold text-secondary-main">All Spaces</h1>
            </div>
            <div className="flex h-12 max-w-full mt-16 overflow-x-scroll tags">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`transition-all mx-3 min-w-fit text-lg text-neutral-dark hover:border-b-primary-main hover:border-b-2 ${
                            selected === tag ? selectedButtonClasses : ''
                        }`}
                        onClick={() => setSelected(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="grid justify-center row-span-5 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-14 pb-14">
                {spaces.map((space, i) => (
                    <div
                        key={space.slug}
                        className="w-[352px] h-[380px] md:w-full max-w-[352px] overflow-hidden bg-white rounded-lg shadow-cart"
                    >
                        <div className="relative h-[192px]">
                            <Image
                                loader={({ src }) => src}
                                src={`https://picsum.photos/200/300?random=${i}`}
                                alt={space.title}
                                className="transition duration-300 hover:scale-125"
                                layout="fill"
                            />
                        </div>
                        <div className="p-8">
                            <h2 className="text-3xl font-semibold capitalize transition-colors">
                                {space.title}
                            </h2>
                            <Link href={space.slug}>
                                <button className="flex items-center mt-10 btn-primary">
                                    See Tools
                                    <IoChevronForward
                                        size={18}
                                        className="ml-2"
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
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
