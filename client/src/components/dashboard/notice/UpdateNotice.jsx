import { useNavigate, useParams } from "react-router"
import DashboardHeading from "../shared/DashboardHeading"
import { useForm } from "react-hook-form";
import useFindSingleNotice from "../../../hooks/useFindSingleNotice";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const UpdateNotice = () => {
    const params = useParams();
    const navigate = useNavigate()
    const {axiosSecure} = useAxios()
    const {notice,isLoading} = useFindSingleNotice(params.id);
  

     const { register, handleSubmit, reset, formState : {errors} } = useForm();

  const handleCreateNotice = async (data) => {
    console.log(data)
    const res = await axiosSecure.put(`/notice/update/${params.id}`,{
        title : data?.title,
        desc : data?.description
    })
    console.log(res)
    toast.success("Notice Updated Successfully")
    reset();
    navigate("/dashboard/notice");
  };
  if(isLoading) return <h1>Loading...</h1>
    console.log(params)
  return (
    <div>
      <DashboardHeading title="Notice Update"
      subTitle="Manage your all notice in this system"/>
       <form onSubmit={handleSubmit(handleCreateNotice)}
         className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Title
            </label>
            <input
            defaultValue={notice?.data?.title}
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
             defaultValue={notice?.data?.desc}
            {...register("description", {required : "Description is required"})}
              rows="4"
              placeholder="Write notice description..."
              {...register("description")}
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
              Submit Notice
            </button>
          </div>

        </form>
    </div>
  )
}

export default UpdateNotice
