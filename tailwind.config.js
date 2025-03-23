/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Escanea todos los archivos en src
    "./build/**/*.{html,js}"   // Escanea los archivos generados en build
  ],
  theme: {
    extend: {
      fontFamily: {
        sans_custom: ['Work Sans', 'sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}