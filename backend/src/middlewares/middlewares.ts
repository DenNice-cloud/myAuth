import jwt, { VerifyErrors } from "jsonwebtoken";

// import { NextFunction, Request, Response } from "express";
// import { STATUSE_CODE } from "../constants/statusCodes";
// import { userType } from "../types/user.type";

const secretKey = process.env.SECRET_KEY || "default_secret";
const expiresIn = "1h";

export const createToken = async (userId: number) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     return res
//       .status(STATUSE_CODE.UNAUTHORIZED.CODE)
//       .send({ message: STATUSE_CODE.UNAUTHORIZED.MSG });
//   }

//   const jwtVerify = jwt.verify(token, secretKey);
// };
