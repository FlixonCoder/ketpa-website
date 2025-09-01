import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-6xl mb-10 mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h2>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        {/* Table Header (Desktop only) */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-100 border-b text-sm font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        <div className="max-h-[75vh] overflow-y-auto divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-gray-500 text-lg font-medium">
              No appointments available at the moment.
            </div>
          ) : (
            appointments
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 text-gray-600 hover:bg-gray-50 transition"
                >
                  {/* Index (Desktop only) */}
                  <p className="hidden md:block font-medium">{index + 1}</p>

                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      src={item.userData.image}
                      alt="user-img"
                    />
                    <p className="font-medium text-gray-800">{item.userData.name}</p>
                  </div>

                  {/* Payment */}
                  <div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.payment
                          ? 'bg-[#013cfc]/10 text-[#013cfc] border border-[#013cfc]/30'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      }`}
                    >
                      {item.payment ? 'Online' : 'Cash'}
                    </span>
                  </div>

                  {/* Age (Desktop only) */}
                  <p className="hidden md:block">{calculateAge(item.userData.dob)}</p>

                  {/* Date & Time */}
                  <p className="text-sm">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>

                  {/* Fees */}
                  <p className="font-medium text-gray-800">
                    {currency}
                    {item.amount}
                  </p>

                  {/* Action */}
                  <div className="flex items-center gap-3">
                    {item.cancelled ? (
                      <p className="text-red-500 text-sm font-semibold">Cancelled</p>
                    ) : item.iscompleted ? (
                      <p className="text-green-600 text-sm font-semibold">Completed</p>
                    ) : (
                      <>
                        <img
                          onClick={() => cancelAppointment(item._id)}
                          className="w-9 h-9 cursor-pointer p-2 rounded-lg hover:bg-red-50 border border-red-200 transition"
                          src={assets.cancel_icon}
                          alt="cancel-icon"
                        />
                        <img
                          onClick={() => completeAppointment(item._id)}
                          className="w-9 h-9 cursor-pointer p-2 rounded-lg hover:bg-green-50 border border-green-200 transition"
                          src={assets.tick_icon}
                          alt="tick-icon"
                        />
                      </>
                    )}
                  </div>

                  {/* Mobile-only stacked view */}
                  <div className="md:hidden mt-3 flex flex-col gap-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Age:</span>{' '}
                      {calculateAge(item.userData.dob)}
                    </p>
                    <p>
                      <span className="font-semibold">Payment:</span>{' '}
                      {item.payment ? 'Online' : 'Cash'}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{' '}
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span> {item.slotTime}
                    </p>
                    <p>
                      <span className="font-semibold">Fees:</span> {currency}
                      {item.amount}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment
