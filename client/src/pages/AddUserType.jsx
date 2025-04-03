import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useUserTypes from '../hooks/useUserTypes';

const AddUserType = () => {
  const [userType, setUserType] = useState("");
  const { userType: fetchedUserType, loading, updateUserType, addUserType } = useUserTypes(); // Custom hook to manage user types
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    setUserType(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userTypeData = { name: userType };

    try {
      await addUserType(userTypeData); // Call the addUserType function
      toast.success('User Type added successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // Reset form after successful submission
      setUserType("");
    } catch (error) {
      toast.error("Error creating user type!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }; 

    if (loading) {
      return <div>Loading...</div>;
    }

    // try {
    //   const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user-types`, {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userTypeData),
    //   });

    //   // const result = await response.json();

    //   if (response.ok) {
    //     // Toast Emitter
    //     toast.success('User Type added successfully', {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     })

    //     // Reset form after successful submission
    //     setUserType("");
    //   } else {
    //     throw new Error('Failed to add user type');
    //   }
    // } catch (error) {
    //   toast.error("Error creating user type!", { // ✅ Fixed Error Toast
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   console.error("Error sending data:", error);
    // }
  };

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Create User Type</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* User Type Name */}
        <div>
          <label
            htmlFor="user-type-name"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="user-type-name"
              name="userTypeName"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="User Type Name"
              value={userType}
              onChange={(handleInputChange)}
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              User Type Name
            </span>
          </label>
        </div>
        {/* Submit button */}
        <button type="submit" className='group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit'>
          <span className="absolute -end-full transition-all group-hover:end-4">
            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffffff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4 text-white">
            Add User Type
          </span>
        </button>
      </form>
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  )
}

export default AddUserType;