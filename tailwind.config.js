/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
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
                    light: '#a1a1c0',
                    lighter:
                        'linear-gradient(to top, var(--neutralLight) 50%, #fff 120%)',
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
