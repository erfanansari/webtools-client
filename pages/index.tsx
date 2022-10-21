import type { NextPage } from 'next'
import Image from 'next/image'
import { Fragment, useState } from 'react'
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
    // const openGoogle = () => {
    //     window.open(
    //         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/github`,
    //         '_self',
    //     )
    // }

    const [tag, setTag] = useState('All')
    const [query, setQuery] = useState('')
    const noTag = tag === 'All'
    const noQuery = query === ''

    const [fade, setFade] = useState(false)

    const { data, fetchNextPage, hasNextPage, isFetching, error, isError } =
        useInfiniteQuery(
            ['tools', ...(noTag ? [] : [tag]), ...(noQuery ? [] : [query])],
            ({ pageParam = 1, signal }) =>
                apiClient<ToolsData>({
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
                onError: (err: any) => console.log(err),
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
            <div className="text-[2.5rem] sm:text-6xl mt-12 sm:mt-28 mb-6 sm:mb-16">
                {isError ? (
                    <h1 className="font-bold capitalize text-red-500">
                        {error?.response?.data?.msg || error?.message}
                    </h1>
                ) : (
                    <h1 className="font-bold capitalize text-secondary-main">
                        {isFetching ? (
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
            {isError ? null : (
                <>
                    <div className="flex h-12 max-w-full overflow-x-scroll tags">
                        {['All', ...props.data.tags].map((t) => (
                            <button
                                key={t}
                                className={`transition-all text-[17px] mx-3 min-w-fit text-neutral-dark hover:border-b-primary-main hover:border-b-2 ${
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
                    <div className="grid row-span-5 gap-8 pb-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14">
                        {data?.pages.map((page) => (
                            <Fragment key={page.info.next}>
                                {page.tools.map((tool, i) => (
                                    <div
                                        key={tool.slug}
                                        className={[
                                            'w-full overflow-hidden bg-white rounded-2xl md:w-full shadow-cart',
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
                                                className="mb-6 text-2xl font-semibold capitalize transition-colors"
                                                style={{
                                                    scrollMarginTop: '700px',
                                                }}
                                            >
                                                {/* <a href={`#${tool.slug}`}> */}
                                                <Link href={tool.slug}>
                                                    {tool.name}
                                                </Link>
                                            </h2>
                                            <p className="min-h-[70px] max-h-[70px] text-secondary-main text-ellipsis overflow-hidden whitespace-pre-wrap mb-4">
                                                {tool.description}
                                            </p>
                                            <a
                                                href={tool.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center mb-6 max-w-fit btn-primary"
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
                    {hasNextPage && (
                        <button
                            onClick={() => {
                                fetchNextPage()
                                setFade(true)
                            }}
                            className="mb-8 flex mx-auto btn-secondary mt-8"
                        >
                            {isFetching ? 'Fetching' : 'More'}
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
    ])

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
