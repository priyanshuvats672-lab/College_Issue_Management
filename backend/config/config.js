import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    mongoDbUri: process.env.MONGODB_URI,
    jwtAccessKey: process.env.JWT_ACCESS_KEY,
    jwtRefreshKey: process.env.JWT_REFRESH_KEY,
}