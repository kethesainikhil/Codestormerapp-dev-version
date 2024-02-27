import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Protected = ({children}) => {
    const [userData,SetUserData] = useState(null);
    const navigate = useNavigate();
  return (
    (
        userData ? {children} : <div className='flex-col'>
            <div>please login first <div><Link className='text-xl' to="/login">login page </Link></div></div>
        </div>
    )
  )
}

export default Protected
