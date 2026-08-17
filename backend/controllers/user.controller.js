import { config } from "../config/config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import Session from "../models/session.model.js";

export async function register(req, res) {
    const { username, email, password } = req.body;
    const isAlreadyRegisterd = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (isAlreadyRegisterd) {
        return res.status(409).json({
            message: "User already registered",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    const session = new Session({
        user: user._id,
        userAgent: req.headers["user-agent"],
        ip: req.ip
    })
    const refreshToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.jwtRefreshKey, {
        expiresIn: config.refreshTokenExpiry
    })
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    session.refreshTokenHash = refreshTokenHash;
    await session.save();
    const accessToken = jwt.sign({
        id: user._id,
    }, config.jwtAccessKey, {
        expiresIn: config.accessTokenExpiry
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, //when deploy change to true
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });
    return res.status(201).json({
        message: "User registered successfully",
        user,
        accessToken
    })
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No account found with that email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const session = new Session({
            user: user._id,
            userAgent: req.headers["user-agent"],
            ip: req.ip
        });

        const refreshToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.jwtRefreshKey, {
            expiresIn: config.refreshTokenExpiry
        });

        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        session.refreshTokenHash = refreshTokenHash;
        await session.save();

        const accessToken = jwt.sign({
            id: user._id,
        }, config.jwtAccessKey, {
            expiresIn: config.accessTokenExpiry
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const { password: _pwd, ...safeUser } = user.toObject();

        return res.status(200).json({
            message: "User logged in successfully",
            user: safeUser,
            accessToken
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    const decodedToken = jwt.verify(refreshToken, config.jwtRefreshKey);
    const session = await Session.findById(decodedToken.sessionId);
    if (!session) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const isRefreshTokenCorrect = await bcrypt.compare(
        refreshToken,
        session.refreshTokenHash
    );

    if (!isRefreshTokenCorrect) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const user = await User.findById(session.user);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const accessToken = jwt.sign(
        {
            id: user._id,
            sessionId: session._id
        },
        config.jwtAccessKey,
        {
            expiresIn: config.accessTokenExpiry
        }
    );

    return res.status(200).json({
        message: "Refresh token successfully",
        accessToken
    });
}


export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "No refresh token"
        });
    }

    try {
        const decodedToken = jwt.verify(
            refreshToken,
            config.jwtRefreshKey
        );

        const session = await Session.findById(decodedToken.sessionId);

        if (!session) {
            return res.status(401).json({
                message: "Invalid session"
            });
        }

        const isRefreshTokenCorrect = await bcrypt.compare(
            refreshToken,
            session.refreshTokenHash
        );

        if (!isRefreshTokenCorrect) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        await Session.findByIdAndDelete(session._id);

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }
}

export async function getMe(req, res) {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}