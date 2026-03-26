const Course = require("../models/course.model");

const createNewCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    if (!course) {
      res.status(400).json({
        statusCode: 400,
        message: "Failed to create course",
      });
      return;
    }
    res.status(201).json({
      statusCode: 201,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: "Course not found",
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      res.status(404).json({
        statusCode: 404,
        message: "Course not found",
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      res.status(404).json({
        statusCode: 404,
        message: "Course not found",
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      res.status(404).json({
        statusCode: 404,
        message: "Course not found",
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createNewCourse,
  getAllCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
