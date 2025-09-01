import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <header className="flex justify-between items-center px-5 sm:px-8 py-3 border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      {/* Left: Logo + Role */}
      <div className="flex items-center gap-3">
        <img
          className="w-28 sm:w-32 cursor-pointer"
          src={assets.admin_logo}
          alt="logo"
        />
        <span className="hidden sm:inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border border-gray-200 text-gray-600 bg-gray-50">
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>

      {/* Right: Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-[#031cfc] text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-full shadow hover:shadow-md hover:bg-blue-700 active:scale-95 transition-all"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  )
}

export default Navbar
