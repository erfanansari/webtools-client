/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                'sm': '640px',
                // => @media (min-width: 640px) { ... }

                'md': '768px',
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },
            boxShadow: {
                cart: '0 20px 48px rgb(52 72 123 / 10%)',
            },
            colors: {
                primary: {
                    main: '#fb310a',
                    dark: '#981d05',
                },
                secondary: {
                    main: '#03032d',
                    dark: '#10091d',
                },
                neutral: {
                    main: '#a1a1c0',
                    light: '#f0f7ff',
                    // lighter: 'linear-gradient(to top, #f0f7ff 50%, #fff 120%)',
                    dark: '#6f6f86',
                },
                gray: {
                    1: '#eef6ff',
                    2: '#e6f0fe',
                },
            },
        },
    },
    plugins: [],
}
