/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_APP_REQUEST: string
    VITE_APP_LOCALHOST: string
    // 其他环境变量可以在这里声明
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
