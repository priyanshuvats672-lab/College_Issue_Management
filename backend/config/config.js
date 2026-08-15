import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    //mongodb credentials
    mongoDbUri: process.env.MONGODB_URI,
    //jwt credentials
    jwtAccessKey: process.env.JWT_ACCESS_KEY,
    jwtRefreshKey: process.env.JWT_REFRESH_KEY,
    //jwt expiry
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    //cloudinary credentials
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
}