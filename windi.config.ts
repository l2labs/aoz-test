import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  /* configurations... */
  plugins: [require('windicss/plugin/aspect-ratio')],
})
