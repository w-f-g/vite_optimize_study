import { UserConfig, defineConfig, loadEnv } from 'vite'
import { ViteAliases } from 'vite-aliases'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { compression } from 'vite-plugin-compression2'
import { Plugin as vitePluginCDN } from 'vite-plugin-cdn-import'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import packageJSON from './package.json'

// 不需要单独拆分的模块列表
const exclusive: string[] = []
// 需要拆包的模块列表
const libs: Record<string, string> = Object.keys(packageJSON.dependencies)
  .filter(name => !exclusive.includes(name))
  .reduce((libs, name) => {
    const key = `\/node_modules\/${name}\/`
    libs[key] = name
    return libs
  }, {})

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  // console.log(env);
  return {
    plugins: [
      react(),
      legacy({
        polyfills: ['es.global-this', 'es.symbol'],
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
            // console.log(id);
            // 找到当前正在进行打包的模块
            let key = Object.keys(libs).find(key => {
              return id.includes(key)
            })
            if (key in libs) {
              // 单独拆包
              return libs[key]
            } else if (id.includes("node_modules")) {
              // 其余的第三方模块合并打包进 vendor 文件
              return "vendor"
            }
            // 剩下的业务模块交给 vite (准确来说是 rollup) 自行打包
          }
        }
      }
    }
  } as UserConfig
})
