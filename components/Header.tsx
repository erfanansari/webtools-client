import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogoGithub } from 'react-icons/io5'

const linkClasses =
    'text-neutral-light border-transparent border-t-2 transition-all border-b-2 pb-[6px] hover:border-b-primary-main'

const Header: React.FC = () => {
    const router = useRouter()

    return (
        <header className="text-white bg-secondary-main">
            <div className="flex items-center justify-between h-20 sm:h-24 custom-container">
                <div className="flex items-center cursor-pointer">
                    <Image
                        className="mt-[1px]"
                        src="/white-gear.png"
                        width={40}
                        height={30}
                        alt="logo"
                    />
                    <Link href="/" className="text-black">
                        <h1 className="ml-2 text-3xl font-bold">Web Tools</h1>
                    </Link>
                </div>
                <Link href="/bookmarks">
                    <a
                        className={`hidden ml-auto mr-12 sm:block mt-[6px] ${linkClasses} ${
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
            <div className="flex justify-between pb-4 mx-6 sm:hidden">
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
            </div>
        </header>
    )
}

export default Header
