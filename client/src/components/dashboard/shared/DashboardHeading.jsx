import React from 'react'

const DashboardHeading = ({title, subTitle}) => {
  return (
    <div className='space-y-1 mb-10'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <p>{subTitle}</p>
    </div>
  )
}

export default DashboardHeading
