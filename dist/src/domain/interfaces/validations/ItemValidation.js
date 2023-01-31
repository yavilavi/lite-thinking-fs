"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemSchema = exports.createItemSchema = void 0;
const Yup = __importStar(require("yup"));
exports.createItemSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is to short')
        .max(40, 'Name is to long')
        .required('Item name is required'),
    companyNIT: Yup.number()
        .required('company NIT is required')
        .test('len', 'company NIT is too long', (val) => !val ? false : val.toString().length <= 12)
        // @ts-ignore
        .test('len', 'company NIT Requires at least 6 digits', (val) => !val ? false : val.toString().length >= 6)
        .typeError('company NIT must be a number'),
    stock: Yup.number()
        .required('Stock is required')
        .min(0, "Stock can not be empty")
        .typeError('Stock must be a number'),
});
exports.updateItemSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is to short')
        .max(40, 'Name is to long'),
    companyNIT: Yup.number()
        // @ts-ignore
        .test('len', 'company NIT Requires at least 6 digits', (val) => !val ? false : val.toString().length >= 6)
        .typeError('company NIT must be a number'),
    stock: Yup.number()
        .min(0, "Stock can not be empty")
        .typeError('Stock must be a number'),
});
//# sourceMappingURL=ItemValidation.js.map