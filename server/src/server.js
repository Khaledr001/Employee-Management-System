import app from './app.js';
import { connectDB } from "./config/db.js";
import { serverPort } from "./secret.js";

app.listen(serverPort, async () => { 
    console.log(`server is running at ${serverPort}`);

    await connectDB();
})
