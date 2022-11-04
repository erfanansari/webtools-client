import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import { apiClient } from '../apiClient'
import Layout from '../components/Layout'
import { useErrorHandler } from '../utils/hooks/useErrorHandler'

function Admin() {
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')

    const handleError = useErrorHandler(toast.error)

    const { data: tags } = useQuery(
        ['tags'],
        () =>
            apiClient<string[]>({
                url: '/tags',
            }),
        {
            onSuccess: (d) => {
                setTag(d[0])
            },
        },
    )

    const {
        data: tool,
        refetch,
        isFetching: isFinding,
    } = useQuery(
        ['tool'],
        () =>
            apiClient<Tool>({
                url: `/tools/${slugify(name, { lower: true })}`,
            }),
        {
            onSuccess: (d) => {
                console.log('d', d)

                if (d) {
                    setName(d?.name)
                    setTag(d?.tag)
                    setDescription(d?.description)
                    setUrl(d?.url)
                }

                toast.success('Tool found!')
            },
            onError: handleError,
            enabled: false,
        },
    )

    const slug = slugify(tool ? tool.name : name, { lower: true })

    const { mutate: createTool, isLoading: isCreating } = useMutation(
        () =>
            apiClient<Tool>({
                url: '/tools',
                method: 'POST',
                data: {
                    name,
                    tag,
                    description,
                    url,
                },
            }),
        {
            onSuccess: () => {
                toast.success('Tool created!')
            },
            onError: handleError,
        },
    )

    const { mutate: updateTool, isLoading: isUpdating } = useMutation(
        () =>
            apiClient<Tool>({
                url: `/tools/${slug}`,
                method: 'PUT',
                data: {
                    name,
                    tag,
                    description,
                    url,
                },
            }),
        {
            onSuccess: () => {
                toast.success('Tool updated!')
            },
            onError: handleError,
        },
    )

    const { mutate: deleteTool, isLoading: isDeleting } = useMutation(
        () =>
            apiClient<Tool>({
                url: `/tools/${slug}`,
                method: 'DELETE',
            }),
        {
            onSuccess: () => {
                setName('')
                if (tags?.[0]) setTag(tags[0])
                setDescription('')
                setUrl('')
                toast.success('Tool deleted!')
            },
            onError: handleError,
        },
    )

    const className = 'border-2 rounded-full border-neutral-dark my-3 px-4 py-1'

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const disabled = !name || !tag || !description || !url

    return (
        <Layout title="Admin">
            <form className="flex flex-col mt-28" onSubmit={onSubmit}>
                <h2 className="text-3xl font-medium mb-3">CRUD Tool</h2>
                <input
                    className={className}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className={className}
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className={className}
                    type="url"
                    name="url"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <select
                    name="tag"
                    className={className}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                >
                    {tags?.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <div className="flex">
                    <button
                        disabled={disabled}
                        className="btn-primary h-9 mt-3 flex-1 mr-4"
                        type="button"
                        onClick={() => createTool()}
                    >
                        {isCreating ? 'Creating...' : 'Create Tool'}
                    </button>
                    <button
                        disabled={!name}
                        className="btn-secondary text-lg py-0 px-4 h-9 mt-3 flex-1 mx-4"
                        onClick={() => refetch()}
                        type="button"
                    >
                        {isFinding ? 'Finding...' : 'Find Tool'}
                    </button>
                    <button
                        disabled={!tool || disabled}
                        className="btn-primary h-9 mt-3 flex-1 mx-4"
                        onClick={() => updateTool()}
                        type="button"
                    >
                        {isUpdating ? 'Updating' : 'Update Tool'}
                    </button>
                    <button
                        disabled={!tool || !name}
                        className="btn-primary bg-red-600 h-9 mt-3 flex-1 ml-4"
                        onClick={() => deleteTool()}
                        type="button"
                    >
                        {isDeleting ? 'Deleting' : 'Delete Tool'}
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default Admin
