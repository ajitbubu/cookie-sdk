// Local builder server for the cookie-banner SDK.
//
// Serves the builder form (builder/index.html) and exposes a small API to load,
// save, and BUILD per-site bundles — the in-browser equivalent of running the
// build command for one site. Zero external deps (Node built-ins only).
//
//   npm run builder         → http://localhost:5174
//
// API:
//   GET  /api/sites         → [{ id, label, triggerId, config }, ...]
//   POST /api/save          → write sites/<id>.json   (body: site object)
//   POST /api/build         → save + build, returns { ok, file, url }
//   GET  /dist/<file>       → download a built artifact

import { createServer } from "node:http";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, basename } from "node:path";
import { buildSite, validateSite } from "./build-site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITES_DIR = join(ROOT, "sites");
const DIST_DIR = join(ROOT, "dist");
const PORT = Number(process.env.PORT) || 5174;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Cache-Control": "no-store", ...headers });
  res.end(body);
}
function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj), { "Content-Type": MIME[".json"] });
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 1_000_000) reject(new Error("payload too large"));
      else chunks.push(c);
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function listSites() {
  if (!existsSync(SITES_DIR)) return [];
  return readdirSync(SITES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(SITES_DIR, f), "utf8")));
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const { pathname } = url;

    if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
      const html = readFileSync(join(ROOT, "builder", "index.html"));
      return send(res, 200, html, { "Content-Type": MIME[".html"] });
    }

    if (req.method === "GET" && pathname === "/api/sites") {
      return sendJson(res, 200, listSites());
    }

    if (req.method === "POST" && (pathname === "/api/save" || pathname === "/api/build")) {
      const raw = await readBody(req);
      let site;
      try {
        site = validateSite(JSON.parse(raw));
      } catch (err) {
        return sendJson(res, 400, { ok: false, error: err.message });
      }
      // Persist sites/<id>.json so it's tracked and rebuildable from the CLI too.
      writeFileSync(join(SITES_DIR, `${site.id}.json`), JSON.stringify(site, null, 2) + "\n");
      if (pathname === "/api/save") {
        return sendJson(res, 200, { ok: true, saved: `sites/${site.id}.json` });
      }
      // /api/build
      try {
        const { id, file } = await buildSite(site);
        return sendJson(res, 200, {
          ok: true,
          id,
          file,
          url: `/dist/${basename(file)}`,
          saved: `sites/${id}.json`,
        });
      } catch (err) {
        return sendJson(res, 500, { ok: false, error: String(err.message || err) });
      }
    }

    if (req.method === "GET" && pathname.startsWith("/dist/")) {
      const name = basename(pathname); // prevent path traversal
      const file = join(DIST_DIR, name);
      if (!existsSync(file)) return send(res, 404, "not found");
      const ext = name.slice(name.lastIndexOf("."));
      return send(res, 200, readFileSync(file), {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${name}"`,
      });
    }

    send(res, 404, "not found");
  } catch (err) {
    sendJson(res, 500, { ok: false, error: String(err.message || err) });
  }
});

server.listen(PORT, () => {
  console.log(`\n  Cookie-banner builder running:\n    → http://localhost:${PORT}\n`);
});
