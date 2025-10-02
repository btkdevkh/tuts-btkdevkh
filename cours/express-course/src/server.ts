/**
 * #1 Création d'un serveur avec Express (x)
 * #2 Les requêtes http & les réponses (x)
 * #3 Servir le dossier statique (x)
 * #4 Variables d'environement (x)
 * #5 L'aproache du WebApp classique et HTML Template (x)
 * #6 L'aproache d'API Rest et données en JSON (x)
 * #8 Gestion des erreurs (x)
 * #7 Middlewares (x)
 * #9 Organisation des dossiers (x)
 * #10 Controllers (x)
 * #11 Routes (x)
 */

import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import postRoute from "./routes/postRoute";

// Load env var
dotenv.config();

// App
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engin", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route "/"
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Bienvenu à mon API Rest!" });
});

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Route "/api/v1"
app.use("/api/v1", postRoute);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT} : http://localhost:${PORT}`);
});
