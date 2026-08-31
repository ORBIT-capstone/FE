/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 회원 API 서버 주소
  readonly VITE_API_BASE_URL: string;
  // FastAPI 서버 주소
  readonly VITE_FAST_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
