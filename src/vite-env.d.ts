/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_WHATSAPP_TOKEN?: string;
  // adicione outras variáveis aqui se necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
