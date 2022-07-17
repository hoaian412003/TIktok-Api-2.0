import dotenv from 'dotenv';
dotenv.config();

export const postgresUrl = process.env.POSTGRE_URL;
export const port = process.env.PORT;
export const server = process.env.SERVER;
export const secret = process.env.SECRET;
export const salt = process.env.SALT;
