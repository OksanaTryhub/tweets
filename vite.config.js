import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tweets-test/'
})

// export default defineConfig(({ mode }) => {
//   const isProduction = mode === 'production';
//   const base = isProduction ? '/tweets-test/' : '/';

//   return {
//     plugins: [react()],
//     base: base
//   }
// })