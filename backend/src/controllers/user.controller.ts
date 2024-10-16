import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { userType } from "../types/user.type";
import { validationResult } from "express-validator";
import { STATUSE_CODE } from "../constants/statusCodes";
import bcrypt from "bcrypt";
import { createToken } from "../middlewares/middlewares";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const showAllUsers = await prisma.user.findMany();

  res.status(STATUSE_CODE.OK.CODE).send(showAllUsers);
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

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res
      .status(STATUSE_CODE.BAD_REQUEST.CODE)
      .json({ errors: error.array().map((errMsg) => errMsg.msg) })
      .send({ message: `${STATUSE_CODE.BAD_REQUEST.MSG}` });
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
    next(err);
  }
};

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res
      .status(STATUSE_CODE.BAD_REQUEST.CODE)
      .json({ errors: error.array().map((errMsg) => errMsg.msg) })
      .send({ message: `${STATUSE_CODE.BAD_REQUEST.MSG}` });
    return;
  }

  const { email, password }: userType = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    }); //findByEmail

    if (!userExist) {
      res
        .status(STATUSE_CODE.BAD_REQUEST.CODE)
        .json({ message: "Email ain't registered yet" });
      return;
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

    res
      .status(STATUSE_CODE.OK.CODE)
      .json({ message: "Password and Email is OK, welcome!" });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  getAllUsers,
  registerUser,
  removeUser,
  loginUser,
};
