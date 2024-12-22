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
import followRouter from "./routes/follower.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
import notificationRouter from "./routes/notification.route.js";
import healthcheckRouter from "./routes/healthCheck.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/notification", notificationRouter);
export { app };
