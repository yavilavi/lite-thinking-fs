import { DataSource } from "typeorm";
import * as argon2 from "argon2";
import AWS from "aws-sdk";
import fs from "fs";

const AWS_CONFIG = {
  credentials: {
    accessKeyId: "AKIAUPEZD447B7LQOSFC",
    secretAccessKey: "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"
  },
  region: "us-east-1",
}

const AWS_SES = new AWS.SES(AWS_CONFIG);

const s3 = new AWS.S3(AWS_CONFIG);

export const cleanDB = async (dataSource: DataSource) => {
  const entities = dataSource.entityMetadatas;
  // @ts-ignore - TS18048: 'process.env.NODE_ENV' is possibly 'undefined'.
  const tableNames = entities.map((entity) => `"${ process.env.NODE_ENV.trim() }"."${ entity.tableName }"`).join(", ");
  await dataSource.query(`TRUNCATE ${ tableNames } RESTART IDENTITY CASCADE;`);
}


export const hash = async (plain: string): Promise<string> => {
  try {
    return await argon2.hash(plain);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const verifyHash = async (plain: string, hash: string) => {
  try {
    return await argon2.verify(hash, plain);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const uploadToS3 = async (fileName:string) => {
  const stats = fs.statSync(fileName);
  console.log("filesize: " + stats.size);
  console.log("starting s3 putObject");
  try {
    return await s3.putObject({
      Bucket: "pruebas-yilmer/lite-thinking/pdf",
      Key: fileName,
      Body: fs.createReadStream(fileName),
      ContentType: "application/pdf",
      ContentLength: stats.size,
    }).promise();
  }catch (err) {
    // @ts-ignore
    console.log(err, err.stack);
  }
}

export const sendEmail = async (recipientEmail, pdfUrl) => {
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
          Data: `<a href="https://dnebzvlr0lrrh.cloudfront.net/lite-thinking/pdf/${ pdfUrl }">CLick to se stock PDF</a>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, There!`,
      }
    },
  };
  return await AWS_SES.sendEmail(params).promise();
};

let sendTemplateEmail = async (recipientEmail: string, doc_url: string) => {
  let params = {
    Source: 'yilmer@avila.dev',
    Template: 'Stock_Document',
    Destination: {
      ToAddresses: [
        recipientEmail
      ]
    },
    TemplateData: `'{ \"url\':\'${ doc_url }\'}'`
  };
  return await AWS_SES.sendTemplatedEmail(params).promise();
};
