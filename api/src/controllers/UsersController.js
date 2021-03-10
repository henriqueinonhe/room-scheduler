import { controllerMethodWrapper } from "../helpers/controllerHelper.js";
import { UsersService } from "../services/UsersService.js";

export class UsersController {
  static fetchUsers = controllerMethodWrapper(async (req, res, next) => {
    const { query } = req;
    const fetchedUsers = await UsersService.fetchUsers(query)
    res.send(fetchedUsers);
  });

  static fetchSingleUser = controllerMethodWrapper(async (req, res, next) => {
    const id = req.params["id"];
    const fetchedUser = await UsersService.fetchSingleUser(id);
    res.send(fetchedUser);
  });

  static createUser = controllerMethodWrapper(async (req, res, next) => {
    const createUserData = req.body;
    const createdUser = await UsersService.createUser(createUserData);
    res.status(201).send(createdUser);
  });

  static updateUser = controllerMethodWrapper(async (req, res, next) => {
    const id = req.params["id"];
    const updateUserData = req.body;
    const updatedUser = await UsersService.updateUser(id, updateUserData);  

    res.status(201).send(updatedUser);
  });

  static deleteUser = controllerMethodWrapper(async (req, res, next) => {
    const id = req.params["id"];
    const deletedUser = await UsersService.deleteUser(id);
    res.send(deletedUser);
  });
}