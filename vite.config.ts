import type { Plugin } from "vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fetchAllProducts } from "./server/clients/contentstack/product/fetchAllProducts";
import { updateProduct } from "./server/clients/contentstack/product/UpdateProduct";

const productsApiPlugin = (): Plugin => ({
  name: "products-api-plugin",
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      if (!request.url?.startsWith("/api/products")) {
        next();
        return;
      }

      const patchMatch = /^\/api\/products\/([^?]+)/.exec(request.url);
      if (request.method === "PATCH" && patchMatch) {
        try {
          const uid = decodeURIComponent(patchMatch[1]);
          const url = new URL(request.url, "http://localhost");
          const locale = url.searchParams.get("locale") ?? "en";

          const chunks: Buffer[] = [];
          for await (const chunk of request) chunks.push(chunk as Buffer);
          const fields = JSON.parse(Buffer.concat(chunks).toString());

          await updateProduct(uid, fields, locale);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({}));
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to update product";
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ error: message }));
        }
        return;
      }

      try {
        const url = new URL(request.url, "http://localhost");
        const locale = url.searchParams.get("locale") ?? "en";
        const fetchFullListParam = url.searchParams.get("fetchFullList");
        const fetchFullList =
          fetchFullListParam === null || fetchFullListParam === "true";

        const products = await fetchAllProducts(locale, fetchFullList);

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ products }));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch products";

        response.statusCode = 500;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ error: message }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  // Make .env values available to Node-side middleware and server utilities.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), productsApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
      },
    },
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
  };
});
