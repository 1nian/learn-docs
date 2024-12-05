import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "1nian",
    description: "",

    head: [["link", { rel: "icon", href: "/favicon.ico" }]],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/examples", activeMatch: "/examples/" },
            { text: "服务器", link: "/server", activeMatch: "/server/" },
            {
                text: "前端",
                link: "/font",
                activeMatch: "/font/",
            },
        ],

        sidebar: {
            "/font/": [
                {
                    text: "前端",
                    collapsed: true,
                    items: [
                        { text: "简介", link: "/font/" },
                        { text: "uniapp", link: "/font/uniapp/" },
                    ],
                },
            ],
            "/server/": [
                {
                    text: "后端",
                    items: [
                        { text: "简介", link: "/server/" },
                        { text: "MinIO", link: "/server/MinIO" },
                        { text: "Mongodb", link: "/server/Mongodb" },
                        { text: "MySql", link: "/server/MySql" },
                        { text: "Nest 跨域", link: "/server/cors" },
                        { text: "Nest 定时任务", link: "/server/cron" },
                    ],
                },
            ],
            "/examples/": [
                {
                    text: "Examples",
                    items: [
                        {
                            text: "案例",
                            link: "/examples/",
                        },
                        {
                            text: "Markdown Examples",
                            link: "/examples/markdown-examples",
                        },
                        {
                            text: "API Examples",
                            link: "/examples/api-examples",
                        },
                    ],
                },
            ],
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],

        // 搜索
        search: {
            provider: "local",
        },
    },
});
