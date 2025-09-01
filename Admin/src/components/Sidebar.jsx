import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const menuItems = aToken
    ? [
        { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
        { to: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' },
      ]
    : dToken
    ? [
        { to: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/doctor-profile', icon: assets.people_icon, label: 'Profile' },
      ]
    : []

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen min-h-screen w-64 bg-white border-r shadow-sm">
        <div className="flex flex-col pt-6">
          <ul className="space-y-1 text-gray-700">
            {menuItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-5 mx-2 rounded-xl cursor-pointer transition-all duration-200 
                  ${
                    isActive
                      ? 'bg-[#f2f3ff] text-[#031cfc] font-medium shadow-sm'
                      : 'hover:bg-gray-50'
                  }`
                }
              >
                <img src={item.icon} alt={item.label} className="h-5 w-5" />
                <p>{item.label}</p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 h-[50px] left-0 right-0 bg-white border-t shadow-md flex justify-around items-center py-2 sm:flex md:hidden z-50">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-2 py-1 rounded-lg transition-all duration-200 
              ${isActive ? 'text-[#031cfc] bg-[#f2f3ff] scale-105 shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:scale-105'}`
            }
          >
            <img src={item.icon} alt={item.label} className="h-6 w-6 mb-1 transition-transform duration-200" />
            <p className="text-[10px]">{item.label}</p>
          </NavLink>
        ))}
      </div>

    </>
  )
}

export default Sidebar
