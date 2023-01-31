/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="node" />
export declare const adminRequired: (req: any, res: any, next: any) => void;
export declare const secured: () => {
    (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction): Promise<void | NodeJS.Immediate>;
    unless: typeof import("express-unless").unless;
};
//# sourceMappingURL=middlewares.d.ts.map