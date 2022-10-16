import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

const Header = () => {
    return (
        <header className="text-white bg-secondary-main">
            <div className="flex items-center justify-between h-24 custom-container">
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
                <button className="flex items-center btn-primary">
                    Login via GitHub
                    <IoLogoGithub className="ml-2" size={25} />
                </button>
            </div>
        </header>
    )
}

export default Header
