/**
 * Node.js BASICS
 *
 * Read-Eval-Print-Loop (REPL)
 * CommonJS Modules
 * ES Modules
 * NPM libraries
 * Environement Variables
 * Process Object
 *
 * FS Module
 * URL Module
 * Path Module
 * OS Module
 *
 * HTTP Module
 * API/HTTP Requests
 * Middleware
 */
import http from "http";
import fs from "fs";
import path from "path";

// Create server
const server = http.createServer((request, response) => {
  const MIME_TYPES = {
    json: "application/json",
    html: "text/html; charset=UTF-8",
  };

  // Get path
  const VIEWS_PATH = path.join(process.cwd(), "./public/views");
  let data = "";

  if (request.method === "GET") {
    if (request.url === "/") {
      // response.statusCode = 200;
      // response.setHeader("content-type", "text/plain");
      // response.end("Hello World 3!");

      // Response in JSON
      // response
      //   .writeHead(200, {
      //     "content-type": "application/json",
      //   })
      //   .end(
      //     JSON.stringify({
      //       message: "Bienvenue à mon API!",
      //     })
      //   );

      // Read file
      data = fs.readFileSync(VIEWS_PATH + "/index.html");

      // Response in HTML
      response
        .writeHead(200, {
          "content-type": MIME_TYPES.html,
        })
        .end(data);
    } else if (request.url === "/about") {
      // Read file
      data = fs.readFileSync(VIEWS_PATH + "/about.html");

      // Response in HTML
      response
        .writeHead(200, {
          "content-type": MIME_TYPES.html,
        })
        .end(data);
    }
  }
});

// Server listen
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
