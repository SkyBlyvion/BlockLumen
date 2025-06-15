import React from 'react'
import { Outlet } from 'react-router-dom'
// import { API_IMAGE } from '../../constants/ApiConstant'

const HomeOffline:React.FC = () => {
  return (
    <>
        <div className='w-screen bg-brown_dark'>
            {/* <img className='w-full h-28 object-contain pt-10 pb-5' src={`${API_IMAGE}/logo.png`} alt="Logo TODO List" /> */}
        </div>
        <Outlet />
    </>
  )
}

export default HomeOffline