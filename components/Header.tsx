import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogoGithub } from 'react-icons/io5'
import { useScrollDir } from '../utils/hooks/useScrollDir'

const linkClasses =
    'text-neutral-light border-transparent border-t-2 transition-all border-b-2 pb-[6px] hover:border-b-primary-main'

interface Props {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<Props> = ({ query, setQuery }) => {
    const router = useRouter()

    const { scrollDir } = useScrollDir()

    const inputProps = {
        value: query,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value),
        placeholder: 'Search Tools...',
        type: 'search',
        className:
            'rounded-full border outline-none ml-8 text-secondary-dark px-4',
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
                        <h1 className="ml-2 text-3xl font-bold">Web Tools</h1>
                    </div>
                </Link>
                <input
                    {...inputProps}
                    className={[
                        inputProps.className,
                        'hidden md:block py-[.25rem] md:w-36 lg:w-52',
                    ].join(' ')}
                />
                <Link href="/bookmarks">
                    <a
                        className={`hidden ml-auto md:mr-6 lg:mr-12 md:block mt-[6px] ${linkClasses} ${
                            router.pathname === '/bookmarks'
                                ? 'border-b-primary-main'
                                : ''
                        }`}
                    >
                        Bookmarks
                    </a>
                </Link>
                <button className="flex items-center btn-primary">
                    <p>Login</p>
                    <p className="hidden md:block">&nbsp;via GitHub</p>
                    <IoLogoGithub className="ml-2" size={25} />
                </button>
            </div>
            <div className="flex justify-between pb-4 mx-6 md:hidden">
                <Link href="/bookmarks">
                    <a
                        className={`${linkClasses} ${
                            router.pathname === '/bookmarks'
                                ? 'border-b-primary-main'
                                : ''
                        }`}
                    >
                        Bookmarks
                    </a>
                </Link>
                <input
                    {...inputProps}
                    className={[inputProps.className, 'py-[.25rem] w-52'].join(
                        ' ',
                    )}
                />
            </div>
        </header>
    )
}

export default Header
