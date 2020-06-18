const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const existResource = (request, response, next) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Resource not found!" });
  }

  request.params.repositoryIndex = repositoryIndex;

  next();
};

app.get("/repositories", (request, response) => {
  // TODO
  const { title } = request.query;

  const results = title
    ? repositories.find((repository) =>
        repository.title.toUpperCase().includes(title.toUpperCase())
      )
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", existResource, (request, response) => {
  // TODO
  const { id, repositoryIndex } = request.params;
  const { title, url, techs } = request.body;

  repositoryUpdated = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repositoryUpdated;

  return response.json(repositoryUpdated);
});

app.delete("/repositories/:id", existResource, (request, response) => {
  // TODO
  const { id, repositoryIndex } = request.params;

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", existResource, (request, response) => {
  // TODO
  const { id, repositoryIndex } = request.params;

  repositories[repositoryIndex].likes++;

  return response
    .status(201)
    .json({ likes: repositories[repositoryIndex].likes });
});

module.exports = app;
