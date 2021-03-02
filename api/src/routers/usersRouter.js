import express from "express";

export const usersRouter = express.Router();

usersRouter.route("/users")
  .get((req, res, next) => {
    //TODO
  })
  .post((req, res, next) => {
    //TODO
  });

usersRouter.route("/users/:id")
  .get((req, res, next) => {
    //TODO
  })
  .patch((req, res, next) => {
    //TODO
  })
  .delete((req, res, next) => {
    //TODO
  });