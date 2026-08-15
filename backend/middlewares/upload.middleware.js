import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        const extension = path.extname(file.originalname).toLowerCase();

        const isValidMime = file.mimetype.startsWith("image/");
        const isValidExtension = allowedExtensions.includes(extension);

        if (isValidMime || isValidExtension) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

export default upload;