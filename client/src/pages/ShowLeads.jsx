import React, { useEffect, useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Searchbar from '../components/Searchbar';
import { Link } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import TableLoader from '../components/TableLoader';
import formatDate from '../utils/formatDate.js';
import useLeads from '../hooks/useLeads';

const ShowLeads = () => {
  const { leads: fetchedLeads, loading } = useLeads(); // Use the custom hook
  const [leads, setLeads] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortField, setSortField] = useState('id');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadsData, setLeadsData] = useState([]); // Store all leads here
  const [filters, setFilters] = useState({ assigned_user: '', is_active: '', lead_status: '', campaign: '' });

  // Effect hook to set leads when fetchedLeads changes
  useEffect(() => {
    if (fetchedLeads) {
      const sortedData = [...fetchedLeads].sort((a, b) => b.id - a.id); // Sort leads by ID initially
      setLeadsData(sortedData); // Set all leads data
      setLeads(sortedData); // Display leads after sorting
    }
  }, [fetchedLeads]);

  const applyFilters = (field, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: prev[field] === value ? '' : value };
      let filteredLeads = leadsData.filter(lead =>
        (!newFilters.assigned_user || lead.assigned_user === newFilters.assigned_user) &&
        (!newFilters.is_active || lead.is_active === newFilters.is_active) &&
        (!newFilters.lead_status || lead.lead_status === newFilters.lead_status) &&
        (!newFilters.campaign || lead.campaign === newFilters.campaign)
      );
      setLeads(filteredLeads);
      return newFilters;
    });
  };

  // Handle Sorting
  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = [...leads].sort((a, b) => {
      if (field === 'created_at' || field === 'modified_at') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[field] < b[field]) return newSortOrder === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setSortOrder(newSortOrder);
    setSortField(field);
    setLeads(sortedData);
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query === '') {
      setLeads(leadsData); // Show all leads if query is empty
    } else {
      // Filter the leads based on the search query
      const filteredLeads = leadsData.filter(lead =>
        lead.id.toString().includes(query) ||
        lead.first_name.toLowerCase().includes(query.toLowerCase()) ||
        lead.last_name.toLowerCase().includes(query.toLowerCase())
      );
      setLeads(filteredLeads); // Update the leads with the filtered data
    }
  };

  if (loading) {
    return <TableLoader />;
  }

  return (
    <>
      <main className="p-6 flex-1">
        <div className="overflow-y-auto max-h-[84vh] shadow-md rounded-lg">
          <div className="flex items-center justify-end border border-[#e8eaed] rounded-t-lg bg-white px-4 py-2">
            <h3 className="mr-auto text-xl font-medium">Lead List</h3>
            <Searchbar onSearch={handleSearch} />
          </div>
          <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-200 uppercase bg-gray-600">
              <tr>
                <th className="poppins-semibold px-6 py-3">ID</th>
                <th className="poppins-semibold px-6 py-3">Customer Details</th>
                <th className="poppins-semibold px-6 py-3">
                  <button onClick={() => handleSort('created_at')} className="uppercase flex gap-2 items-center cursor-pointer">
                    Created At
                    {sortField === 'created_at' ? (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                  </button>
                </th>
                <th className="poppins-semibold px-6 py-3">
                  <button onClick={() => handleSort('modified_at')} className="uppercase flex gap-2 items-center cursor-pointer">
                    Last Modified
                    {sortField === 'modified_at' ? (sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                  </button>
                </th>
                <th className="poppins-semibold px-6 py-3">Agent</th>
                <th className="poppins-semibold px-6 py-3 text-nowrap">Transferred to</th>
                <th className="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {leads.length > 0 ? (
                leads.map((lead, index) => (
                  <tr key={lead._id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                    <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                    <td className="poppins-semibold px-6 py-4">
                      {lead.firstName} {lead.lastName} - {lead.phoneNumber}
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-blue-500 bg-blue-100 font-medium rounded-lg text-xs text-center me-1 px-[10px] py-[3px] cursor-pointer"
                          onClick={() => applyFilters('assigned_user', lead.userId.name)}>{lead.userId.name}</span>
                        <span className={`text-gray-900 font-medium rounded-lg text-xs px-[10px] py-[3px] text-center me-1 cursor-pointer ${lead.is_active === "Active" ? 'bg-green-100 !text-green-600' : 'bg-red-100 !text-red-600'}`}
                          onClick={() => applyFilters('is_active', lead.isActive)}>
                          {lead.isActive}
                        </span>
                        <span className="bg-cyan-100 text-cyan-600 font-medium rounded-lg text-xs px-[10px] py-[3px] text-center me-1 cursor-pointer"
                          onClick={() => applyFilters('lead_status', lead.statusId.name)}>{lead.statusId.name}</span>
                      </div>
                    </td>
                    <td className="poppins-semibold px-6 py-4">{formatDate(lead.createdAt)}</td>
                    <td className="poppins-semibold px-6 py-4">{formatDate(lead.updatedAt)}</td>
                    <td className="poppins-semibold px-6 py-4">{lead.userId.name}</td>
                    <td className="poppins-semibold px-6 py-4">{lead.transfer_to}</td>
                    <td className="poppins-semibold px-6 py-4 cursor-pointer">
                      <Link to={`/edit-lead/${lead._id}`} title="Edit Lead">
                        <TbEdit size={24} className='text-gray-500' />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center py-4">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default ShowLeads;
