/**
 * Resolves an asset path from the `public/` folder using Vite's `import.meta.env.BASE_URL`.
 *
 * Ensures compatibility with:
 * 1. GitHub Pages repository subpath (e.g. `https://hapis01.github.io/ultahulul/`)
 * 2. Custom domains or root deployments (e.g. `https://mycustomdomain.com/`)
 * 3. Local Vite development server (`http://localhost:5173/`)
 *
 * Automatically handles leading slashes and prevents duplicate base URL prefixes.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';

  // Skip external URLs and data URIs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';

  // If already prefixed with base URL, return as is
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }

  // Remove leading slash if any to cleanly append to base
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Ensure base ends with a slash
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${cleanPath}`;
}
