import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useCampaigns from '../hooks/useCampaigns';
import useTeams from '../hooks/useTeams';

const EditTeam = () => {
  const { id } = useParams();
  const { team: fetchedTeam, loading: teamLoading, updateTeam } = useTeams(id);
  const { campaigns, loading: campaignsLoading } = useCampaigns();
  const [team, setTeam] = useState(""); // State to store the selected team
  const [selectedCampaign, setSelectedCampaign] = useState(""); // State to store the selected campaign
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  // Update the team state when fetchedTeam changes
  useEffect(() => {
    if (fetchedTeam) {
      setTeam(fetchedTeam.name);
      setSelectedCampaign(fetchedTeam.campaign || "");
    }
  }, [fetchedTeam]);

  // Handle input change for the team name
  const handleInputChange = (e) => {
    setTeam(e.target.value);
  };

  // Handle dropdown change for the campaign
  const handleDropdownChange = (e) => {
    setSelectedCampaign(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const teamData = { name: team, campaign: selectedCampaign };

    try {
      await updateTeam(id, teamData);

      toast.success('Team updated successfully', {
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

      // Navigate to the teams list after successful update
      navigate('/teams');
    } catch (error) {
      toast.error("Error updating team!", {
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

  if (teamLoading || campaignsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Edit Team</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* Team Name */}
        <div>
          <label
            htmlFor="team-name"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="team-name"
              name="teamName"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Team Name"
              value={team}
              onChange={handleInputChange}
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Team Name
            </span>
          </label>
        </div>

        {/* Campaign Dropdown */}
        <div className="w-full">
          <label
            htmlFor="campaign"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <select
              id="campaign"
              name="campaign"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
              value={selectedCampaign}
              onChange={handleDropdownChange}
              required
            >
              <option value="" disabled className="text-gray-700 font-sans text-md">Select Campaign</option>
              {campaignsLoading ? (
                <option>Loading...</option>
              ) : (
                campaigns.map((campaign) => (
                  <option key={campaign._id} value={campaign.name} className="font-sans text-md">
                    {campaign.name}
                  </option>
                ))
              )}
            </select>
            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Campaign
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
};

export default EditTeam;
