import React, { Children } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

export default function App ({children}) {
  return (
    <h1 className="text-3xl font-bold underline">
      <Outlet />
    </h1>
  )
}

