import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Set to the root if deploying to the root, otherwise adjust for sub-directory deployment.
  build: {
    outDir: 'build',  // The directory Vite will build to (e.g., 'build' or 'dist')
    rollupOptions: {
      input: '/src/main.jsx',  // Specify the entry file
    },
  },
})

