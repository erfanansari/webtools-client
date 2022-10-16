import type { NextPage } from 'next'
import Link from 'next/link'
import { apiClient } from '../apiClient'
import Layout from '../components/Layout'

interface Props {
    space: Space
}

const Slug: NextPage<Props> = ({ space }) => {
    return (
        <Layout title={space.title}>
            <Link href="/">
                <h1 style={{ color: 'red', cursor: 'pointer' }}>Spaces</h1>
            </Link>
            <h2 className="">slug: {space.slug}</h2>
            <ul>
                {space.tools.map((tool: Tool) => (
                    <div key={tool.slug}>
                        <li>name: {tool.name}</li>
                        <li>description: {tool.description}</li>
                        <li>link: {tool.link}</li>
                        <li>createAt: {tool.createAt}</li>
                        <br />
                    </div>
                ))}
            </ul>
        </Layout>
    )
}

export async function getStaticPaths() {
    const { data: spaces } = await apiClient.get<Space[]>('/spaces')

    const paths = spaces.map((space) => ({
        params: { slug: space.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { data: space } = await apiClient.get<Space>(`/spaces/${params.slug}`)

    return {
        props: {
            space,
        },
    }
}

export default Slug
