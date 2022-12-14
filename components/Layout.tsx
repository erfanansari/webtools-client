import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

interface Props extends React.PropsWithChildren {
    title?: string
    keywords?: string
    description?: string
    query?: string
    setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Layout: React.FC<Props> = ({
    title,
    keywords,
    description,
    children,
    query,
    setQuery,
}) => {
    return (
        <div className="min-h-[100vh] flex justify-between flex-col">
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <Header query={query!} setQuery={setQuery!} />
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
