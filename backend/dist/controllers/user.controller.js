"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const getAllUsers = async (req, res) => {
    res.status(200).send('Hello');
};
exports.userControllers = {
    getAllUsers,
};
