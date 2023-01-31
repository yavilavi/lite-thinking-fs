import { DataSource } from "typeorm";
import AWS from "aws-sdk";
export declare const cleanDB: (dataSource: DataSource) => Promise<void>;
export declare const hash: (plain: string) => Promise<string>;
export declare const verifyHash: (plain: string, hash: string) => Promise<boolean>;
export declare const uploadToS3: (fileName: string) => Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError> | undefined>;
export declare const sendEmailWithAWSSES: (recipientEmail: any, pdfUrl: any) => Promise<import("aws-sdk/lib/request").PromiseResult<AWS.SES.SendEmailResponse, AWS.AWSError>>;
export declare const sendEmailWithMailJet: (recipientEmail: any, pdfUrl: any) => Promise<import("node-mailjet").LibraryResponse<import("node-mailjet/declarations/request/Request").RequestData>>;
//# sourceMappingURL=index.d.ts.map