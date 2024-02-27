import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import Store from './store/store.js'
import VideoCall from './components/VideoCall.jsx'
import CardComponent from './components/CardComponent.jsx'
const router =  createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/login",
      element: <Login  />
    },
    {
      path:"/signup",
      element:<Signup />
    },
    {
      path:"/home",
      element:
        <Home />
    },
    {
      path:"/video",
      element:
        <VideoCall />
    },
    {
      path:"/card",
      element:
        <CardComponent />
    }
  ],
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}>
      <Router>
      <App />
      </Router>
     
    </RouterProvider>
    </Provider>
    
  </React.StrictMode>,
)
