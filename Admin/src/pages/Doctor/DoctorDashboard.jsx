import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return (
    dashData && (
      <div className="w-full max-w-6xl mb-10 mx-auto px-4 py-6">
        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition">
            <img className="w-14" src={assets.earning_icon} alt="earning-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-500 text-sm">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition">
            <img className="w-14" src={assets.appointments_icon} alt="appointments-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition">
            <img className="w-14" src={assets.patients_icon} alt="patients-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest bookings */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 border-b">
            <img src={assets.list_icon} alt="list-icon" />
            <p className="font-semibold text-gray-700">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
            {dashData.latestAppointments.length ===0 ? (
              <div className="flex items-center justify-center py-10 text-gray-500 text-lg font-medium">
                No appointments available at the moment.
              </div>
            ) : dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition"
              >
                <img
                  className="rounded-full w-12 h-12 object-cover border border-gray-300"
                  src={item.userData.image}
                  alt="user-img"
                />

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-500 text-sm">{slotDateFormat(item.slotDate)}</p>
                </div>

                {/* Actions */}
                {item.cancelled ? (
                  <p className="text-red-500 text-sm font-semibold">Cancelled</p>
                ) : item.iscompleted ? (
                  <p className="text-green-600 text-sm font-semibold">Completed</p>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
                      src={assets.cancel_icon}
                      alt="cancel-icon"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
                      src={assets.tick_icon}
                      alt="tick-icon"
                    />
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    )
  )
}

export default DoctorDashboard
