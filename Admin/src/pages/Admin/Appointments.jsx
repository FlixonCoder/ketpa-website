import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const Appointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="w-full mb-10 max-w-6xl mx-auto p-4">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">All Appointments</h2>

      <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Table header (hidden on small screens) */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Pet</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment rows */}
        {appointments.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-gray-500 text-lg font-medium">
            No appointments available at the moment.
          </div>
        ) : appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between items-center sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] gap-3 py-4 px-6 border-b hover:bg-gray-50 transition"
          >
            <p className="max-sm:hidden text-gray-500">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                className="w-10 h-10 rounded-full border bg-gray-100 object-cover"
                src={item.userData.image || assets.default_user}
                alt="patient"
              />
              <p className="font-medium text-gray-700">{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden text-gray-600">{item.userData.pet}</p>

            {/* Date & Time */}
            <p className="text-gray-600">
              {slotDateFormat(item.slotDate)}, <span className="font-medium">{item.slotTime}</span>
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                className="w-10 h-10 rounded-full border bg-gray-100 object-cover"
                src={item.docData.image || assets.default_user}
                alt="doctor"
              />
              <p className="font-medium text-gray-700">{item.docData.name}</p>
            </div>

            <p className="font-medium text-gray-800">
              {currency}{item.amount}
            </p>

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
  )
}

export default Appointments
