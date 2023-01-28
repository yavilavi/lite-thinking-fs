import { DataSource } from "typeorm";
import * as argon2 from "argon2";

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
