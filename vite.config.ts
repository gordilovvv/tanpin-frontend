import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import htmlPlugin from 'vite-plugin-html-config';
import { createRequire } from 'node:module';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({ protocolImports: true }),
        reactVirtualized(),
        htmlPlugin({
            links: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    sizes: '32x32',
                    href: '/favicon-32.png',
                },
                {
                    rel: 'icon',
                    sizes: '16x16',
                    href: '/favicon-16.png',
                },
            ],
            metas: [
                { name: 'description', content: 'Discover, Buy and Sell Unique Gaming NFTs' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://tanpin.io' },
                { property: 'og:title', content: 'Tanpin - Next Generation Marketplace' },
                { property: 'og:description', content: 'Discover, Buy and Sell Unique Gaming NFTs' },
                { property: 'og:image', content: '/cover.png' },
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', content: 'https://tanpin.io' },
                { property: 'twitter:title', content: 'Tanpin - Next Generation Marketplace' },
                { property: 'twitter:description', content: 'Discover, Buy and Sell Unique Gaming NFTs' },
                { property: 'twitter:image', content: 'https://tanpin.io/cover.png' },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        modules: {
            // generateScopedName: '[name]__[local]___[hash:base64:5]',
            // generateScopedName(name, filename, css) {
            //     const component = basename(filename).replace('.module.scss', '');
            //     const hash = createHash('md5')
            //         .update(filename)
            //         .digest('hex')
            //         .slice(0, 5);

            //     // we must start with an underscore, otherwise it might start with a number
            //     return `${component}__${name}__${hash}`;
            // },
            localsConvention: 'camelCaseOnly'
        },
        preprocessorOptions: {
            scss: {
                additionalData: '@import \'@/app/scss/abstracts/abstracts.scss\';'
            }
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
        },
    },
    build: {
        rollupOptions: {
            // https://rollupjs.org/guide/en/#outputmanualchunks
            output: {
                manualChunks(id) {
                    if (id.includes('/node_modules/')) {
                        return 'vendors';
                    }

                    if (id.includes('uikit')) {
                        return 'uikit';
                    }
                }
            },
        },
    }
});

const WRONG_CODE = 'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";';

export function reactVirtualized() {
    return {
        name: 'my:react-virtualized',
        async configResolved() {
            const require = createRequire(import.meta.url);
            const reactVirtualizedPath = require.resolve('react-virtualized');
            const { pathname: reactVirtualizedFilePath } = new url.URL(reactVirtualizedPath, import.meta.url);
            const file = reactVirtualizedFilePath
                .replace(
                    path.join('dist', 'commonjs', 'index.js'),
                    path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
                );
            const code = await fs.readFile(file, 'utf-8');
            const modified = code.replace(WRONG_CODE, '');
            await fs.writeFile(file, modified);
        },
    };
}