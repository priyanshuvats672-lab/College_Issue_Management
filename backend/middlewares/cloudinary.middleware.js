import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

export const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "college-issues"
        });

        req.file.cloudinaryUrl = result.secure_url;
        req.file.cloudinaryPublicId = result.public_id;

        await fs.unlink(req.file.path);

        next();
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);

        return res.status(500).json({
            message: "Image upload failed"
        });
    }
};