import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { Item } from "../../../domain/entities/item.entity";
import { Company } from "../../../domain/entities/company.entity";

const options: DataSourceOptions = {
  type: "postgres",
  subscribers: [],
  migrations: [],
  entities: [ User, Item, Company ],
  host: process.env.PG_DB_HOSTNAME,
  port: 3002,
  username: process.env.PG_DB_USERNAME ,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_DATABASE_NAME,
  schema: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development",
  synchronize: process.env.SYNC_DB ? process.env.SYNC_DB.trim() === "true" : false,
  dropSchema: false,
  logging: ["error"]
}
export const AppDataSource = new DataSource(options);
