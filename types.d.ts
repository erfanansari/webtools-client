interface Space {
    title: string
    slug: string
    link: string
    createAt: string
    tools: Tool[]
}

interface Tool {
    name: string
    description: string
    slug: string
    link: string
    createAt: string
}
