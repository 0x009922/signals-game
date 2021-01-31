import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from './src/vite-plugin-tsconfig-paths';

const config: UserConfig = {
    plugins: [vue(), tsconfigPaths],
};

export default config;
