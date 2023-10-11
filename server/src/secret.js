/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.SERVER_PORT || 6000;
const mongoDbLoacalUrl = process.env.MONGODB_LOCAL_URL

export {serverPort, mongoDbLoacalUrl} ;
