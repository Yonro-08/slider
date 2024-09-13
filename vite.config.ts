import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: resolve(root, 'components'),
			assets: resolve(root, 'assets'),
			constants: resolve(root, 'constants'),
		},
	},
});
