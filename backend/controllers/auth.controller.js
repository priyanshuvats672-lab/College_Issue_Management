import { config } from "../config/config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { Session } from "../models/session.model.js";

export async function register(req , res) {
    const {username , email , password} = req.body;
    const isAlreadyRegisterd = await User.findOne({
        $or: [{email} , {username}]
    })
    if(isAlreadyRegisterd){
        return res.status(409).json({
            message: "User already registered"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    const refreshToken = jwt.sign({
        id: user._id
    } , config.jwtRefreshKey , {
        expiresIn: "1d"
    })
    const refreshTokenHash = await bcrypt.hash(refreshToken , 10);

    const session = await Session.create({
        refreshToken : refreshTokenHash,
        user : user._id,
        userAgent: req.headers["user-agent"],
        ip: req.ip
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    } , config.jwtAccessKey , {
        expiresIn: "15m"
    })
    return res.status(201).json({
        message: "User registered successfully",
        user,
        accessToken
    })
}

export async function login(req , res) {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message: "User not found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
);
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid email or Password"
        })
    }
    const refreshToken = jwt.sign({
        id: user._id
    } , config.jwtRefreshKey , {
        expiresIn: "1d"
    })
    const refreshTokenHash = await bcrypt.hash(refreshToken , 10);

    const session = await Session.create({
        refreshToken : refreshTokenHash,
        user : user._id,
        userAgent: req.headers["user-agent"],
        ip: req.ip
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    } , config.jwtAccessKey , {
        expiresIn: "15m"
    })
    return res.status(200).json({
        message: "User logged in successfully",
        user,
        accessToken
    })

}

const refreshToken = async (req , res) => {
    const {refreshToken} = req.body;
    const session = await Session.findById(req.user.sessionId);
    if(!session){
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
    const isRefreshTokenCorrect = await bcrypt.compare(
    refreshToken,
    session.refreshToken
);
    if(!isRefreshTokenCorrect){
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
    const user = await User.findById(session.user);
    if(!user){
        return res.status(401).json({
            message: "User not found"
        })
    }
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    } , config.jwtAccessKey , {
        expiresIn: "15m"
    })
    return res.status(200).json({
        message: "Refresh token successfully",
        accessToken
    })
}


export async function logout(req , res) {
    const refreshToken = req.body.refreshToken;
    const session = await Session.findById(req.user.sessionId);
    if(!session){
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
    const refreshTokenHash = await bcrypt.hash(refreshToken , 10);
    if(refreshTokenHash !== session.refreshToken){
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
    await Session.findByIdAndDelete(session._id);
    return res.status(200).json({
        message: "User logged out successfully"
    })
}