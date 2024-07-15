const express = require("express");
const app = express();
const { getTopics, getArticleById } = require("./controllers/controller");
const endpoints = require("./endpoints.json");
const {
	psqlErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require("./error-handlers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", (request, response, next) => {
	response.status(200).send({ endpoints: endpoints });
});

app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
	res.status(404).send({ message: "Path not found" });
});

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
