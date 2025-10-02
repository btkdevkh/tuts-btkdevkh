import { Request, Response, NextFunction } from "express";
import { data } from "../data";
import { ExtendsError } from "../types/ExtendsError";

const getPosts = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ data });
};

const getPostById = (req: Request, res: Response, next: NextFunction) => {
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
};

const createPost = (req: Request, res: Response, next: NextFunction) => {
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
};

const updatePost = (req: Request, res: Response, next: NextFunction) => {
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
};

const deletePost = (req: Request, res: Response, next: NextFunction) => {
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
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
