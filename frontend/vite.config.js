import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			src: resolve(__dirname, 'src'),
		},
	},
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				{
					name: 'load-js-files-as-jsx',
					setup(build) {
						build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
							loader: 'jsx',
							contents: await fs.readFile(args.path, 'utf8'),
						}));
					},
				},
			],
		},
	},
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host:true,
		strictPort: true,
		port:3000
	},
	build: {
		rollupOptions: {
		  input: {
			main: resolve(__dirname, 'index.html'),
			//nested: resolve(__dirname, 'nested/index.html'),
		  },
		},
	  },
});
