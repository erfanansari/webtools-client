interface Space {
    title: string
    slug: number
    link: string
    createAt: string
    tools: Tool[]
}

interface Tool {
    name: string
    description: string
    slug: number
    link: string
    createAt: string
}
