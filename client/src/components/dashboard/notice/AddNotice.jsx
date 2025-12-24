import React from 'react'
import DashboardHeading from '../shared/DashboardHeading'
import { useForm } from "react-hook-form"
import useAxios from '../../../hooks/useAxios'
import toast from 'react-hot-toast'
import { useState } from 'react'

const AddNotice = () => {
    const [loading, setLoading] = useState(false);
    const {axiosSecure} = useAxios();

  const { register, handleSubmit, reset, formState : {errors} } = useForm();

  const handleCreateNotice = async (data) => {
    setLoading(true);
    const res = await axiosSecure.post("/notice/create", {
        title : data?.title,
        desc : data?.description
    });
    setLoading(false);
    toast.success("Notice Created Successfully")
    console.log(res)
    reset();
  }

  return (
    <div className="p-6">
      <DashboardHeading 
        title="Add Notice"
        subTitle="Manage your all notice in this system"
      />

      <div className="w-3xl mx-auto mt-8">
        <form onSubmit={handleSubmit(handleCreateNotice)}
         className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Title
            </label>
            <input
            {...register("title", {required : "Title is required"})}
              type="text"
              placeholder="Enter notice title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className='text-red-500 text-sm'>
                {errors.title && errors.title.message}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
            {...register("description", {required : "Description is required"})}
              rows="4"
              placeholder="Write notice description..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             <p className='text-red-500 text-sm'>
                {errors.description && errors.description.message}</p>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-2 rounded-lg transition-all"
            >
                {
                    loading ? "Loading..." : "Add Notice"
                }
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddNotice
