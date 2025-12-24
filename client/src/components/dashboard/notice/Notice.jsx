import React from 'react'
import DashboardHeading from '../shared/DashboardHeading'
import useNotice from '../../../hooks/useNotice'
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {Link} from 'react-router'

const Notice = () => {

  const {allNotice,noticeRefetch} = useNotice();
  const {axiosSecure} = useAxios()
  const notices = allNotice?.data
  const handleDeleteNotice = async (id) => {
    const res = await axiosSecure.delete(`/notice/delete/${id}`);
    console.log(res)
    noticeRefetch()
    toast.success("Notice Deleted Successfully"); 
  }
  
  return (
    <div>
      <DashboardHeading title="Notice Management"
      subTitle="Manage your all notice in this system"/>
      <div className='flex justify-end'>
      <Link to = "/dashboard/add-notice">
      <button className='btn btn-secondary'>Add Notice</button>
      </Link>

      </div>
      {/* all notice table */}
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-5xl">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        notices?.map((n, index) => {
          return(
          <tr key={n._id}>
        <th>{index+1}</th>
        <td>{n?.title}</td>
        <td>{n?.desc}</td>
        <td className='flex items-center gap-2 py-2'>
          <button className='btn btn-primary'>
            <Link to={`/dashboard/notice-update/${n._id}`}>
            Edit
            </Link>
          </button>
        <button className='btn btn-secondary'
         onClick={() => handleDeleteNotice(n?._id)}>Delete</button>
        </td>
      </tr>
        );
        })}
    </tbody>
  </table>
</div>
      </div>
    </div>
  )
}

export default Notice
