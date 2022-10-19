interface Tool {
    name: string
    description: string
    url: string
    slug: string
    createdAt: string
    tag: string
}

interface ToolsData {
    tools: Tool[]
    info: {
        count: number
        pages: number
        next: string
        prev: string
    }
}
