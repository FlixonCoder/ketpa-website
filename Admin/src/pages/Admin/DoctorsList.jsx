import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="w-full max-w-6xl mb-10 mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Doctors</h1>

      {/* Doctor Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-gray-500 text-lg font-medium">
            No Doctors available at the moment.
          </div>
        ) : doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Doctor Image */}
            <div className="relative">
              <img
                className="w-full h-40 object-cover bg-gray-100"
                src={item.image}
                alt={item.name}
              />
              <span
                className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full shadow-sm ${
                  item.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Doctor Info */}
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>

              {/* Availability Toggle */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-700">Availability</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() => changeAvailability(item._id)}
                    checked={item.available}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 transition-all"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
