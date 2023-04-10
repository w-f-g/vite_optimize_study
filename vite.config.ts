import { defineConfig, loadEnv } from 'vite'
import { ViteAliases } from 'vite-aliases'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { compression } from 'vite-plugin-compression2'
import { Plugin as vitePluginCDN } from 'vite-plugin-cdn-import'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  // console.log(env);
  return {
    plugins: [
      react(),
      legacy({
        polyfills: ['es.global-this'],
      }),
      ViteAliases({deep: false}),
      viteMockServe({
        mockPath: "./mock/"
      }),
      // 开启 gzip 压缩
      compression(),
      // 使用 CDN
      vitePluginCDN({
        modules: [
          {
            name: "echarts",
            var: "echarts",
            path: "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js",
          },
        ]
      }),
      // 打包分析，必须放最后
      visualizer(),
    ],
    base: env.VITE_PUBLIC_URL,
    server: {
      // open: true,
      proxy: {
        /* "/api": {
          target: "",
          changeOrigin: true,
        } */
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            const chunksMap = {
              "antd": "antd",
              "axios": "axios",
              "lodash-es": "lodash",
              "echarts": "echarts",
              "\/react\/": "react",
              "\/react-dom\/": "react-dom",
              "classnames": "classnames",
              "styled-components": "styled-components",
            }
            let key = Object.keys(chunksMap).find(key => {
              return id.includes(key)
            })
            if (key in chunksMap) {
              return chunksMap[key]
            } else if (id.includes("node_modules")) {
              return "vendor"
            }
          }
        }
      }
    }
  }
})
