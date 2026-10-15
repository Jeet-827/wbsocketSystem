import React from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './page/Register'
import Login from './page/Login'
import Home from './page/Home'
// import { io } from 'socket.io-client'
// const socket = io('http://localhost:4000')
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}
export default App