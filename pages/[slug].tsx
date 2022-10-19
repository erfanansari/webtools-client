import type { NextPage } from 'next'
import Link from 'next/link'
import { apiClient } from '../apiClient'
import Layout from '../components/Layout'

interface Props {
    tool: Tool
}

const Slug: NextPage<Props> = ({ tool }) => {
    return (
        <Layout title={tool.name}>
            <Link href="/">
                <h1 style={{ color: 'red', cursor: 'pointer' }}>Spaces</h1>
            </Link>
            <h2 className="">name: {tool.name}</h2>
            <h2 className="">slug: {tool.slug}</h2>
        </Layout>
    )
}

export async function getStaticPaths() {
    const toolsData = await apiClient<ToolsData>({
        url: '/tools',
    })
    const tools = toolsData.tools

    const paths = tools.map((tool) => ({
        params: { slug: tool.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const tool = await apiClient<Tool>({
        url: `/tools/${params.slug}`,
    })

    return {
        props: {
            tool,
        },
    }
}

export default Slug
