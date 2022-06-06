"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditGroupSchema = void 0;
const yup_1 = require("yup");
const types_1 = require("../types");
exports.createEditGroupSchema = (0, yup_1.object)({
    createdAt: (0, yup_1.date)().optional(),
    title: (0, yup_1.string)().max(20, "Too Long!").required("Dodaj nazwę grupy"),
    themeColor: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.AppColorTypeEnum))
        .optional(),
    _id: (0, yup_1.string)().optional(),
    userId: (0, yup_1.string)().optional(),
    lists: (0, yup_1.array)().of((0, yup_1.string)()).optional(),
    listId: (0, yup_1.string)().optional(),
});
