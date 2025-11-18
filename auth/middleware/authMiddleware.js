import jsonWebToken from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (!token) {
    return res.status(401).json({ message: "No token. Not authorized" });
  }

  jsonWebToken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("JWT Error: " + err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    } else {
      req.userId = decodedToken.id;
      next();
    }
  });
};

//check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jsonWebToken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("JWT Error: " + err.message);
        res.locals.user = null;
        next();
      } else {
        res.locals.user = decodedToken.id;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
