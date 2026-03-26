const { Router } = require("express");
const { createNewCourse, getAllCourse, getCourseById, deleteCourseById, updateCourseById } = require("../controller/course.controller");

const courseRouter = Router();

courseRouter.post("/create", createNewCourse);
courseRouter.get("/find", getAllCourse);
courseRouter.get("/find/:id", getCourseById);
courseRouter.delete("/delete/:id", deleteCourseById);
courseRouter.put("/update/:id", updateCourseById);

module.exports = courseRouter;
