import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const AddUser = () => {
  // Initialize state for each form field
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    userType: '',
    userCampaign: '',
    team: '',
    isAdmin: false,
  });

  // Initialize state for the dropdown options
  const [userTypes, setUserTypes] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [teams, setTeams] = useState([]);

  // Fetch dropdown data from APIs
  useEffect(() => {
    // Fetch User Types
    const fetchUserTypes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/3460-cac9-4715-9cc8');
        const data = await response.json();
        setUserTypes(data); // Assuming the API returns an array of user types
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    // Fetch User Campaigns
    const fetchUserCampaigns = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/26d4-b9f8-498a-b9ce');
        const data = await response.json();
        setUserCampaigns(data); // Assuming the API returns an array of campaigns
      } catch (error) {
        console.error('Error fetching user campaigns:', error);
      }
    };

    // Fetch Teams
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://dummyjson.com/c/59d9-dd06-40a1-a50a');
        const data = await response.json();
        setTeams(data); // Assuming the API returns an array of teams
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    // Call the fetch functions on component mount
    fetchUserTypes();
    fetchUserCampaigns();
    fetchTeams();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If it's a checkbox, use 'checked' instead of 'value'
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send the form data to the API as a JSON payload
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data
      });

      // const result = await response.json(); // Parse response from the server

      if (response.ok) {
        // Toast Emitter
        toast.success('User added successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })

        // Reset form after successful submission
        setFormData({
          name: "",
          username: "",
          password: "",
          userType: "",
          userCampaign: "",
          team: "",
          isAdmin: false,
        });
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      toast.error("Error creating user!", { // ✅ Fixed Error Toast
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error('Error sending data:', error); // Handle error if any
    }
  };

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Create a User</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* Name & Username */}
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="name"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="name"
                name="name"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Name
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="username"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="username"
                name="username"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Username
              </span>
            </label>
          </div>
        </div>

        {/* Password & User Type */}
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="password"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="password"
                id="password"
                name="password"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Password
              </span>
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="userType"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <select
                id="userType"
                name="userType"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled className="text-gray-700 font-sans text-md">Select User Type</option>
                {userTypes.map((userType) => (
                  <option key={userType.id} value={userType.user_type} className="font-sans text-md">
                    {userType.user_type}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                User Type
              </span>
            </label>
          </div>
        </div>

        {/* User Campaign & Team */}
        <div className="flex gap-5">
          <div className="w-full">
            <label
              htmlFor="user-campaign"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <select
                id="user-campaign"
                name="userCampaign"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                value={formData.userCampaign}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled className="text-gray-700 font-sans text-md">Select User Campaign</option>
                {userCampaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.campaign_name} className="font-sans text-md">
                    {campaign.campaign_name}
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
          <div className="w-full">
            <label
              htmlFor="team"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <select
                id="team"
                name="team"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                value={formData.team}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled className="text-gray-700 font-sans text-md">Select Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.team_name} className="font-sans text-md">
                    {team.team_name}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Team
              </span>
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-between items-center">
          <button type="submit" className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit">
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
              Register
            </span>
          </button>

          {/* is admin */}
          <div className="flex items-center">
            <label htmlFor="is_admin" className="flex cursor-pointer items-center gap-4">
              <input
                type="checkbox"
                className="size-4 rounded-sm border-gray-300"
                id="is_admin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleInputChange}
              />
              <div>
                <strong className="font-medium text-gray-900">Is Admin</strong>
              </div>
            </label>
          </div>
        </div>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddUser;
