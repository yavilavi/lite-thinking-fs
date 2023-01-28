import { expressjwt } from "express-jwt";

export const adminRequired = (req, res, next) => {
  if (req.auth.role === "ADMIN") {
    console.log("req.auth", req.auth);
    next();
  } else {
    console.log("req.auth resmw", req.auth);
    res.status(403).send({ message: "You don't have permissions to access this resource" })
  }
}

export const secured = () => expressjwt(
  {
    secret: process.env.JWT_SECRET ?? "development",
    algorithms: [ "HS256" ]
  }
);

