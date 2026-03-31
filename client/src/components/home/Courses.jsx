import React from "react";
import useCourse from "../../hooks/useCourse";
import SectionHeading from "../shared/SectionHeading";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-sm overflow-hidden transition-all duration-300 hover:border-blue-400">
      {/* Image Section */}
      <figure className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={course?.thumbnail || "https://placehold.co/600x400?text=No+Image"}
          alt={course?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-gray-200">
            {course?.category}
          </span>
        </div>
      </figure>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2 className="font-bold text-gray-900 leading-snug line-clamp-1 flex-1">
            {course?.title}
          </h2>
          <span className="text-blue-600 font-bold text-lg">
            ${course?.course_fee}
          </span>
        </div>

        <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8">
          {course?.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-5 border-t border-gray-50 pt-4">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 border border-blue-200">
            {course?.teacher?.[0]?.toUpperCase() || "T"}
          </div>
          <span className="text-xs font-medium text-gray-600">
            {course?.teacher || "Instruction Team"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/course/${course._id}`}
            className="py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white text-center text-sm font-semibold rounded-lg transition-colors"
          >
            View Details
          </Link>
          <button className="py-2 px-4 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 text-sm font-semibold rounded-lg transition-all">
            Quick Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const { allCourse, isLoading } = useCourse("");
  const courses = allCourse?.data;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <SectionHeading
            title="Explore Courses"
            subTitle="Professional-grade learning paths designed for your success."
          />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-100"></div>
            ))}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 font-medium">No courses were found in this category.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses?.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;