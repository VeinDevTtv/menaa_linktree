const QSTASH_API_BASE = "https://qstash.upstash.io/v2/publish"

export async function scheduleGet(targetUrl: string, delay: string): Promise<Response> {
  const token = process.env.QSTASH_TOKEN
  if (!token) {
    return new Response("Server misconfigured: missing QSTASH_TOKEN", { status: 500 })
  }

  const encodedTarget = encodeURIComponent(targetUrl)
  const endpoint = `${QSTASH_API_BASE}/${encodedTarget}`

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Upstash-Method": "GET",
      "Upstash-Delay": delay,
    },
  })
}


