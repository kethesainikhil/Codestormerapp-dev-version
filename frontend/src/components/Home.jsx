import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const particiants = useSelector((state) => state.auth?.participants);
  useEffect(()=>{
    console.log(particiants,"userData")
  })
  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
