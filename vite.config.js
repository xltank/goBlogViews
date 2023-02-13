import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import {resolve} from "path";
// import svgLoader from 'vite-svg-loader'
import { svgBuilder } from './src/plugins/svgBuilder.js';


// console.log("path: ", resolve(__dirname, "src"));

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
    })
  ],
  resolve: {
    alias: {
      "@": resolve("./src")
    }
  },
  build: {
    outDir: "./dist"
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
    domain: "my.com",
    port: "3101",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000"
      }
    }
  },
  // "vue-jest": {
  //   compilerOptions: {
  //     isCustomElement: tag => {
  //       return tag.startsWith("vn-");
  //     }
  //   }
  // }
})
