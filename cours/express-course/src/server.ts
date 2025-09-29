/**
 * #1 Création d'un serveur avec Express (x)
 * #2 Les requêtes http & les réponses (x)
 * #3 Servir le dossier statique (x)
 * #4 Variables d'environement (x)
 * #5 L'aproache du WebApp classique et HTML Template (x)
 * #6 L'aproache d'API Rest et données en JSON (x)
 * #8 Gestion des erreurs
 * #7 Middlewares
 */

// DATA
const data = [
  { id: 1, postTitle: "post 1" },
  { id: 2, postTitle: "post 2" },
  { id: 3, postTitle: "post 3" },
];

import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { ExtendsError } from "./types/ExtendsError";
import { errorHandler } from "./middlewares/errorHandler";

// Load env var
dotenv.config();

// App
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engin", "ejs");
app.use(express.json());

// Aproache Moteur de Template (EJS)
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.render("pages/home.ejs", { title: "Accueil" });
// });
// app.get("/posts", (req: Request, res: Response, next: NextFunction) => {
//   res.render("pages/posts.ejs", { title: "Posts", data });
// });

// Routes
// Aproache API Rest (JSON) "/api/v1"
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Bienvenu à mon API Rest!" });
});

app.get("/api/v1/posts", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ data });
});

app.get(
  "/api/v1/posts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const foundPost = data.find((datum) => datum.id === id);

    if (!foundPost) {
      const error: ExtendsError = {
        error: new Error("Post non trouvé!"),
        statusCode: 404,
      };
      return next(error);
    }

    res.status(200).json({ data: foundPost });
  }
);

app.post("/api/v1/posts", (req: Request, res: Response, next: NextFunction) => {
  const id = data.length + 1;
  const postTitle = req.body.postTitle;

  if (!postTitle) {
    const error: ExtendsError = {
      error: new Error("Champs obligatoires!"),
      statusCode: 400,
    };
    return next(error);
  }

  data.push({
    id,
    postTitle,
  });

  res.status(200).json({ data: data });
});

app.put(
  "/api/v1/posts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const postTitle = req.body.postTitle;

    if (isNaN(id)) {
      const error: ExtendsError = {
        error: new Error("Il n'y a pas d'identifiant du post!"),
        statusCode: 404,
      };
      return next(error);
    }

    if (!postTitle) {
      const error: ExtendsError = {
        error: new Error("Champs obligatoires!"),
        statusCode: 400,
      };
      return next(error);
    }

    const modifiedData = data.map((datum) => {
      if (id === datum.id) {
        datum.postTitle = postTitle;
      }

      return datum;
    });

    res.status(200).json({ data: modifiedData });
  }
);

app.delete(
  "/api/v1/posts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const modifiedData = data.filter((datum) => datum.id !== id);

    if (isNaN(id)) {
      const error: ExtendsError = {
        error: new Error("Il n'y a pas d'identifiant du post!"),
        statusCode: 404,
      };
      return next(error);
    }

    res.status(200).json({ data: modifiedData });
  }
);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT} : http://localhost:${PORT}`);
});
