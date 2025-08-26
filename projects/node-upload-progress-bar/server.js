import http from "http";
import fs from "fs";
import fsPromise from "fs/promises";
import url from "url";
import path from "path";

// Static directory
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Func uploadFile
const uploadFile = async (req, res) => {
  const dirUpload = path.join(__dirname, "uploads");
  await fsPromise.mkdir(dirUpload, { recursive: true });

  // Data
  let data = "";

  // On set le fichier binaires
  req.setEncoding("binary");

  // Events
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", async () => {
    try {
      const boundary = "--" + req.headers["content-type"].split("boundary=")[1];
      const parts = data.split(boundary);

      for (const part of parts) {
        if (part.includes("Content-Disposition")) {
          const match = part.match(/filename="(.+)"/);

          if (match) {
            const filename = match[1];
            const content = part.split("\r\n\r\n")[1].slice(0, -2);
            const filePath = path.join(dirUpload, filename);
            await fsPromise.writeFile(filePath, content, "binary");
          }
        }
      }

      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Fichier uploadé avec succès !");
    } catch (error) {
      console.error("Erreur upload :", error);
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Erreur lors de l'upload");
    }
  });
};

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const filePath = path.join(
      __dirname,
      "public",
      req.url === "/" ? "index.html" : req.url
    );
    const ext = path.extname(filePath);

    // Mime types
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
    };

    const contentType = mimeTypes[ext] || "text/plain";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { "content-type": contentType });
        res.end("Non trouvé");
      } else {
        res.writeHead(200, { "content-type": contentType });
        res.end(content);
      }
    });
  } else if (req.method === "POST") {
    uploadFile(req, res);
  }
});

const PORT = 8000;
server.listen(PORT, () => `Server listen on port ${PORT}`);
