const express = require("express");
require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express");
const userRouter = require("./routes/User.router");
const noticeRouter = require("./routes/notice.router");
const cors = require("cors");
const courseRouter = require("./routes/course.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://scms-client-gamma.vercel.app"],
    credentials: false,
  }),
);

app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "School management server is running...",
  });
});

app.use("/api/v1/user", userRouter);

app.use("/api/v1/notice", noticeRouter);

app.use("/api/v1/course", courseRouter);

// not found route handler

app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
    error: err.message,
  });
});

module.exports = app;
