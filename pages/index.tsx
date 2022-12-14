import type { NextPage } from 'next'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import type { ClientError } from '../apiClient'
import { apiClient } from '../apiClient'
import {
    IoBookmark,
    IoBookmarkOutline,
    IoChevronForward,
} from 'react-icons/io5'
import Layout from '../components/Layout'
import { formatDate } from '../utils/helpers/formateDate'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'

const limit = 3
interface Props {
    data: {
        toolsData: ToolsData
        tags: string[]
    }
}

const Home: NextPage<Props> = (props) => {
    const [tag, setTag] = useState('All')
    const [query, setQuery] = useState('')
    const noTag = tag === 'All'
    const noQuery = query === ''

    const [fade, setFade] = useState(false)

    const toolsQuery = useInfiniteQuery<ToolsData, ClientError>(
        ['tools', ...(noTag ? [] : [tag]), ...(noQuery ? [] : [query])],
        ({ pageParam = 1, signal }) =>
            apiClient({
                url: `/tools`,
                params: {
                    page: pageParam,
                    limit,
                    ...(noQuery ? {} : { query }),
                    ...(noTag ? {} : { tag }),
                },
                signal,
            }),
        {
            getNextPageParam: (lastPage) => lastPage.info.next ?? undefined,
            initialData: {
                pages: [props.data.toolsData],
                pageParams: [1],
            },
            refetchOnWindowFocus: false,
        },
    )

    const selectedButtonClasses = 'border-b-2 border-b-primary-main'

    const [bookmarked, setBookmarked] = useState(false)

    const bookmarkIconProps = {
        size: 25,
        className: `cursor-pointer mb-2 animate-bookmark`,
        onClick: () => setBookmarked(!bookmarked),
    }

    return (
        <Layout title="Web Tools" query={query} setQuery={setQuery}>
            <div className="mt-12 mb-6 text-[2.5rem] sm:mt-28 sm:mb-16 sm:text-6xl">
                {toolsQuery.isError ? (
                    <h1 className="font-bold capitalize text-red-500">
                        {toolsQuery.error.message}
                    </h1>
                ) : (
                    <h1 className="font-bold capitalize text-secondary-main">
                        {toolsQuery.isFetching ? (
                            'Updating'
                        ) : query ? (
                            <span
                                style={{
                                    textTransform: 'initial',
                                }}
                            >
                                Results for {query}
                            </span>
                        ) : (
                            `${tag} Tools`
                        )}
                    </h1>
                )}
            </div>
            {toolsQuery.isError ? null : (
                <>
                    <div className="tags flex h-12 max-w-full overflow-x-scroll">
                        {['All', ...props.data.tags].map((t) => (
                            <button
                                key={t}
                                className={`mx-3 min-w-fit text-[17px] text-neutral-dark transition-all hover:border-b-2 hover:border-b-primary-main ${
                                    t === tag ? selectedButtonClasses : ''
                                }`}
                                onClick={() => {
                                    console.log({ t })
                                    setFade(false)
                                    setTag(t)
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="row-span-5 mt-8 grid gap-8 pb-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
                        {toolsQuery.data?.pages.map((page) => (
                            <Fragment key={page.info.next}>
                                {page.tools.map((tool, i) => (
                                    <div
                                        key={tool.slug}
                                        className={[
                                            'w-full overflow-hidden rounded-2xl bg-white shadow-cart md:w-full',
                                            fade && page.info.prev
                                                ? 'animate-fade'
                                                : '',
                                        ].join(' ')}
                                        style={{
                                            WebkitBackfaceVisibility: 'hidden',
                                            MozBackfaceVisibility: 'hidden',
                                            WebkitTransform:
                                                'translate3d(0, 0, 0)',
                                            // @ts-ignore - this is a valid property
                                            MozTransform:
                                                'translate3d(0, 0, 0)',
                                        }}
                                    >
                                        <div className="relative h-[192px]">
                                            <Image
                                                loader={({ src }) => src}
                                                src={`https://picsum.photos/400/300?random=${i}`}
                                                alt={tool.name}
                                                className="transition duration-300 hover:scale-125"
                                                layout="fill"
                                                unoptimized
                                                priority
                                            />
                                        </div>
                                        <div className="px-6">
                                            <div className="flex items-center justify-between text-secondary-main opacity-[.4]">
                                                <p className="mt-4 mb-6">
                                                    {formatDate(tool.createdAt)}
                                                </p>
                                                {bookmarked ? (
                                                    <IoBookmark
                                                        {...bookmarkIconProps}
                                                    />
                                                ) : (
                                                    <IoBookmarkOutline
                                                        {...bookmarkIconProps}
                                                    />
                                                )}
                                            </div>
                                            <h2
                                                id={tool.slug}
                                                className="mb-6 text-2xl font-semibold transition-colors"
                                                style={{
                                                    scrollMarginTop: '700px',
                                                }}
                                            >
                                                {/* <a href={`#${tool.slug}`}> */}
                                                <Link href={tool.slug}>
                                                    {tool.name}
                                                </Link>
                                            </h2>
                                            <p className="mb-4 max-h-[70px] min-h-[70px] overflow-hidden text-ellipsis whitespace-pre-wrap text-secondary-main">
                                                {tool.description}
                                            </p>
                                            <a
                                                href={tool.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-primary mb-6 flex max-w-fit items-center"
                                            >
                                                Learn more
                                                <IoChevronForward
                                                    size={18}
                                                    className="ml-2"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </div>
                    {toolsQuery.hasNextPage && (
                        <button
                            onClick={() => {
                                toolsQuery.fetchNextPage()
                                setFade(true)
                            }}
                            className="btn-secondary mx-auto mb-8 mt-8 flex"
                        >
                            {toolsQuery.isFetching ? 'Fetching' : 'More'}
                        </button>
                    )}
                </>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const [tags, toolsData] = await Promise.all([
        apiClient<string[]>({
            url: '/tags',
        }),
        apiClient<ToolsData>({
            url: '/tools',
            params: {
                limit,
            },
        }),
    ]).catch((err) => {
        console.error('server side', err)

        return [[], { tools: [], info: {} }]
    })

    return {
        props: {
            data: {
                tags,
                toolsData,
            },
        },
    }
}

export default Home
