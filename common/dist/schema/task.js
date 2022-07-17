"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditTaskSchema = exports.listIdForTasksSchema = exports.taskIdSchema = void 0;
const yup_1 = require("yup");
const types_1 = require("../types");
exports.taskIdSchema = (0, yup_1.object)({
    _id: (0, yup_1.string)().required(),
});
exports.listIdForTasksSchema = (0, yup_1.object)({
    parentFolderId: (0, yup_1.string)().required(),
});
exports.createEditTaskSchema = (0, yup_1.object)({
    createdAt: (0, yup_1.date)().optional(),
    importance: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.Importance))
        .optional(),
    parentFolderId: (0, yup_1.string)().optional(),
    groupName: (0, yup_1.string)().optional(),
    title: (0, yup_1.string)()
        .min(3, "Too short!")
        .max(50, "Too Long!")
        .required("Dodaj nazwę zadania"),
    themeColor: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.AppColor))
        .optional(),
    _id: (0, yup_1.string)().optional(),
    taskStatus: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.ITaskStatus))
        .optional(),
    deadline: (0, yup_1.string)().optional(),
    isMyDay: (0, yup_1.boolean)().optional(),
    assigned: (0, yup_1.string)().optional(),
    sortType: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.SortType))
        .optional(),
    createdBy: (0, yup_1.string)(),
    members: (0, yup_1.array)().of((0, yup_1.string)()),
});
