import { InferType } from "yup";
export declare const loginValidationSchema: import("yup/lib/object").OptionalObjectSchema<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type LoginValidationType = InferType<typeof loginValidationSchema>;
export declare const registerValidationSchema: import("yup/lib/object").OptionalObjectSchema<{
    username: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    username: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type RegisterValidationType = InferType<typeof registerValidationSchema>;
