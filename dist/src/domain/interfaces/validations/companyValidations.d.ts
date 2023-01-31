import * as Yup from 'yup';
export declare const createCompanySchema: Yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    address: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    address: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    address: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>>;
export declare const updateCompanySchema: Yup.ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    address: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    address: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    NIT: Yup.NumberSchema<number | undefined, import("yup/lib/types").AnyObject, number | undefined>;
    name: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    address: Yup.StringSchema<string | undefined, import("yup/lib/types").AnyObject, string | undefined>;
    phone: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>>;
//# sourceMappingURL=companyValidations.d.ts.map