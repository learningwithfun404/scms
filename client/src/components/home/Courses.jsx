import React from "react";
import useCourse from "../../hooks/useCourse";
import SectionHeading from "../shared/SectionHeading";

const CourseCard = ({ course }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-content/10 hover:shadow-xl transition-shadow">
      <figure className="h-48 overflow-hidden">
        <img
          src={
            course?.thumbnail || "https://placehold.co/600x400?text=No+Image"
          }
          alt={course?.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="badge badge-secondary text-xs">
            {course?.category}
          </span>
          <span className="text-blue-600 font-bold text-lg">
            ${course?.course_fee}
          </span>
        </div>
        <h2 className="card-title text-base mt-1">{course?.title}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {course?.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-7">
              <span className="text-xs">
                {course?.teacher?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-600">{course?.teacher}</span>
        </div>
        <div className="card-actions mt-3">
          <button className="btn btn-primary btn-sm w-full">Enroll Now</button>
          <button className="btn btn-secondary btn-sm w-full">Learn More</button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const { allCourse, isLoading } = useCourse();
  const courses = allCourse?.data;

  return (
    <section className="py-12 px-4">
      <SectionHeading
        title="Our Courses"
        subTitle="Explore all available courses in our system"
      />

      {isLoading && (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && (!courses || courses.length === 0) && (
        <p className="text-center text-gray-400 mt-10">No courses available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 max-w-7xl mx-auto">
        {courses?.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
