export function fetchAuthenticatedUser(req) {
  const sessionId = req.cookies["sessionId"];
  if(!sessionId) {
    return null; //Means anonymous user (not authenticated)
  }

  const session = await Session.findOne({
    where: { sessionId },
    include: User
  });

  return session.User;
}