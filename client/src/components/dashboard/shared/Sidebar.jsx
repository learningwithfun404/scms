import { X } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router'

const Sidebar = ({setOpen}) => {

    const routes = [
        {
            path : "/dashboard",
            router : "Home"
        },
        {
            path : "/dashboard/users",
            router : "Users"
        },
        {
            path : "/dashboard/notice",
            router : "Notice"
        },
        {
            path : "/dashboard/settings",
            router : "Settings"
        },
        {
            path : "/dashboard/profile",
            router : "Profile",
        }
    ]
  return (
    <div className='bg-gray-200 min-h-screen'>
      <div className='flex bg-green-600  p-5 items-center gap-3'>
        <Link to= "/" className='text-xl text-white'>Admin Dashboard</Link>
       <X onClick={() => setOpen(false)} className='bg-red-800 md:hidden'/>
      </div>
      <ul className='flex flex-col mt-3 gap-3'>
        {
          routes?.map((item,index) => (
            <NavLink 
            end
            to={item.path} key={index} className={({isActive}) =>
              `px-4 py-2 ${isActive ? "bg-gray-300" : ""}`
               }
               >
                {item?.router}</NavLink>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar
