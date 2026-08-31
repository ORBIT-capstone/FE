/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API 서버 주소
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
