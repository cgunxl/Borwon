import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    host: true,
    cors: true,
    strictPort: true,
    origin: 'https://5178-ip6e8wqyfxn6asb6d6gdf-a74f4d45.manusvm.computer'
  }
});

