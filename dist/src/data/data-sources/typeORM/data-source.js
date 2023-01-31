"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../domain/entities/user.entity");
const item_entity_1 = require("../../../domain/entities/item.entity");
const company_entity_1 = require("../../../domain/entities/company.entity");
const options = {
    type: "postgres",
    subscribers: [],
    migrations: [],
    entities: [user_entity_1.User, item_entity_1.Item, company_entity_1.Company],
    host: process.env.PG_DB_HOSTNAME,
    port: 3002,
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE_NAME,
    schema: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development",
    synchronize: process.env.SYNC_DB ? process.env.SYNC_DB.trim() === "true" : false,
    dropSchema: false,
    logging: ["error"]
};
exports.AppDataSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=data-source.js.map