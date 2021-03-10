import { AuthorizationError } from "../exceptions/AuthorizationError.js";
import { controllerMethodWrapper } from "../helpers/controllerHelper.js";
import { AllocationsService } from "../services/AllocationsService.js";

export class AllocationsController {
  static fetchAllocations = controllerMethodWrapper(async (req, res, next) => {
    const query = req.query;
    const fetchedAllocations = await AllocationsService.fetchAllocations(query);
    res.send(fetchedAllocations);
  });

  static fetchSingleAllocation = controllerMethodWrapper(async (req, res, next) => {
    const { id } = req.params;
    const fetchedAllocation = await AllocationsService.fetchSingleAllocation(id);
    res.send(fetchedAllocation);
  });

  static createAllocation = controllerMethodWrapper(async (req, res, next) => {
    const createAllocationData = req.body;
    const createdAllocation = await AllocationsService.createAllocation(createAllocationData);
    res.send(createdAllocation);
  });

  static deleteAllocation = controllerMethodWrapper(async (req, res, next) => {
    const { id } = req.params;
    const deletedAllocation = await AllocationsService.deleteAllocation(id);
    res.send(deletedAllocation);
  });

  static fetchUserAllocations = controllerMethodWrapper(async (req, res, next) => {
    const { id } = req.params;
    const query = {
      userId: id,
      ...req.query
    };
    const fetchedAllocations = await AllocationsService.fetchAllocations(query);
    res.send(fetchedAllocations);
  });

  static fetchRoomAllocations = controllerMethodWrapper(async (req, res, next) => {
    const { id } = req.params;
    const query = {
      roomId: id,
      ...req.query
    };
    const fetchedAllocations = await AllocationsService.fetchAllocations(query);
    res.send(fetchedAllocations);
  });

  static authorizeWriteOperation = controllerMethodWrapper(async (req, res, next) => {
    const authenticatedUser = req.authenticatedUser;
    const userId = authenticatedUser.id;
    const userRole = authenticatedUser.role;
    const receivedUserId = req.params["userId"];
    if(userRole !== "admin" && 
       receivedUserId !== userId) {
      throw new AuthorizationError("As a non-admin user, you cannot create/delete an allocation to another user!", "NonAdminTryingAllocationWriteOperationToAnotherUser");
    }
  });
}