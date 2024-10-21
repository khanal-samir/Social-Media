import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // cookies and header allow
  })
);

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.route.js";
import tweetRouter from "./routes/tweet.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tweet", tweetRouter);

export { app };
