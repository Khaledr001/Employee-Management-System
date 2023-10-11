import mongoose from "mongoose";
import { mongoDbLoacalUrl } from "../secret.js";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDbLoacalUrl);
        console.log("Connect to MongoDB");
        mongoose.connection.on('error', err => console.log("Db connection error: " + err));
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error.toString());
    }
}

export { connectDB };
