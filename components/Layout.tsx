import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

interface Props extends React.PropsWithChildren {
    title?: string
    keywords?: string
    description?: string
    searchTerm?: string
    setSearchTerm?: React.Dispatch<React.SetStateAction<string>>
}

const Layout: React.FC<Props> = ({
    title,
    keywords,
    description,
    children,
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <Header searchTerm={searchTerm!} setSearchTerm={setSearchTerm!} />
            <main className="pt-32 md:pt-24 custom-container">{children}</main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Web Tools',
    keywords:
        'development tools, web tools, programming tools, front end tools, back end tools',
    description: 'the best info and news in development',
}

export default Layout
