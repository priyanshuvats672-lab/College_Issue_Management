import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , "Username is required"],
        unique: [true , "Username already exists"],
        trim: true,
    },
    email : {
        type: String,
        required: [true , "Email is required"],
        unique: [true , "Email already exists"],
        trim: true,
    },
    password : {
        type: String,
        required: [true , "Password is required"],
        min: [6 , "Password must be at least 6 characters long"],
    },
    role : {
        type: String,
        enum: ["admin", "student", "teacher"],
        default: "student",
    },  
})

export const User = mongoose.model("User", userSchema);