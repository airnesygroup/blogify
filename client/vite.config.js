import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Adjust output directory and paths if needed
    outDir: 'build', // You can change this to 'dist' or any folder name you want
    rollupOptions: {
      input: '/src/main.jsx' // Ensure Vite knows where to start bundling
    }
  },
  base: '/client/', // Adjust this if needed based on Vercel or folder structure
})
