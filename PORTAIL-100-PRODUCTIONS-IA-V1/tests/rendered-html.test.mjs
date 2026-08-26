import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(Date.now()));
  return (await import(workerUrl.href)).default;
}

async function renderPath(worker, pathname) {
  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("rend l’accueil avec le titre officiel", async () => {
  const worker = await loadWorker();
  const response = await renderPath(worker, "/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /100 productions IA/i);
  assert.match(html, /utiles/i);
  assert.match(html, /v.rifi.es/i);
  assert.doesNotMatch(html, /Starter Project/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("rend le portfolio et le tableau de bord", async () => {
  const worker = await loadWorker();
  const portfolio = await renderPath(worker, "/projets");
  const dashboard = await renderPath(worker, "/tableau-de-bord");

  assert.equal(portfolio.status, 200);
  assert.match(await portfolio.text(), /Portfolio/i);
  assert.equal(dashboard.status, 200);
  assert.match(await dashboard.text(), /0 \/ 100|0<!-- --> \/ <!-- -->100/i);
});
