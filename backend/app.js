import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cookieParser());

//Routes
import userRouter from "./routes/user.routes.js";
import issueRouter from "./routes/issue.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/issues", issueRouter);


export default app;