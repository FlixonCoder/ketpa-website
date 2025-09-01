import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [clinicName, setClinicName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [certificationId, setCertificationId] = useState('')
  const [rating, setRating] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [locationUrl, setLocationURL] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      if (rating < 0 || rating > 5) {
        return toast.error('Rating should be between 0 - 5')
      }

      setLoading(true)

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('clinicName', clinicName)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('certificationId', certificationId)
      formData.append('fees', Number(fees))
      formData.append('rating', Number(rating))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      ),
      formData.append('location', locationUrl)


      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setClinicName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setCertificationId('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        setRating('')
        setLocationURL('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center mb-8 justify-center w-full py-8 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white w-full max-w-4xl p-8 sm:p-10 rounded-2xl shadow-lg border"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Add Doctor
        </h2>

        {/* Upload Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover bg-gray-100 rounded-full ring-2 ring-[#031cfc]/30 hover:opacity-90 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload-area"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-500">Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="text-sm font-medium">Doctor Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Clinic Name</label>
            <input
              onChange={(e) => setClinicName(e.target.value)}
              value={clinicName}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="text"
              placeholder="Clinic Name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Doctor Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Doctor Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Experience</label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Fees</label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="number"
              placeholder="Fees"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
            >
              <option value="General Physician">General Physician</option>
              <option value="Emergency">Emergency</option>
              <option value="Vaccination">Vaccination</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Education</label>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="text"
              placeholder="Education"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Rating</label>
            <input
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="number"
              placeholder="Rating 1-5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Certification ID</label>
            <input
              onChange={(e) => setCertificationId(e.target.value)}
              value={certificationId}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="number"
              placeholder="ID: "
              required
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-medium mb-2 block">Address</label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none shadow-sm"
                type="text"
                placeholder="Address Line 1"
                required
              />

              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none shadow-sm"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Location URL</label>
            <input
              onChange={(e) => setLocationURL(e.target.value)}
              value={locationUrl}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#031cfc] outline-none"
              type="text"
              placeholder="https://maps.google.com/..."
              required
            />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="block text-sm font-medium">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded-lg focus:ring-2 focus:ring-[#031cfc] outline-none"
            placeholder="Write about doctor..."
            required
            rows={5}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#031cfc] hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Doctor'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
