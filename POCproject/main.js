// Import modules compatible with Deno
import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import { v4 as uuidv4 } from "https://deno.land/std@0.127.0/uuid/mod.ts";   // UUIDs (universally unique identifier) can be used to uniquely identify some object or data.

// Initialize the Oak application (You would use Express in node.js)
const app = new Application();
const router = new Router();

// Sample data
let data = [
  {
    id: "65ca1ed15af0b777a96c4c0f",
    name: "Le titre",
    author: "Le réalisateur",
    img: "A link to the poster",
    category: "Category ID",
    description: "A brief description of the movie",
  },
  {
    id: "65ca1ddf83da4e7723f3a053",
    name: "Interstellar",
    author: "Christopher Nolan",
    img: "A link to the poster",
    category: "Sci-fi",
    description: "A brief description of the movie",
  },
];

// Routes
router
  .get("/", (context) => {
    context.response.body = data;
  })
  .get("/:id", (context) => {
    const { id } = context.params;
    const movie = data.find((item) => item.id === id);
    if (movie) {
      context.response.body = movie;
    } else {
      context.response.status = Status.NotFound;
      context.response.body = { error: "Movie not found" };
    }
  })
  .post("/", async (context) => {
    const { value } = await context.request.body();
    const newMovie = { ...value, id: uuidv4.generate() };           // newMovie = what is sent in the POST body + a generated id with uuid
    data.push(newMovie);
    context.response.body = "Movie added";
  })
  .patch("/:id", async (context) => {
    const { id } = context.params;
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const { value } = await context.request.body();
      data[index] = { ...data[index], ...value };
      context.response.body = data[index];
    } else {
      context.response.status = Status.NotFound;
      context.response.body = { error: "Movie not found" };
    }
  })
  .delete("/:id", (context) => {
    const { id } = context.params;
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      context.response.body = "Movie deleted";
    } else {
      context.response.status = Status.NotFound;
      context.response.body = { error: "Movie not found" };
    }
  });

// Use the router and listen on port 3000
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:3000");
await app.listen({ port: 3000 });
