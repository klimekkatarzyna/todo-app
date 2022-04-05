"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListSchema = exports.listIdSchema = exports.addInvitationTokenToListSchema = exports.addUserToListSchema = exports.removeMemberFromListSchema = exports.listIdRequiredSchema = void 0;
const yup_1 = require("yup");
exports.listIdRequiredSchema = (0, yup_1.object)({
    listId: (0, yup_1.string)().required(),
});
exports.removeMemberFromListSchema = (0, yup_1.object)({
    listId: (0, yup_1.string)().required() || undefined,
    member: (0, yup_1.array)().of((0, yup_1.string)()).required() || undefined,
});
exports.addUserToListSchema = (0, yup_1.object)({
    invitationToken: (0, yup_1.string)().required(),
    member: (0, yup_1.string)().required(),
});
exports.addInvitationTokenToListSchema = (0, yup_1.object)({
    listId: (0, yup_1.string)().required(),
    invitationToken: (0, yup_1.string)().required(),
    owner: (0, yup_1.string)().required(),
});
exports.listIdSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
});
exports.createListSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().max(20, "Too Long!").required("Podaj tytuł listy"),
    themeColor: (0, yup_1.string)(),
    createdAt: (0, yup_1.date)(),
    userId: (0, yup_1.string)(),
    invitationToken: (0, yup_1.string)(),
    owner: (0, yup_1.string)(),
    members: (0, yup_1.array)().of((0, yup_1.string)()),
});
