import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiDocument } from "react-icons/hi2";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import formatDate from '../utils/formatDate';
import useLeads from '../hooks/useLeads';
import useStatuses from '../hooks/useStatuses';
import useUsers from '../hooks/useUsers';
import useNotes from '../hooks/useNotes';

const EditLead = () => {
  const { id } = useParams(); // Get the lead ID from the URL
  const { lead: fetchedLead, loading: leadLoading, updateLead } = useLeads(id); // Use the custom hook for leads
  const { statuses, loading: statusesLoading } = useStatuses(); // Use the custom hook for statuses
  const { users, loading: usersLoading } = useUsers(); // Use the custom hook for users
  const { notes, loading, error, appendNote, fetchNotesByLeadId } = useNotes();
  const [noteText, setNoteText] = useState('');
  const [lead, setLead] = useState(null);

  // Update the local state when the fetched lead changes
  useEffect(() => {
    if (fetchedLead) {
      setLead(fetchedLead);
    }
  }, [fetchedLead]);

  // When component mounts or lead changes
  useEffect(() => {
    if (lead?._id) {
      fetchNotesByLeadId(lead._id);
    }
  }, [lead?._id, fetchNotesByLeadId]);

  // Handle form submission to update the lead
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLead(id, lead); // Call the updateLead function from the custom hook
      toast.success('Lead updated successfully', {
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
    } catch (error) {
      toast.error("Error updating lead!", {
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
    }
  };

  // Handle input changes to update the lead state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  // Handle input change for the note
  const handleNoteInputChange = (e) => {
    setNoteText(e.target.value);
  };

  // Handle form submission to create and append the note
  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      toast.error("Note cannot be empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      // Call the addNote function from the useNotes hook
      await addNote(lead._id, lead.userId._id, noteText); // Use the addNote function directly

      // Append the new note to the existing notes
      // fetchNotesByLeadId(id);

      // Clear the note input field
      setNoteText('');

      toast.success('Note added successfully', {
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
    } catch (error) {
      toast.error("Error adding note!", {
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
    }
  };

  if (leadLoading || statusesLoading || usersLoading || notesLoading) {
    return <div className='grid place-items-center min-h-[80vh]'><span className="loader"></span></div>;
  }

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <section className='grid grid-rows-[1fr] grid-cols-[2fr_1fr] p-5 gap-5 h-[90vh]'>
      <section className='gap-5 overflow-y-scroll'>
        <div className="bg-white rounded-lg border border-gray-300 mb-5">
          <div className='flex items-center gap-2 border-b border-gray-200 p-3 px-5'>
            <h2 className="text-xl font-semibold mr-auto">#{lead._id} - {lead.firstName} {lead.lastName}</h2>
            <small>{formatDate(lead.createdAt)}</small>
          </div>
          <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <div className="flex flex-col xl:flex-row gap-5 w-full">
              <div className='w-full'>
                <label htmlFor="first-name" className="relative block rounded-md border border-gray-200 shadow-xs">
                  <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                    placeholder="First Name"
                    value={lead.firstName || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700">
                    First Name
                  </span>
                </label>
              </div>
              <div className='w-full'>
                <label htmlFor="last-name" className="relative block rounded-md border border-gray-200 shadow-xs">
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
                    placeholder="Last Name"
                    value={lead.lastName || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700">
                    Last Name
                  </span>
                </label>
              </div>
            </div>
            {/* Phone Number & Email Address */}
            <div className="flex flex-col xl:flex-row gap-5">
              <div className='w-full'>
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
                    value={lead.phoneNumber || ''}
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
              <div className='w-full'>
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
                    value={lead.email || ''}
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
            <div className="flex flex-col xl:flex-row gap-5 w-full">
              <div className='w-full'>
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
                    value={lead.doorNo || ''}
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
              <div className='w-full'>
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
                    value={lead.postcode || ''}
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
            {/* Is Active & Lead Status */}
            <div className="flex flex-col xl:flex-row gap-5">
              <div className="w-full">
                <label
                  htmlFor="isActive"
                  className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
                >
                  <select
                    value={lead.isActive || ''}
                    onChange={handleInputChange}
                    name="isActive"
                    id="isActive"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full">
                    <option value="Active" className='font-sans text-md'>Active</option>
                    <option value="Dead" className='font-sans text-md'>Dead</option>
                  </select>
                  {/* <select
                    id="isActive"
                    name="isActive"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                    value={lead.isActive}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled className="text-gray-700 font-sans text-md">Select User Type</option>
                    {userTypes.map((userType) => (
                      <option key={userType.id} value={userType.user_type} className="font-sans text-md">
                        {userType.user_type}
                      </option>
                    ))}
                  </select> */}
                  <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                  >
                    Select is_active
                  </span>
                </label>
              </div>
              <div className="w-full">
                <label htmlFor="leadStatus" className="relative block rounded-md border border-gray-200 shadow-xs">
                  <select
                    id="leadStatus"
                    name="lead_status"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                    value={lead.statusId.name || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Lead Status</option>
                    {statuses.map((status) => (
                      <option key={status._id} value={status.name}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700">
                    Lead Status
                  </span>
                </label>
              </div>
            </div>
            {/* Assigned User & Transfer To (Dropdown) */}
            <div className="flex flex-col xl:flex-row gap-5">
              <div className="w-full">
                <label htmlFor="assignedUser" className="relative block rounded-md border border-gray-200 shadow-xs">
                  <select
                    id="assignedUser"
                    name="assigned_user"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                    value={lead.userId.name || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Assigned User</option>
                    {users.map((user) => (
                      <option key={user._id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700">
                    Assigned User
                  </span>
                </label>
              </div>
              <div className="w-full">
                <label
                  htmlFor="transferTo"
                  className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
                >
                  <select
                    id="transferTo"
                    name="transferTo"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                    value={lead.transferTo || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled className="text-gray-700 font-sans text-md">Select Transfer To</option>
                    {users.map((user) => (
                      <option key={user._id} value={user.name} className="font-sans text-md">
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                  >
                    Transfer To
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
                  value={lead.description || ''}
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
            <button type="submit" className='group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white w-fit'>
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4 text-white">
                Save Lead
              </span>
            </button>
          </form>
        </div>
        {/* File Upload */}
        <div className="bg-white rounded-lg border border-gray-300 mb-5">
          <h2 className="text-xl font-medium border-b border-gray-200 p-3 pl-5">Upload Documents</h2>
          <div className="w-full p-3">
            <label
              htmlFor="file_input"
              className="text-sm text-gray-900 ml-1"
            >
              Upload file
            </label>
            <input
              type="file"
              id="file_input"
              className="w-full text-sm text-gray-900 border border-gray-300 p-3 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1 "
              aria-describedby="file_input_help"
            />
            <small id="file_input_help" className="mt-1 ml-1 text-sm text-gray-500 dark:text-gray-300">File size should be less than 50MB.</small>
          </div>
        </div>
        {/* Documents */}
        <div className="bg-white rounded-lg border border-gray-300">
          <h2 className="text-xl font-medium border-b border-gray-200 p-3 pl-5">Documents</h2>
          <div className="w-full p-3 px-5 flex items-center gap-2">
            <HiDocument />
            <p>No documents uploaded!</p>
          </div>
        </div>
      </section>
      <section className='overflow-y-scroll'>
        {/* Notes */}
        <div className="bg-white rounded-lg border border-gray-300 w-full">
          <h2 className="text-xl font-medium border-b border-gray-200 p-3 pl-5">Notes</h2>
          <form onSubmit={handleNoteSubmit} className="mt-4 p-3 px-5">
            <label
              htmlFor="addNote"
              className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
            >
              <textarea
                id="addNote"
                name="addNote"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3 w-full"
                placeholder="Add Note"
                value={noteText}
                onChange={handleNoteInputChange}
                required
              />

              <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              >
                Add Note
              </span>
            </label>

            {/* Submit button */}
            <button type="submit" className='group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit mt-5'>
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
                Save Note
              </span>
            </button>
          </form>
          {/* Toast Notifications */}
          <ToastContainer />
        </div>
        {/* Notes List */}
        <div className="bg-white rounded-lg border border-gray-300 w-full mt-5">
          <h2 className="text-xl font-medium border-b border-gray-200 p-3 pl-5">Existing Notes</h2>
          {notes?.length > 0 ? (
            notes.map((note) => (
              <div key={note._id}>
                {note.notes.map((nestedNote, index) => (
                  <div key={index} className='border border-gray-300 p-3 m-5 rounded-lg flex flex-col gap-2'>
                    <p className='text-wrap overflow-x-hidden'>{nestedNote.noteText}</p>
                    <hr className='text-gray-300' />
                    <small className='text-gray-500'>{note.userId.name} | {formatDate(nestedNote.createdAt)}</small>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className='p-5 text-center text-gray-500'>No notes available.</div>
          )}
        </div>
      </section>
    </section>
  );
};

export default EditLead;
