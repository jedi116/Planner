/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_API_KEY: string
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_PROJECTID: string
  readonly VITE_STORAGE_BUCKET: string
  readonly VITE_MESSAGINGSENDERID: string
  readonly VITE_APP_ID: string
  readonly VITE_MEASUREMENT_ID: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
