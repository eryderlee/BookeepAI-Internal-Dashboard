/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_API_URL: string
  readonly VITE_N8N_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
