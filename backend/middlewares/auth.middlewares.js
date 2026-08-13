import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token , config.jwtAccessKey);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next();
    }
}