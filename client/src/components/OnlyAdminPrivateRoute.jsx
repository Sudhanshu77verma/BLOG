import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet} from 'react-router-dom'
export const OnlyAdminPrivateRoute = () => {
    const {currentUser}= useSelector((state)=>state.user)
  return (
    <div> 
        {
        currentUser &&    currentUser.isAdmin ? (<Outlet></Outlet>):(<Navigate  to='/sign-in'></Navigate>)
        }
    </div>
  )
}
