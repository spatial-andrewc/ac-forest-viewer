/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_MAP_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}