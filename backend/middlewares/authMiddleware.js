import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403);
    throw new Error("Authorization request denied: no token!");
  }

  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      res.status(403);
      throw new Error("Authorization request denied: invalid token!");
    }

    req.user = { _id: user._id, email: user.email };
  } catch (error) {
    res.status(403);
    throw new Error("Authorization request denied: invalid token!");
  }

  next();
};

export default authMiddleware;
