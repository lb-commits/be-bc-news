const express = require("express");
const cors = require("cors");
const app = express();
const {
	getTopics,
	getArticleById,
	getArticles,
	getCommentsByArticleId,
	getUsers,
} = require("./controllers/get-controllers");
const { postComment } = require("./controllers/post-controllers");
const { patchArticle } = require("./controllers/patch-controllers");
const { deleteComment } = require("./controllers/delete-controllers");
const endpoints = require("./endpoints.json");
const {
	psqlErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require("./error-handlers");

app.use(cors());
app.use(express.json());

app.get("/api", (request, response, next) => {
	response.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", (req, res) => {
	res.status(404).send({ message: "Path not found" });
});

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
