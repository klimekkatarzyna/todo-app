import { InferType, SchemaOf } from "yup";
import { ITask } from "../types";
export declare const taskIdSchema: import("yup/lib/object").OptionalObjectSchema<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    _id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare const listIdForTasksSchema: import("yup/lib/object").OptionalObjectSchema<{
    parentFolderId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    parentFolderId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare const createEditTaskSchema: SchemaOf<ITask>;
export declare type CreateEditTaskType = InferType<typeof createEditTaskSchema>;
