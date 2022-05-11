import { InferType, SchemaOf } from "yup";
import { IGroup } from "../types";
export declare const createEditGroupSchema: SchemaOf<IGroup>;
export declare type CreateEditGroupType = InferType<typeof createEditGroupSchema>;
