import jsonWebToken from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jsonWebToken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
