import Image from 'next/image'
import Link from 'next/link'
import { IoHeart, IoLogoTwitter } from 'react-icons/io5'
import { FaTelegramPlane } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'

const Footer: React.FC = () => {
    return (
        <footer
            className="rounded-t-3xl text-white mt-24"
            style={{
                background:
                    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(24,78,89,1) 100%)',
            }}
        >
            <div className="flex flex-col md:flex-row items-center custom-container justify-around md:justify-between py-6 md:py-2 h-28">
                <Link href="/" className="text-black">
                    <div className="flex items-center cursor-pointer">
                        <Image
                            src="/white-gear.png"
                            width={43}
                            height={33}
                            alt="logo"
                        />
                        <h1 className="ml-2 text-3xl font-bold">WebTools</h1>
                    </div>
                </Link>
                <div className="flex items-center">
                    <h2 className="text-sm cursor-default">
                        Created with{' '}
                        <IoHeart
                            className="text-red-500"
                            style={{
                                display: 'inline-block',
                            }}
                            size={17}
                        />{' '}
                        By{' '}
                        <a
                            href="https://twitter.com/eansarimehr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Erfan Ansari
                        </a>
                    </h2>
                </div>
                <div className="flex items-center">
                    <a
                        href="mailto:dev.erfanansari@gmai.com"
                        className="text-3xl"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <MdOutgoingMail />
                    </a>
                    <a
                        href="https://twitter.com/eansarimehr"
                        className="text-3xl ml-5"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IoLogoTwitter />
                    </a>
                    <a
                        href="https://t.me/eansarimehr"
                        className="text-3xl ml-5"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaTelegramPlane />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
