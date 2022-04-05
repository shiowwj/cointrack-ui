module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-white': '#FFFFFF',
                'alt-red': '#EA580C',
                'body-grey': '#9299A6',
                'background-primary': '#151821',
            },
            border: {

            },
            width: {
                '100px': '100px',
            },
            maxWidth: {
                '100px': '100px',
            },
            minWidth: {
                'auto': 'auto',
            },
            borderRadius: {
                '50p': '50%'
            }
        },
        fontFamily: {
            sans: ['Josefin Sans', 'Lexend'],
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
