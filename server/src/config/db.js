import mongoose from "mongoose";
import { mongoDbAtlasUrl } from "../secret.js";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDbAtlasUrl);
        console.log("Connect to MongoDB");
        mongoose.connection.on('error', err => console.log("Db connection error: " + err));
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error.toString());
    }
}

export { connectDB };
