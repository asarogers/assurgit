// Merges our D1 binding into the CloudflareEnv interface used by @opennextjs/cloudflare
declare global {
  interface CloudflareEnv extends Cloudflare.Env {}
}
export {};
