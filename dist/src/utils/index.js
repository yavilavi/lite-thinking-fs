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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithMailJet = exports.sendEmailWithAWSSES = exports.uploadToS3 = exports.verifyHash = exports.hash = exports.cleanDB = void 0;
const argon2 = __importStar(require("argon2"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const AWS_CONFIG = {
    credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_KEY_SECRET
    },
    region: "us-east-1",
};
const mailjet = node_mailjet_1.default.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
// @ts-ignore
const AWS_SES = new aws_sdk_1.default.SES(AWS_CONFIG);
// @ts-ignore
const s3 = new aws_sdk_1.default.S3(AWS_CONFIG);
const cleanDB = (dataSource) => __awaiter(void 0, void 0, void 0, function* () {
    const entities = dataSource.entityMetadatas;
    // @ts-ignore - TS18048: 'process.env.NODE_ENV' is possibly 'undefined'.
    const tableNames = entities.map((entity) => `"${process.env.NODE_ENV.trim()}"."${entity.tableName}"`).join(", ");
    yield dataSource.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
});
exports.cleanDB = cleanDB;
const hash = (plain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield argon2.hash(plain);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
});
exports.hash = hash;
const verifyHash = (plain, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield argon2.verify(hash, plain);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
});
exports.verifyHash = verifyHash;
const uploadToS3 = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = fs_1.default.statSync(fileName);
    try {
        // @ts-ignore
        return yield s3.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: fs_1.default.createReadStream(fileName),
            ContentType: "application/pdf",
            ContentLength: stats.size,
        }).promise();
    }
    catch (err) {
        // @ts-ignore
        console.log(err, err.stack);
    }
});
exports.uploadToS3 = uploadToS3;
const sendEmailWithAWSSES = (recipientEmail, pdfUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let params = {
        Source: 'yilmer@avila.dev',
        Destination: {
            ToAddresses: [
                recipientEmail
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<a href="https://dnebzvlr0lrrh.cloudfront.net/lite-thinking/pdf/${pdfUrl}">CLick to se stock PDF</a>`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Hello, There!`,
            }
        },
    };
    return yield AWS_SES.sendEmail(params).promise();
});
exports.sendEmailWithAWSSES = sendEmailWithAWSSES;
const sendEmailWithMailJet = (recipientEmail, pdfUrl) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mailjet.post('send', { version: 'v3.1' }).request({
        "Messages": [
            {
                "From": {
                    "Email": "no-reply@yilmer.work",
                    "Name": "Yilmer Daniel Avila Villarreal"
                },
                "To": [
                    {
                        "Email": `${recipientEmail}`,
                        "Name": "passenger 1"
                    }
                ],
                "TemplateID": 4550801,
                "TemplateLanguage": true,
                "Subject": "New Stock PDF report generated",
                "Variables": {
                    "pdfURL": `https://dnebzvlr0lrrh.cloudfront.net/lite-thinking/pdf/${pdfUrl}`
                }
            }
        ]
    });
});
exports.sendEmailWithMailJet = sendEmailWithMailJet;
//# sourceMappingURL=index.js.map