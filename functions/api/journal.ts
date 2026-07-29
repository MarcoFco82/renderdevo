/**
 * GET /api/journal — API pública del Journal.
 *
 * Lee journal/entries.json del bucket privado DATA (R2) y devuelve solo las
 * entradas publicadas. Los borradores nunca salen de aquí (el bucket no es
 * público). La escritura vive en /api/admin/* (protegido por Cloudflare Access).
 *
 * Nota: functions/ NO pasa por el build de la app (tsconfig incluye solo src/);
 * wrangler la empaqueta aparte al hacer `wrangler pages deploy`.
 */

interface R2ObjectBody {
  text(): Promise<string>;
}
interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
}
interface Env {
  DATA: R2Bucket;
}
interface Context {
  env: Env;
}

interface StoredEntry {
  published?: boolean;
}

const KEY = 'journal/entries.json';

export async function onRequestGet(context: Context): Promise<Response> {
  try {
    const obj = await context.env.DATA.get(KEY);
    if (!obj) return json({ entries: [] });

    const parsed = JSON.parse(await obj.text()) as { entries?: StoredEntry[] };
    const entries = Array.isArray(parsed.entries)
      ? parsed.entries.filter((e) => e.published !== false)
      : [];

    return json({ entries }, 60);
  } catch {
    return json({ entries: [], error: 'read_failed' }, 0, 500);
  }
}

function json(body: unknown, maxAge = 0, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}
