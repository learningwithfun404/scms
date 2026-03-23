const { Router } = require("express");
const {
  clerkWebhookHandler,
  getLoggedInUser,
} = require("../controller/user.controller");

const userRouter = Router();

// http:localhost:4000/api/v1/user/clerk-webhook
userRouter.post("/clerk-webhook", clerkWebhookHandler);
userRouter.get("/me", getLoggedInUser);

module.exports = userRouter;
