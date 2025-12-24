const {Router} = require("express")
const { clerkWebhookHandler } = require("../controller/user.controller")

const userRouter = Router()



// http:localhost:4000/api/v1/user/clerk-webhook
userRouter.post("/clerk-webhook", clerkWebhookHandler)

module.exports = userRouter;