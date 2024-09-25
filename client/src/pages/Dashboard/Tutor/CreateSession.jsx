import { Helmet } from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreateSession = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (sessionData) => {
      const { data } = await axiosSecure.post(`/session`, sessionData);
      return data;
    },
    onSuccess: () => {
      toast.success("session Added Successfully");
      navigate('/dashboard/my-listing-sessions')
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const registration_start_date = form.registrationStartDate.value;
    const registration_end_date = form.registrationEndDate.value;
    const class_start_date = form.classStartDate.value;
    const class_end_date = form.classEndDate.value;
    const duration = form.duration.value;
    const registration_fee = form.registrationFee.value;
    const status = form.status.value;
    const session_img = form.session_img.value;
    const tutor = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const sessionData = {
        title,
        description,
        category,
        registration_start_date,
        registration_end_date,
        class_start_date,
        class_end_date,
        duration,
        registration_fee,
        session_img,
        status,
        tutor,
      };
      // console.log(sessionData);

      // sending post request to the server
      await mutateAsync(sessionData);
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
      setLoading(false);
    }

    
  };

  return (
    <div className="">
      <SectionTitle heading="Create Session" />
      <Helmet>
        <title>Create Session | Learnic</title>
      </Helmet>

      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 md:mx-auto"
        >
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Mastering UI Design: From Basics to Advanced"
            />
          </div>

          {/* tutor name, email */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Tutor Name */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Tutor Name
              </label>
              <input
                type="text"
                name="tutorName"
                defaultValue={user?.displayName}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                placeholder="Star Techies"
                readOnly
              />
            </div>

            {/* Tutor Email */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Tutor Email
              </label>
              <input
                type="email"
                name="tutorEmail"
                defaultValue={user?.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                placeholder="startechies10@gmail.com"
                readOnly
              />
            </div>
          </div>

          {/* Category,  Registration Start Date*/}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Design">Design</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Literature">Literature</option>
                <option value="Programming">Programming</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Status
              </label>
              <select
                name="status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Registration date */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Registration Start Date */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Registration Start Date
              </label>
              <input
                type="date"
                name="registrationStartDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Registration End Date
              </label>
              <input
                type="date"
                name="registrationEndDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Class time */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Class Start Date */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Class Start Date
              </label>
              <input
                type="date"
                name="classStartDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Class End Date */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Class End Date
              </label>
              <input
                type="date"
                name="classEndDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Duration, Registration Fee */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Duration */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Duration (Month)
              </label>
              <input
                type="number"
                name="duration"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="3"
              />
            </div>

            {/* Registration Fee */}
            <div className="mb-4 w-full">
              <label className="block text-sm font-semibold text-gray-700">
                Registration Fee
              </label>
              <input
                type="number"
                name="registrationFee"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="100"
              />
            </div>
          </div>

          {/* Img url */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Session Image URL
            </label>
            <input
              type="text"
              name="session_img"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://i.ibb.co/pb-3184455.jpg"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="This comprehensive course on UI Design..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-wide bg-gradient-to-r from-green-200 to-cyan-200 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 rounded transition duration-150 font-semibold"
            >
              Create Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
