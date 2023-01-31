import { DataSource } from "typeorm";
import * as argon2 from "argon2";
import AWS from "aws-sdk";
import fs from "fs";
import Mailjet from 'node-mailjet';

const AWS_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET
  },
  region: "us-east-1",
}

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC as string,
  process.env.MJ_APIKEY_PRIVATE as string,
);

// @ts-ignore
const AWS_SES = new AWS.SES(AWS_CONFIG);

// @ts-ignore
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

export const uploadToS3 = async (fileName: string) => {
  const stats = fs.statSync(fileName);
  console.log("filesize: " + stats.size);
  console.log("starting s3 putObject");
  try {
    // @ts-ignore
    return await s3.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fs.createReadStream(fileName),
      ContentType: "application/pdf",
      ContentLength: stats.size,
    }).promise();
  } catch (err) {
    // @ts-ignore
    console.log(err, err.stack);
  }
}

export const sendEmailWithAWSSES = async (recipientEmail, pdfUrl) => {
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


export const sendEmailWithMailJet = async (recipientEmail, pdfUrl) => {

  return await mailjet.post('send', { version: 'v3.1' }).request({
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
          "pdfURL": `https://dnebzvlr0lrrh.cloudfront.net/lite-thinking/pdf/${ pdfUrl }`
        }
      }
    ]
  });


}
