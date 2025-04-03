import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useStatuses from '../hooks/useStatuses';

const EditStatus = () => {
  const { id } = useParams();
  const { status: fetchedStatus, loading, updateStatus } = useStatuses(id);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update the status state when fetchedStatus changes
  useEffect(() => {
    if (fetchedStatus) {
      setStatus(fetchedStatus.name);
    }
  }, [fetchedStatus]);

  // Handle input changes
  const handleInputChange = (e) => {
    setStatus(e.target.value); // Update the status state with the input value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const statusData = { name: status };

    try {
      await updateStatus(id, statusData); // Call the updateStatus function

      toast.success('Status updated successfully', {
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

      // Navigate to the statuses list after successful update
      // navigate('/statuses');
    } catch (error) {
      toast.error("Error updating status!", {
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
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Edit Status</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* Status Name */}
        <div>
          <label
            htmlFor="status-name"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="status-name"
              name="statusName"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Status Name"
              value={status}
              onChange={handleInputChange}
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Status Name
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
            Save Changes
          </span>
        </button>
      </form>
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default EditStatus;
