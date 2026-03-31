import React from "react";
import DashboardHeading from "../shared/DashboardHeading";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useCourse from "../../../hooks/useCourse";

const Notice = () => {
  const [searchText, setSearchText] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const { allCourse, courseRefetch } = useCourse(searchValue);
  const { axiosSecure } = useAxios();
  const courses = allCourse?.data;
  const handleDeleteCourse = async (id) => {
    const res = await axiosSecure.delete(`/course/delete/${id}`);
    console.log(res);
    courseRefetch();
    toast.success("Course Deleted Successfully");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchText);
    setSearchText("");
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
      <form className="mb-5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search courses..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary ml-3">Search</button>
      </form>
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
