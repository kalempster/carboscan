/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            outfit: ["Outfit"]
        },
        extend: {
            fontFamily: {
                outfit: ["Outfit"]
            },
            colors: {
                logoBlack: "#3F3D56",
                logoGreen: "#357960",
                textSecondary: "#5A5A5A",
                textPrimary: "#000000",
                primary: "#357960"
            }
        }
    },
    plugins: []
};
