import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { userType } from "../types/user.type";
import { validationResult } from "express-validator";
import { STATUSE_CODE } from "../constants/statusCodes";
import bcrypt from "bcrypt";
import { createToken } from "../middlewares/middlewares";
import jwt from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const showAllUsers = await prisma.user.findMany();

  res.status(STATUSE_CODE.OK.CODE).send(showAllUsers);
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY!) as { id: number };
    const currentUser = await prisma.user.findUnique({
      where: { id: decode.id },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

  res.status(STATUSE_CODE.OK.CODE).json({ message: currentUser });
  } catch (error) {
    res.status(STATUSE_CODE.BAD_REQUEST.CODE).json({
      message: (error as Error).message || "Error to authorize",
    });
  }
};

const removeUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = parseInt(id);
  const userExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExist) {
    res
      .status(STATUSE_CODE.NOT_FOUND.CODE)
      .json({ message: `User Id is ${STATUSE_CODE.NOT_FOUND.MSG}` });
    return;
  }

  await prisma.user.delete({ where: { id: userId } });

  res.status(STATUSE_CODE.OK.CODE).send({ message: "User was deleted" });
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res
      .status(STATUSE_CODE.BAD_REQUEST.CODE)
      .json({ errors: error.array().map((errMsg) => errMsg.msg) });
    return;
  }

  const { username, email, password, JWT_access, JWT_restore }: userType =
    req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    }); //findByEmail

    if (userExist) {
      res
        .status(STATUSE_CODE.BAD_REQUEST.CODE)
        .json({ message: "Email is already exist" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const addToken = await createToken(createUser.id);
    createUser.JWT_access = addToken;

    res.status(STATUSE_CODE.OK.CODE).json({ user: createUser });

    // const response = await axios.post('/register', userData);
    // localStorage.setItem('token', response.data.token);
  } catch (err) {
    res.status(STATUSE_CODE.BAD_REQUEST.CODE).json({
      message: (err as Error).message || "Error to login",
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res
      .status(STATUSE_CODE.BAD_REQUEST.CODE)
      .json({ errors: error.array().map((errMsg) => errMsg.msg) });
    return;
  }

  const { email, password }: userType = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    }); //findByEmail

    if (!userExist) {
      throw new Error("Email ain't registered yet");
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);

    if (!comparePassword) {
      throw new Error("Password is wrong");
    }
    // мне нужно создавать новый accessToken при Логине и Регисрации?

    // при логине нужно сначала декодировать пароль + сверить пароль в БД,
    // если совпали, создать токен и зайти пользователю,
    // сохранения текущего пользователя происходит в localStorage на фронтенде и мне потом все данніе (к примеру тудушки)
    // брать с локального хранилища??

    //при логине на фронте я записіваю токен пользователяс бази данних в локальное хранилище?

    const addToken = await createToken(userExist.id);
    userExist.JWT_access = addToken;

    res
      .status(STATUSE_CODE.OK.CODE)
      .json({ message: "Password and Email is OK, welcome!", data: userExist });
  } catch (error) {
    res.status(STATUSE_CODE.BAD_REQUEST.CODE).json({
      message: (error as Error).message || "Error to login",
    });
  }
};

export const userControllers = {
  getAllUsers,
  registerUser,
  removeUser,
  loginUser,
  getUser,
};
