import { useMutation, useQuery } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useState } from 'react'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import type { ClientError } from '../apiClient'
import { apiClient } from '../apiClient'
import Layout from '../components/Layout'

const Admin: NextPage = () => {
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')

    const { data: tags } = useQuery(
        ['tags'],
        () =>
            apiClient<string[]>({
                url: '/tags',
            }),
        {
            onSuccess: (d) => {
                if (d[0]) setTag(d[0])
            },
            refetchOnWindowFocus: false,
        },
    )

    const toolQuery = useQuery<Tool, ClientError>(
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
            enabled: false,
        },
    )

    const slug = slugify(toolQuery.data ? toolQuery.data.name : name, {
        lower: true,
    })

    const createMutation = useMutation(
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
        },
    )

    const updateMutation = useMutation(
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
        },
    )

    const deleteMutation = useMutation(
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
                        onClick={() => createMutation.mutate()}
                    >
                        {createMutation.isLoading
                            ? 'Creating...'
                            : 'Create Tool'}
                    </button>
                    <button
                        disabled={!name}
                        className="btn-secondary text-lg py-0 px-4 h-9 mt-3 flex-1 mx-4"
                        onClick={() => toolQuery.refetch()}
                        type="button"
                    >
                        {toolQuery.isFetching ? 'Finding...' : 'Find Tool'}
                    </button>
                    <button
                        disabled={!toolQuery.data || disabled}
                        className="btn-primary h-9 mt-3 flex-1 mx-4"
                        onClick={() => updateMutation.mutate()}
                        type="button"
                    >
                        {updateMutation.isLoading ? 'Updating' : 'Update Tool'}
                    </button>
                    <button
                        disabled={!toolQuery.data || !name}
                        className="btn-primary bg-red-600 h-9 mt-3 flex-1 ml-4"
                        onClick={() => deleteMutation.mutate()}
                        type="button"
                    >
                        {deleteMutation.isLoading ? 'Deleting' : 'Delete Tool'}
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default Admin
