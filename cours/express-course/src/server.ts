/**
 * #1 Création d'un serveur avec Express (x)
 * #2 Les requêtes http & les réponses (x)
 * #3 Servir le dossier statique (x)
 * #4 Variables d'environement (x)
 */

import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load env var
dotenv.config();

// App
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // res.sendFile(path.join(__dirname, "..", "public", "home.html"));
  res.status(200).json({ msg: "Bienvenue à mon API Rest!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT} : http://localhost:${PORT}`);
});
