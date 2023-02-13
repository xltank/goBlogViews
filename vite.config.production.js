/**
 * 生产环境配置
 */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers"
import {resolve} from "path";
import visualizer from "rollup-plugin-visualizer";
import svgLoader from 'vite-svg-loader';
import { svgBuilder } from './src/plugins/svgBuilder';
import moment from "moment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // svgLoader(),
    svgBuilder('./src/assets/svg/'),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    outDir: "./dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          lodash: ["lodash"],
          moment: ["moment"],
          icons: ["@ant-design/icons-vue"]
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A'
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000"
      }
    }
  },
  "vue-jest": {
    compilerOptions: {
      isCustomElement: tag => {
        return tag.startsWith("vn-");
      }
    }
  }
})
