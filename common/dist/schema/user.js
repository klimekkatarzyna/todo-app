"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidationSchema = exports.loginValidationSchema = void 0;
const yup_1 = require("yup");
exports.loginValidationSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().email().required("Required"),
    password: (0, yup_1.string)()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
});
exports.registerValidationSchema = (0, yup_1.object)({
    username: (0, yup_1.string)().required("Required"),
    email: (0, yup_1.string)().email().required("Required"),
    password: (0, yup_1.string)()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
});
