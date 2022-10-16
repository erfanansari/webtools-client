import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

const Header = () => {
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
                    <a className="hidden ml-auto mr-12 text-neutral-light sm:block">
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
                    <a className="text-neutral-light">Bookmarks</a>
                </Link>
            </div>
        </header>
    )
}

export default Header
