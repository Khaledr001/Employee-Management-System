import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/public", express.static('public'));



export default app;