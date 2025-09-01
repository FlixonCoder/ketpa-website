import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return (
    profileData && (
      <div className="w-full max-w-5xl mb-10 mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <img
              className="w-48 h-48 object-cover rounded-2xl shadow-lg border border-gray-200"
              src={profileData.image}
              alt="profile-pic"
            />
          </div>

          {/* Profile Details */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 flex flex-col">
            {/* Name, Degree, Experience */}
            <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <p>{profileData.degree}</p>
              <span className="px-3 py-1 bg-gray-100 text-xs rounded-full border">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-4">
              <p className="font-medium text-gray-800">About</p>
              <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
            </div>

            {/* Fees */}
            <div className="mt-4">
              <p className="text-gray-700 font-medium">
                Appointment Fee:{' '}
                <span className="text-gray-900">
                  {currency}{' '}
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                      }
                      value={profileData.fees}
                      className="ml-2 px-2 py-1 border rounded-lg text-sm w-24"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {/* Address */}
            <div className="mt-4">
              <p className="text-gray-700 font-medium">Address:</p>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line1}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address.line2}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-4">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                className="w-4 h-4 accent-[#013cfc]"
              />
              <label className="text-sm text-gray-700">Available</label>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-[#013cfc] text-white text-sm font-medium rounded-xl shadow-md hover:bg-[#002bbd] transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-white border border-[#013cfc] text-[#013cfc] text-sm font-medium rounded-xl hover:bg-[#013cfc] hover:text-white transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile
