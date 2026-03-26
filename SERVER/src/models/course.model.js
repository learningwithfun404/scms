const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  course_fee: {
    type: Number,
    required: true,
  },
});

const Course = model("Course", courseSchema);

module.exports = Course;
