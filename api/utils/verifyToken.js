import jwt from "jsonwebtoken";
import { createError } from "./../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Usted no se ha auntenticado"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(401, "Token no valido"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken
    (req,
    res,next,
    () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(
          createError(403, "No esta autorizado para realizar esta solicutud")
        );
      }
    });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken
    (req,
    res,next,
    () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(
          createError(403, "No esta autorizado para realizar esta solicutud")
        );
      }
    });
};
