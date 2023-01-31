import * as Yup from 'yup';
export declare const createItemSchema: Yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    companyNIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    stock: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    companyNIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    stock: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    companyNIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    stock: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>>;
export declare const updateItemSchema: Yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    companyNIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    stock: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    companyNIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    stock: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    companyNIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    stock: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
}>>>;
//# sourceMappingURL=ItemValidation.d.ts.map