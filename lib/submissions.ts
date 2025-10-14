import { promises as fs } from "fs"
import path from "path"

type SubmissionKind = "officer" | "member" | "rsvp"

type Registry = {
  officer: string[]
  member: string[]
  rsvp: string[]
}

const DEFAULT_REGISTRY: Registry = { officer: [], member: [], rsvp: [] }

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
const BLOB_KEY = "submissions/registry.json"

async function readFromLocal(): Promise<Registry> {
  const dir = path.join(process.cwd(), "data")
  const file = path.join(dir, "submissions.json")
  try {
    const raw = await fs.readFile(file, "utf8")
    const parsed = JSON.parse(raw)
    return normalizeRegistry(parsed)
  } catch (err) {
    // Ensure directory and file exist
    await fs.mkdir(dir, { recursive: true }).catch(() => {})
    await fs.writeFile(file, JSON.stringify(DEFAULT_REGISTRY, null, 2), "utf8").catch(() => {})
    return DEFAULT_REGISTRY
  }
}

async function writeToLocal(registry: Registry): Promise<void> {
  const dir = path.join(process.cwd(), "data")
  const file = path.join(dir, "submissions.json")
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(file, JSON.stringify(registry, null, 2), "utf8")
}

function normalizeRegistry(value: unknown): Registry {
  const base = DEFAULT_REGISTRY
  const obj = (value && typeof value === "object" ? value : {}) as Partial<Registry>
  return {
    officer: Array.isArray(obj.officer) ? obj.officer.map(String) : base.officer,
    member: Array.isArray(obj.member) ? obj.member.map(String) : base.member,
    rsvp: Array.isArray(obj.rsvp) ? obj.rsvp.map(String) : base.rsvp,
  }
}

// Blob helpers (server-side only)
async function readFromBlob(): Promise<Registry> {
  if (!BLOB_TOKEN) return readFromLocal()
  try {
    const { head } = await import("@vercel/blob")
    const info = await head(BLOB_KEY, { token: BLOB_TOKEN }).catch(() => null)
    if (!info || !info.downloadUrl) {
      // Initialize empty registry
      await writeToBlob(DEFAULT_REGISTRY)
      return DEFAULT_REGISTRY
    }
    const rsp = await fetch(info.downloadUrl)
    if (!rsp.ok) throw new Error("Failed to download registry blob")
    const json = await rsp.json().catch(() => null)
    return normalizeRegistry(json)
  } catch {
    // Fallback to local in dev if blob not accessible
    return readFromLocal()
  }
}

async function writeToBlob(registry: Registry): Promise<void> {
  if (!BLOB_TOKEN) return writeToLocal(registry)
  const { put } = await import("@vercel/blob")
  await put(BLOB_KEY, JSON.stringify(registry), {
    contentType: "application/json",
    token: BLOB_TOKEN,
  })
}

export async function readRegistry(): Promise<Registry> {
  return readFromBlob()
}

export async function hasEmail(kind: SubmissionKind, emailRaw: string): Promise<boolean> {
  const email = emailRaw.trim().toLowerCase()
  if (!email) return false
  const registry = await readRegistry()
  const set = new Set(registry[kind])
  return set.has(email)
}

export async function addEmail(kind: SubmissionKind, emailRaw: string): Promise<void> {
  const email = emailRaw.trim().toLowerCase()
  if (!email) return
  for (let attempt = 0; attempt < 3; attempt++) {
    const registry = await readRegistry()
    const set = new Set(registry[kind])
    if (set.has(email)) return
    set.add(email)
    const next: Registry = { ...registry, [kind]: Array.from(set) } as Registry
    try {
      await writeToBlob(next)
      return
    } catch {
      // retry small backoff
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)))
    }
  }
}


