import express from "express";

export const roomsRouter = express.Router();

roomsRouter.route("/rooms")
  .get((req, res, next) => {
    //TODO
  })
  .post((req, res, next) => {
    //TODO
  });

roomsRouter.route("/rooms/:id")
  .get((req, res, next) => {
    //TODO
  })
  .patch((req, res, next) => {
    //TODO
  })
  .delete((req, res, next) => {
    //TODO
  });