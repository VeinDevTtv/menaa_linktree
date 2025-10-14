declare module "@vercel/blob" {
  export function put(
    key: string,
    value: string | ArrayBuffer | ArrayBufferView | Blob,
    options?: {
      contentType?: string
      token?: string
    }
  ): Promise<{ url: string; downloadUrl?: string }>

  export function head(
    key: string,
    options?: { token?: string }
  ): Promise<{ url: string; downloadUrl?: string } | null>
}


