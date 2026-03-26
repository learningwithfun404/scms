import React from "react";
import DashboardHeading from "../shared/DashboardHeading";

import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useCourse from "../../../hooks/useCourse";

const Notice = () => {
  const { allCourse, courseRefetch } = useCourse();
  const { axiosSecure } = useAxios();
  const courses = allCourse?.data;
  const handleDeleteCourse = async (id) => {
    const res = await axiosSecure.delete(`/course/delete/${id}`);
    console.log(res);
    courseRefetch();
    toast.success("Course Deleted Successfully");
  };

  return (
    <div>
      <DashboardHeading
        title="Course Management"
        subTitle="Manage your all courses in this system"
      />
      <div className="flex justify-end">
        <Link to="/dashboard/add-course">
          <button className="btn btn-secondary">Add Course</button>
        </Link>
      </div>
      {/* all course table */}
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-5xl">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {courses?.map((course, index) => {
                return (
                  <tr key={course._id}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        src={course?.thumbnail}
                        alt={course?.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{course?.title}</td>
                    <td>{course?.description}</td>
                    <td className="flex items-center gap-2 py-2">
                      <button className="btn btn-primary">
                        <Link to={`/dashboard/course-update/${course._id}`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDeleteCourse(course?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notice;
