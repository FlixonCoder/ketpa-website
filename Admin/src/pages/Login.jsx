import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form 
        onSubmit={onSubmitHandler} 
        className="w-full max-w-md bg-white rounded-3xl p-10 flex flex-col gap-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          <span className="text-[#013cfc]">{state}</span> Login
        </h2>

        {/* Email */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-[#013cfc] focus:outline-none transition-all duration-200 text-gray-700"
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-[#013cfc] focus:outline-none transition-all duration-200 text-gray-700"
          />
        </div>

        {/* Login Button */}
        <button 
          type="submit"
          className="w-full bg-[#013cfc] hover:bg-[#002bbd] text-white font-semibold py-3 rounded-2xl shadow-md transition-all duration-200"
        >
          Login
        </button>

        {/* Toggle Login */}
        <p className="text-center text-gray-600 text-sm">
          {state === 'Admin' ? (
            <>
              Doctor Login?{" "}
              <span 
                className="text-[#013cfc] font-medium cursor-pointer hover:underline"
                onClick={() => setState('Doctor')}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span 
                className="text-[#013cfc] font-medium cursor-pointer hover:underline"
                onClick={() => setState('Admin')}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
