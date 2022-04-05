import { InferType, SchemaOf } from "yup";
import { IList } from "../types";
export declare const listIdRequiredSchema: import("yup/lib/object").OptionalObjectSchema<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type ListIdType = InferType<typeof listIdRequiredSchema>;
export declare const removeMemberFromListSchema: import("yup/lib/object").OptionalObjectSchema<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/array").RequiredArraySchema<import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>, import("yup/lib/types").AnyObject, string[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/array").RequiredArraySchema<import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>, import("yup/lib/types").AnyObject, string[]>;
}>>;
export declare type RemoveMemberFromListType = InferType<typeof removeMemberFromListSchema>;
export declare const addUserToListSchema: import("yup/lib/object").OptionalObjectSchema<{
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type AddUserToListType = InferType<typeof addUserToListSchema>;
export declare const addInvitationTokenToListSchema: import("yup/lib/object").OptionalObjectSchema<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    owner: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    owner: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type AddInvitationTokenToListType = InferType<typeof addInvitationTokenToListSchema>;
export declare const listIdSchema: import("yup/lib/object").OptionalObjectSchema<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare const createEditListSchema: SchemaOf<IList>;
export declare type CreateEditListType = InferType<typeof createEditListSchema>;
