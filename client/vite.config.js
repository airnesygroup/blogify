import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config
export default defineConfig({
  plugins: [react()],
  base: '/',  // Use "/" if deploying to the root of your domain, adjust if deploying to a subdirectory
  build: {
    outDir: 'build', // Or 'dist', depending on your setup
    rollupOptions: {
      input: '/src/main.jsx', // Make sure the entry file is correctly set
    },
  },
})
