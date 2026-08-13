import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true , "User is required"]
    },
    refreshTokenHash:{
        type: String,
        required:[true , "Refresh token hash is required"]
    },
    userAgent:{//devices in which user is logged in(mobile , desktop , etc)
        type: String,
        required:[true , "User agent is required"]
    },
    ip:{
        type: String,
        required:[true , "IP address is required"]
    },
    revoked:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

const Session = mongoose.model("Session" , sessionSchema);

export default Session;