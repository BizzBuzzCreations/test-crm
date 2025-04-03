import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import useTeams from '../hooks/useTeams';

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: "",
    campaignId: "",
  });
  const [campaigns, setCampaigns] = useState([]); // State to store fetched campaigns
  const { addTeam } = useTeams(); // Custom hook to manage teams
  const [isLoading, setIsLoading] = useState(false);

  // Fetch campaigns when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns`);
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data); // Set the fetched campaigns in state
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        toast.error("Error fetching campaigns!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    fetchCampaigns();
  }, []);

  // Handle input change for team name and campaign selection
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addTeam(team); // Call the addTeam function with the team data
      toast.success('Team added successfully', {
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
      setTeam({ name: "", campaignId: "" });
    } catch (error) {
      toast.error("Error creating team!", {
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
  
    if (loading) {
      return <div>Loading...</div>;
    }

    // try {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(teamData),
    //   });

    //   // const result = await response.json();

    //   if (response.ok) {
    //     // Toast Emitter
    //     toast.success('Team added successfully', {
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
    //     setTeam("");
    //   } else {
    //     throw new Error('Failed to add team');
    //   }
    // } catch (error) {
    //   toast.error("Error creating team!", { // ✅ Fixed Error Toast
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //   console.error("Error sending data:", error);
    // }
  }
  
  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Create Team</h2>

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
              name="name"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Team Name"
              value={team.name}
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
            htmlFor="user-campaign"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <select
              id="user-campaign"
              name="campaignId"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
              value={team.campaignId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled className="text-gray-700 font-sans text-md">Select User Campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign._id} value={campaign._id} className="font-sans text-md">
                  {campaign.name}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              User Campaign
            </span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className='group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit'
          disabled={isLoading}
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
            {isLoading ? "Adding..." : "Add Team"}
          </span>
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddTeam;