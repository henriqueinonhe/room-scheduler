import { ValidationError } from "../exceptions/ValidationError.js";

export async function handleError(error, req, res, next) {
  if(error instanceof ValidationError) {
    res.status(422).send({ error });
  }
  else {
    res.status(500).send({ error });
  }
}