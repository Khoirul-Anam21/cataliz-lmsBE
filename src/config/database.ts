import { config } from "dotenv";
import { setupEnvironment } from "./environment.js";


setupEnvironment(process.env.NODE_ENV as string); 
console.log("INI ENV: " + process.env.NODE_ENV);
console.log("INI DB: "+process.env.DATABASE_NAME as string);

config()
export interface IMongodbConfig {
  driver: "mongodb";
  protocol: string;
  url?: string;
  host: string;
  port: number;
  name: string;
  username?: string;
  password?: string;
}

export interface IDatabaseConfig {
  default: string;
  mongodb: IMongodbConfig;
  [key: string]: any;
}

export const connection: IDatabaseConfig = {
  default: "mongodb",
  mongodb: {
    driver: "mongodb",
    protocol: "mongodb",
    url: process.env.DATABASE_URL as string,
    host: "0.0.0.0",
    port: 27017,
    name: process.env.DATABASE_NAME as string,
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
  },
};


