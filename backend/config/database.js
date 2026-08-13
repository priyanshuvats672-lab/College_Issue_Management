import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Database connected successfully");
        }).catch((error) => {
            console.log("Database connection failed", error);
            process.exit(1);
        })
}