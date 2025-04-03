import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddLead = () => {
  // Storing lead data
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    doorNo: "",
    postcode: "",
    description: ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLead((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create the payload for request
    const leadData = lead;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server we're sending JSON
        },
        body: JSON.stringify(leadData), // Send the lead data as JSON
      });

      // const result = await response.json(); // Parse the response from the server

      if (response.ok) {
        // Toast Emitter
        toast.success('Lead added successfully', {
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
        setLead({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          emailAddress: "",
          doorNo: "",
          postcode: "",
          description: ""
        });
      } else {
        throw new Error('Failed to add lead');
      }
    } catch (error) {
      toast.error("Error submitting lead!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error sending data:", error); // Handle any errors
    }
  };

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Add a new Lead</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* First Name & Last Name */}
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="first-name"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="first-name"
                name="firstName"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="First Name"
                value={lead.firstName}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                First Name
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="last-name"
                name="lastName"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Last Name"
                value={lead.lastName}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Last Name
              </span>
            </label>
          </div>
        </div>
        {/* Phone Number & Email Address */}
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="phone-number"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Phone Number"
                value={lead.phoneNumber}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Phone Number
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="email-address"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="email"
                id="email-address"
                name="emailAddress"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Email Address"
                value={lead.emailAddress}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Email Address
              </span>
            </label>
          </div>
        </div>
        {/* Door No. & Postcode */}
        <div className="flex gap-5">
          <div>
            <label
              htmlFor="door-no"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="door-no"
                name="doorNo"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Door No."
                value={lead.doorNo}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Door No.
              </span>
            </label>
          </div>
          <div>
            <label
              htmlFor="postcode"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <input
                type="text"
                id="postcode"
                name="postcode"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                placeholder="Postcode"
                value={lead.postcode}
                onChange={handleInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Postcode
              </span>
            </label>
          </div>
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <textarea
              id="description"
              name="description"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
              placeholder="Description"
              value={lead.description}
              onChange={handleInputChange}
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Description
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
            Submit Lead
          </span>
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddLead;
