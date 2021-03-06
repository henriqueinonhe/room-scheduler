import { Session } from "../models/Session";
import { User } from "../models/User";

export async function fetchUserFromSession(sessionId) {
  const session = await Session.findOne({
    where: {
      id: sessionId
    },
    include: User
  });
  return session.getUser();
}