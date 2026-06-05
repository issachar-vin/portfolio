import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.MAILFOLIO_URL': JSON.stringify(env.MAILFOLIO_URL ?? ''),
      'import.meta.env.HCAPTCHA_SITE_KEY': JSON.stringify(env.HCAPTCHA_SITE_KEY ?? ''),
    },
  }
})
