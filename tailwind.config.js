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
                'background-grey': '#EDF0F4',
                'alt-grey': '#505B73'
            },
            border: {

            },
            width: {
                '100px': '100px',
                '90p': '90%',
                '85p': '85%',
                '80p': '80%'
            },
            maxWidth: {
                '100px': '100px',
            },
            minWidth: {
                'auto': 'auto',
            },
            borderRadius: {
                '50p': '50%'
            },
            inset: {
                '5p': '5%',
                '6p': '6%',
                '7p': '7%',
                '8p': '8%',
                '9p': '9%',
                '10p': '10%',
            },
            height: {
                'bh': '4vh',
                'display-box': '10vh'
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
