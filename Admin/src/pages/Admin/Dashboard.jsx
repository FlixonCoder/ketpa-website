import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    dashData && (
      <div className="w-full mb-10 max-w-6xl mx-auto p-5 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
            <img className="w-12 h-12" src={assets.doctor_icon} alt="doctor-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-500 text-sm">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
            <img className="w-12 h-12" src={assets.appointments_icon} alt="appointments-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
            <img className="w-12 h-12" src={assets.patients_icon} alt="patients-icon" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50">
            <img src={assets.list_icon} alt="list-icon" className="w-5 h-5" />
            <p className="font-semibold text-gray-800">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.length === 0 ? (
              <div className="flex items-center justify-center py-10 text-gray-500 text-lg font-medium">
                No appointments available at the moment.
              </div>
            ) : dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors"
              >
                {/* Doctor Image */}
                <img
                  className="rounded-full w-12 h-12 object-cover border border-gray-200"
                  src={item.docData.image}
                  alt="doctor-img"
                />

                {/* Doctor Details */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>

                {/* Status / Cancel */}
                {/* Actions */}
                {item.iscompleted ? (
                  <p className="text-green-500 text-xs font-semibold">Completed</p>
                ) : item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 h-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                )}

              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
