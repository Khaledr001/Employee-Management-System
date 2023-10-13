import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { employeeRouter } from "./routes/employeeRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/public", express.static('public'));

app.use("/api/employee", employeeRouter);
app.use("/api/users", userRouter);


export default app;