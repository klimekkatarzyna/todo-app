"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditListSchema = exports.listIdSchema = exports.addInvitationTokenToListSchema = exports.removeMemberFromListSchema = exports.listIdRequiredSchema = void 0;
const yup_1 = require("yup");
const types_1 = require("../types");
exports.listIdRequiredSchema = (0, yup_1.object)({
    _id: (0, yup_1.string)().required(),
});
exports.removeMemberFromListSchema = (0, yup_1.object)({
    _id: (0, yup_1.string)().required() || undefined,
    member: (0, yup_1.string)().required() || undefined,
});
exports.addInvitationTokenToListSchema = (0, yup_1.object)({
    _id: (0, yup_1.string)().required(),
    invitationToken: (0, yup_1.string)().required(),
    owner: (0, yup_1.string)().required(),
});
exports.listIdSchema = (0, yup_1.object)({
    _id: (0, yup_1.string)().required(),
});
exports.createEditListSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().max(20, "Too Long!").required("Podaj tytuł listy"),
    themeColor: (0, yup_1.mixed)()
        .oneOf(Object.values(types_1.AppColorTypeEnum))
        .optional(),
    createdAt: (0, yup_1.date)().optional(),
    userId: (0, yup_1.string)().optional(),
    invitationToken: (0, yup_1.string)().optional(),
    owner: (0, yup_1.string)().optional(),
    members: (0, yup_1.array)().of((0, yup_1.string)()).optional(),
    member: (0, yup_1.string)(),
    _id: (0, yup_1.string)().optional(),
    url: (0, yup_1.string)().optional(),
    isMainList: (0, yup_1.boolean)().optional(),
});
