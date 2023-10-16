/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.SERVER_PORT || 6000;
const mongoDbLoacalUrl = process.env.MONGODB_LOCAL_URL;
const defaultImage = "/public/defaultImage.png";
const defaultUserImagePath = "./public/userImage";
const defaultEmployeeImagePath = "./public/employeeImage";
const jwtSecretKey = process.env.JWT_SECRETE_KEY || "agawegoh";
const tokenDuration = process.env.TOKEN_DURATION || '2d';
const fileSize = Number(process.env.FILE_SIZE) || 3145728;
const allowedFile = process.env.ALLOWED_FILE || ['jpg', 'png', 'jpeg', 'webp'];

export { defaultImage, mongoDbLoacalUrl, serverPort, jwtSecretKey, fileSize, allowedFile, defaultEmployeeImagePath, defaultUserImagePath, tokenDuration };

