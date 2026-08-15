import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = () => {
    mongoose.connect(config.mongoDbUri)
        .then(() => {
            console.log("Database connected successfully");
        }).catch((error) => {
            console.log("Database connection failed", error);
            process.exit(1);
        })
}   