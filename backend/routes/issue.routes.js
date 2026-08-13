import { Router } from "express";
import { createIssue } from "../controllers/issue.controllers.js";
import { authenticateUser , authorizeRole } from "../middlewares/auth.middlewares.js";

const issueRouter = Router();

issueRouter.post(
    "/",
    authenticateUser,
    authorizeRole(["student"]),
    createIssue
);

export default issueRouter;