import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: false,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // 正常会直接去服务的根路径找，是找不到script的链接文件的，此处需要加个.表示相对目录
    // assetPrefix: isProd ? '.' : '',
    webpack (config, { dev, isServer }) {
        if (!dev) {
            config.optimization.minimize = false;
        }
        // Fixes npm packages (like comflowy-image-editor) that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        config.resolve.mainFields = ['browser', 'main', 'module'];
        return config;
    }
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    },
})

export default withMDX(nextConfig)