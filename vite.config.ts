import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
// import { basename } from 'path';
// import { createHash } from 'crypto';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({ protocolImports: true })
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
                // manualChunks: {
                //     'group-user': [
                //         './src/UserDetails',
                //         './src/UserDashboard',
                //         './src/UserProfileEdit',
                //     ],
                // },
                // TODO: finish chunks
                manualChunks(id) {
                    if (id.includes('/node_modules/')) {
                        return 'vendors';
                    }

                    if (id.includes('uikit')) {
                        return 'uikit';
                    }

                    // if (id.includes('App.vue') || id.includes('components/Popup') || id.includes('components/Tooltip') || id.includes('src/uikit') || id.includes('src/hooks') || id.includes('components/Menus')) {
                    //     return 'app';
                    // }
                }
            },
        },
    }
});
