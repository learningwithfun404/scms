const express = require("express");
require("dotenv").config();
const dbConnection = require("./src/config/db");
const { clerkMiddleware } = require("@clerk/express");
const userRouter = require("./src/routes/User.router");
const noticeRouter = require("./src/routes/notice.router");
const cors = require("cors");
const courseRouter = require("./src/routes/course.router");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
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

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.log(
      "Failed to start the server due to a DB connection error",
      error,
    );
    process.exit(1);
  }
});
