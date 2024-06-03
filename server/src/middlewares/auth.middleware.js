import { getPayload } from "../utils/jwtToken.js";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = Array.isArray(authHeader)
    ? authHeader[0].split(" ")[1]
    : authHeader && authHeader.split(" ")[1];
  // console.log(token);

  if (token === null || token === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = getPayload(token);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    return res.sendStatus(403);
  }
};
