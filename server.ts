import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Direct redirect for menu shortcut (immediate server-side)
  app.get(["/menu", "/menu/"], (req, res) => {
    res.redirect(301, "https://www.instagram.com/smashb.uae/");
  });

  // Development mode: Use Vite's middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files from the dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Redirect all requests to index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
