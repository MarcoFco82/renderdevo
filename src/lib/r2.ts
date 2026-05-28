/**
 * R2 (Cloudflare Object Storage) URL builder.
 *
 * Custom domain: media.renderdevo.com → bucket renderdevo-files
 *
 * Si en el futuro cambiamos el subdomain, solo cambiamos R2_BASE acá.
 */

export const R2_BASE = 'https://media.renderdevo.com';

export function r2(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return `${R2_BASE}/${clean}`;
}
