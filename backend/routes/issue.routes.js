import { Router } from "express";
import {
    createIssue,
    deleteIssue,
    getIssues,
    getOneIssue,
    assignIssue,
    updateIssueStatus
} from "../controllers/issue.controllers.js";

import {
    authenticateUser,
    authorizeRole
} from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/upload.middleware.js";
import { uploadToCloudinary } from "../middlewares/cloudinary.middleware.js";

const issueRouter = Router();

issueRouter.post(
    "/",
    authenticateUser,
    authorizeRole(["student"]),
    upload.single("image"),
    uploadToCloudinary,
    createIssue
);
issueRouter.get(
    "/",
    authenticateUser,
    authorizeRole(["student", "staff", "admin"]),
    getIssues
);

issueRouter.get(
    "/:issueId",
    authenticateUser,
    authorizeRole(["student", "staff", "admin"]),
    getOneIssue
);

issueRouter.patch(
    "/:issueId/assign",
    authenticateUser,
    authorizeRole(["admin"]),
    assignIssue
);

issueRouter.patch(
    "/:issueId/status",
    authenticateUser,
    authorizeRole(["admin", "staff"]),
    updateIssueStatus
);

issueRouter.delete(
    "/:issueId",
    authenticateUser,
    authorizeRole(["student", "admin"]),
    deleteIssue
);

export default issueRouter;