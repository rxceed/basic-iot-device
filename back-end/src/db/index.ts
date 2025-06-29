import { Sequelize } from "sequelize-typescript";
import "dotenv/config"

const DB: string = process.env.PG_DATABASE as string;
const USER: string = process.env.PG_USER as string;
const PASSWORD: string = process.env.PG_PASSWORD as string;
const HOST: string = process.env.PG_HOST as string;
const DB_PORT: number = parseInt(process.env.PG_PORT as string);

export const db = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
    models: [__dirname + '../models/*.model.ts']
});

try
{
    db.authenticate();
    console.log("Connection established to database");
}
catch(err) 
{
    console.error("Error connectiong to database: ", err);
};

