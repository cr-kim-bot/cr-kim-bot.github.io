export function normalizeCodeBlockMeta(meta: string) {
  return meta.replace(/filename="([^"]+)"/, 'title="$1"');
}
