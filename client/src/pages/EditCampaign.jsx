import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useCampaigns from '../hooks/useCampaigns';
import useStatuses from '../hooks/useStatuses';

const EditCampaign = () => {
  const { id } = useParams();
  const { campaign: fetchedCampaign, loading: campaignLoading, updateCampaign } = useCampaigns(id);
  const { statuses, loading: statusesLoading } = useStatuses();
  const [campaign, setCampaign] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update the campaign state when fetchedCampaign changes
  useEffect(() => {
    if (fetchedCampaign) {
      setCampaign(fetchedCampaign.name);
      setSelectedStatuses(fetchedCampaign.statuses || []);
    }
  }, [fetchedCampaign]);

  const handleInputChange = (e) => {
    setCampaign(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedStatuses((prevSelectedStatuses) =>
      prevSelectedStatuses.includes(value)
        ? prevSelectedStatuses.filter((status) => status !== value)
        : [...prevSelectedStatuses, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const campaignData = { name: campaign, statuses: selectedStatuses };

    try {
      await updateCampaign(id, campaignData);

      toast.success('Campaign updated successfully', {
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

      // Navigate to the campaigns list after successful update
      // navigate('/campaigns');
    } catch (error) {
      toast.error("Error updating campaign!", {
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

  if (campaignLoading || statusesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Edit Campaign</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* Campaign Name */}
        <div>
          <label
            htmlFor="campaign-name"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="campaign-name"
              name="campaignName"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Campaign Name"
              value={campaign}
              onChange={handleInputChange}
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Campaign Name
            </span>
          </label>
        </div>

        {/* Status Checkboxes */}
        <div className="w-full">
          <label className="relative block">
            <span className="text-gray-700 font-sans text-md font-medium">Select Statuses</span>
            {statusesLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col gap-2 mt-2 max-h-[40vh] overflow-y-scroll">
                {statuses.map((status) => (
                  <div key={status._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`status-${status._id}`}
                      name="status"
                      value={status.name}
                      checked={selectedStatuses.includes(status.name)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`status-${status._id}`} className="text-sm text-gray-700">
                      {status.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit"
        >
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
};

export default EditCampaign;
