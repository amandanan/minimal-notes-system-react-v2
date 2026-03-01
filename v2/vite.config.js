import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/minimal-notes-system-react-v2/', // <<< importante
  plugins: [react()],
})


