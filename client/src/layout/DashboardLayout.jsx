import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/dashboard/shared/Sidebar'
import { Menu } from 'lucide-react'

const DashboardLayout = () => {
  const [open, setOpen] = useState(false)
  console.log(open)
  return (
    // desktop sidebar
    <div className='flex'>
      <div className='hidden md:block w-72'>
        <Sidebar setOpen={setOpen}/>
      </div>

         {/* mobile sidebar */}
         <div className=  {`md:hidden fixed duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar setOpen={setOpen}/>
         </div>
       <div className='flex flex-col'>
        <div className='p-5 md:hidden'>
        <Menu onClick={() => setOpen(!open)}  />
       </div>

     <div className='p-5'>
       <Outlet />
     </div>
       </div>
    </div>
  )
}

export default DashboardLayout
