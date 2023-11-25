import type {Constraint, FieldName, FormValue, UnionKeyof, UnionKeyType} from "@conform-to/dom";

export type BaseMetadata<Schema> = {
    key?: string;
    id: string;
    errorId: string;
    descriptionId: string;
    initialValue: FormValue<Schema>;
    value: FormValue<Schema>;
    errors: string[] | undefined;
    allErrors: Record<string, string[]>;
    allValid: boolean;
    valid: boolean;
    dirty: boolean;
};
export type FieldMetadata<Schema> = BaseMetadata<Schema> & {
    formId: string;
    name: FieldName<Schema>;
    constraint?: Constraint;
};
export type FieldsetMetadata<Schema> = Schema extends Array<any> ? {
    [Key in keyof Schema]: FieldMetadata<Schema[Key]>;
} : Schema extends {
    [key in string]?: any;
} ? {
    [Key in UnionKeyof<Schema>]: FieldMetadata<UnionKeyType<Schema, Key>>;
} : Record<string | number, FieldMetadata<any>>;