import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/issues", issueRouter);


export default app;