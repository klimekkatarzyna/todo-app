"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIdForTasksSchema = exports.taskIdSchema = void 0;
const yup_1 = require("yup");
exports.taskIdSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
});
exports.listIdForTasksSchema = (0, yup_1.object)({
    listId: (0, yup_1.string)().required(),
});
