import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DashboardHeading from "../shared/DashboardHeading";
import uploadImageToImgBB from "../../../utils/uploadImageToImgBB";
import useCreateCourse from "../../../hooks/useCreateCourse";

const CATEGORIES = [
  "Science",
  "Arts",
  "Commerce",
  "Technology",
  "Language",
  "Other",
];

const AddCourse = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const { createCourse, isPending } = useCreateCourse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddCourse = async (data) => {
    try {
      console.log(data);
      console.log(data.thumbnail[0]);

      const thumbnailFile = data.thumbnail[0];
      const thumbnailURL = await uploadImageToImgBB(thumbnailFile);

      console.log(thumbnailURL);

      createCourse(
        {
          title: data.title,
          description: data.description,
          teacher: data.teacher,
          category: data.category,
          thumbnail: thumbnailURL,
          course_fee: Number(data.course_fee),
        },
        {
          onSuccess: () => {
            toast.success("Course created successfully");
            reset();
            setThumbnailPreview(null);
          },
          onError: () => {
            toast.error("Failed to create course");
          },
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="p-6">
      <DashboardHeading
        title="Add Course"
        subTitle="Manage all courses in your system"
      />

      <div className="w-3xl mx-auto mt-8">
        <form onSubmit={handleSubmit(handleAddCourse)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter course title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              placeholder="Write course description..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          {/* Teacher & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teacher
              </label>
              <input
                {...register("teacher", { required: "Teacher is required" })}
                type="text"
                placeholder="Enter teacher name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{errors.teacher?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.category?.message}</p>
            </div>
          </div>

          {/* Course Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Fee ($)
            </label>
            <input
              {...register("course_fee", {
                required: "Course fee is required",
                min: { value: 0, message: "Fee cannot be negative" },
              })}
              type="number"
              placeholder="Enter course fee"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.course_fee?.message}</p>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail
            </label>
            <input
              {...register("thumbnail", { required: "Thumbnail is required" })}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setThumbnailPreview(URL.createObjectURL(file));
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-red-500 text-sm">{errors.thumbnail?.message}</p>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="mt-3 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              // disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-2 rounded-lg transition-all disabled:opacity-60"
            >
              {isPending ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
