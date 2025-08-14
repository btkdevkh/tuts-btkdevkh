/**
 * Create a web server with Rest API approche
 * API REST (CRUD)
 * "/api/v1/products"
 */
import http from "http";
import fs from "fs";
import path from "path";

// Middleware
const loggerMiddleware = (request, response, next) => {
  console.log(request.method);
  console.log(request.url);
  next();
};

const server = http.createServer((req, res) => {
  loggerMiddleware(req, res, () => {
    if (req.method === "GET") {
      if (req.url === "/") {
        res
          .writeHead(200, {
            "content-type": "application/json",
          })
          .end(
            JSON.stringify({
              message: "Bienvenue à mon API REST!",
            })
          );
      } else if (req.url === "/api/v1/products") {
        // Get path
        const filePath = path.join(process.cwd(), "./data.json");
        const data = fs.readFileSync(filePath, "utf8");

        res
          .writeHead(200, {
            "content-type": "application/json",
          })
          .end(data);
      }
    } else if (
      req.method === "POST" &&
      req.headers["content-type"] === "application/json"
    ) {
      if (req.url === "/api/v1/products") {
        // Ajouter le post au data
        let body = "";

        // On écoute les chunks de données envoyés par le client
        req.on("data", (chunk) => {
          body += chunk.toString(); // conversion en string
        });

        // Quand toutes les données sont reçues
        req.on("end", () => {
          try {
            // Get client data
            const dataClient = JSON.parse(body); // parsing du JSON

            // Get path
            const filePath = path.join(process.cwd(), "./data.json");
            const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

            // Mise à jour
            jsonData.products.push(dataClient);

            // Écriture avec indentation
            fs.writeFileSync(
              filePath,
              JSON.stringify(jsonData, null, 2),
              "utf8"
            );

            // Réponse au client
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Données reçues" }));
          } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "JSON invalide" }));
          }
        });
      }
    } else if (
      req.method === "PUT" &&
      req.url.startsWith("/api/v1/products/") &&
      req.headers["content-type"] === "application/json"
    ) {
      // Ajouter le post au data
      let body = "";

      // On écoute les chunks de données envoyés par le client
      req.on("data", (chunk) => {
        body += chunk.toString(); // conversion en string
      });

      // Quand toutes les données sont reçues
      req.on("end", () => {
        try {
          // Get client data
          const dataClient = JSON.parse(body); // parsing du JSON

          // Extraire l'ID
          const id = req.url.split("/").pop();

          // Get path
          const filePath = path.join(process.cwd(), "./data.json");
          const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

          const updateJSONData = jsonData.products.filter(
            (product) => Number(product.id) !== Number(id)
          );

          // Mise à jour
          jsonData.products = updateJSONData;
          jsonData.products.push(dataClient);

          // Écriture avec indentation
          fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");

          // Réponse au client
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Données reçues" }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "JSON invalide" }));
        }
      });
    } else if (
      req.method === "DELETE" &&
      req.url.startsWith("/api/v1/products/")
    ) {
      try {
        // Extraire l'ID
        const id = req.url.split("/").pop();

        // Get path
        const filePath = path.join(process.cwd(), "./data.json");
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const updateJSONData = jsonData.products.filter(
          (product) => Number(product.id) !== Number(id)
        );

        // Mise à jour
        jsonData.products = updateJSONData;

        // Écriture avec indentation
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");

        // Réponse au client
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Données reçues" }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "JSON invalide" }));
      }
    } else {
      // Autres cas
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route non trouvée ou mauvais format" }));
    }
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
