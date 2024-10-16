import { Request } from "express";
import { userType } from "./src/types/user.type";

declare global {
  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}
