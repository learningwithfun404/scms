const {Router} = require("express")
const { noticeCreateHandler, noticeFindHandler, singleNoticeFindHandler, deleteNoticeFindHandler, updateNoticeFindHandler } = require("../controller/notice.controller")

const noticeRouter = Router()

noticeRouter.post("/create", noticeCreateHandler);
noticeRouter.get("/find", noticeFindHandler);
noticeRouter.get("/find-single/:id", singleNoticeFindHandler);
noticeRouter.delete("/delete/:id", deleteNoticeFindHandler);
noticeRouter.put("/update/:id", updateNoticeFindHandler);

module.exports = noticeRouter;