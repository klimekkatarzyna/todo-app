import { InferType } from "yup";
export declare const listIdRequiredSchema: import("yup/lib/object").OptionalObjectSchema<{
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type ListIdType = InferType<typeof listIdRequiredSchema>;
export declare const removeMemberFromListSchema: import("yup/lib/object").OptionalObjectSchema<{
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    member: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    owner: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    listId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    invitationToken: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    owner: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type AddInvitationTokenToListType = InferType<typeof addInvitationTokenToListSchema>;
export declare const listIdSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare const createListSchema: import("yup/lib/object").OptionalObjectSchema<{
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    themeColor: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    createdAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    taskNumber: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    userId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    invitationToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    owner: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    members: import("yup").ArraySchema<import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>, import("yup/lib/types").AnyObject, string[], string[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    themeColor: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    createdAt: import("yup").DateSchema<Date, import("yup/lib/types").AnyObject, Date>;
    taskNumber: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    userId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    invitationToken: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    owner: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    members: import("yup").ArraySchema<import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>, import("yup/lib/types").AnyObject, string[], string[]>;
}>>;
export declare type CreateListType = InferType<typeof createListSchema>;
