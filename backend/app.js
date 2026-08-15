import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"))

//Routes
import userRouter from "./routes/user.routes.js";
import issueRouter from "./routes/issue.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/issues", issueRouter);


export default app;