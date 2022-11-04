import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogoGithub } from 'react-icons/io5'
import { baseURL } from '../apiClient'
import { useScrollDir } from '../utils/hooks/useScrollDir'

const linkClasses =
    'text-neutral-light border-transparent border-t-2 transition-all border-b-2 pb-[6px] hover:border-b-primary-main'

interface Props {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<Props> = ({ query, setQuery }) => {
    const router = useRouter()
    const queryClient = useQueryClient().getQueryData(['user'])
    console.log(queryClient)
    const isAdmin = (queryClient as User)?.role === 'admin'

    const { data, isLoading } = useQuery(
        ['user'],
        () =>
            axios
                .get<User>(`${baseURL.replace('/api', '')}/oauth/user`, {
                    withCredentials: true,
                })
                .then((res) => res.data),
        {
            onError: (err: any) => {
                console.log(err)
            },
        },
    )

    const { scrollDir } = useScrollDir()

    const inputProps = {
        value: query,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value),
        placeholder: 'Search Tools...',
        type: 'search',
        className:
            'rounded-full border outline-none ml-2 md:ml-8 text-secondary-dark px-4',
    }

    const path = `${baseURL.replace('/api', '')}/oauth/authorize`

    const login = () => {
        window.open(path, '_self')
    }

    return (
        <header
            className={`
            ${
                scrollDir === 'scrolling down'
                    ? '-translate-y-full'
                    : 'translate-y-0'
            }
            fixed top-0 z-10 w-full text-white transition-transform duration-300 bg-secondary-main`}
        >
            <div className="flex items-center justify-between h-20 md:h-24 custom-container">
                <Link href="/" className="text-black">
                    <div className="flex items-center cursor-pointer">
                        <Image
                            className="mt-[1px]"
                            src="/white-gear.png"
                            width={40}
                            height={30}
                            alt="logo"
                        />
                        <h1 className="ml-2 text-3xl font-bold">WebTools</h1>
                    </div>
                </Link>
                {router.pathname === '/' && (
                    <input
                        {...inputProps}
                        className={[
                            inputProps.className,
                            'hidden 2md:block py-[.25rem] md:w-36 lg:w-52',
                        ].join(' ')}
                    />
                )}
                <div className="ml-auto flex mt-[6px]">
                    {isAdmin && (
                        <Link href="/admin">
                            <a
                                className={`hidden sm:mr-4 lg:mr-8 2md:block ${linkClasses} ${
                                    router.pathname === '/admin'
                                        ? 'border-b-primary-main'
                                        : ''
                                }`}
                            >
                                Admin
                            </a>
                        </Link>
                    )}
                    <Link href="/bookmarks">
                        <a
                            className={`hidden sm:mr-4 lg:mr-8 2md:block ${linkClasses} ${
                                router.pathname === '/bookmarks'
                                    ? 'border-b-primary-main'
                                    : ''
                            }`}
                        >
                            Bookmarks
                        </a>
                    </Link>
                </div>
                <div className="min-w-[150px] sm:min-w-[200px]">
                    {isLoading ? (
                        <p className="text-center">Loading...</p>
                    ) : data ? (
                        <div>
                            <div className="flex items-center justify-center">
                                <h1 className="mr-4 cursor-default">
                                    {data?.name}
                                </h1>
                                <Image
                                    className="rounded-full"
                                    src={data?.avatar || ''}
                                    width={40}
                                    height={40}
                                    alt="profile"
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="flex items-center btn-primary mx-auto"
                        >
                            <p>Login</p>
                            <p className="hidden sm:block">&nbsp;via GitHub</p>
                            <IoLogoGithub className="ml-2" size={25} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex justify-between pb-4 mx-6 2md:hidden">
                <div className="mt-[3px]">
                    <Link href="/bookmarks">
                        <a
                            className={`${linkClasses} mr-1 md:mr-8 ${
                                router.pathname === '/bookmarks'
                                    ? 'border-b-primary-main'
                                    : ''
                            }`}
                        >
                            Bookmarks
                        </a>
                    </Link>
                    {isAdmin && (
                        <Link href="/admin">
                            <a
                                className={`${linkClasses} ml-2 ${
                                    router.pathname === '/admin'
                                        ? 'border-b-primary-main'
                                        : ''
                                }`}
                            >
                                Admin
                            </a>
                        </Link>
                    )}
                </div>
                {router.pathname === '/' && (
                    <input
                        {...inputProps}
                        className={[
                            inputProps.className,
                            'py-[.25rem] w-40 sm:w-52',
                        ].join(' ')}
                    />
                )}
            </div>
        </header>
    )
}

export default Header
