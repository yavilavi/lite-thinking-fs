import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { Item } from "../../../domain/entities/item.entity";
import { Company } from "../../../domain/entities/company.entity";

const options: DataSourceOptions = {
  type: "postgres",
  subscribers: [],
  migrations: [],
  entities: [ User, Item, Company ],
  host: process.env.PG_DB_HOSTNAME ?? "litethinking.cqs3azbh70tm.us-east-1.rds.amazonaws.com",
  port: Number(process.env.PG_DB_PORT ?? 3002),
  username: process.env.PG_DB_USERNAME ?? "litethinking",
  password: process.env.PG_DB_PASSWORD ?? "litethinking",
  database: process.env.PG_DB_DATABASE_NAME ?? "litethinking",
  schema: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development",
  synchronize: process.env.SYNC_DB ? process.env.SYNC_DB.trim() === "true" : false,
  dropSchema: false,
  logging: ["error"]
}
export const AppDataSource = new DataSource(options);
