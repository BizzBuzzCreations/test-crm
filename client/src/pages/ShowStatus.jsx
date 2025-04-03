import React from 'react';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader';
import formatDate from '../utils/formatDate';
import useStatuses from '../hooks/useStatuses';

const ShowStatus = () => {

  const { statuses, loading } = useStatuses();

  if (loading) {
    return <TableLoader />;
  }

  return (
    <>
      {/* <!-- Show Leads --> */}
      <main className="p-6 flex-1">
        <div className="overflow-y-auto max-h-[84vh] shadow-md rounded-lg">
          <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-200 uppercase bg-gray-600">
              <tr>
                <th class="poppins-semibold px-6 py-3">ID</th>
                <th class="poppins-semibold px-6 py-3">Status Name</th>
                <th class="poppins-semibold px-6 py-3">Created At</th>
                <th class="poppins-semibold px-6 py-3">Last Modified</th>
                <th class="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {statuses.map((status, index) => (
                <tr key={status._id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                  <td className="poppins-semibold px-6 py-4">{status.name}</td>
                  <td className="poppins-semibold px-6 py-4">{status.createdAt ? formatDate(status.createdAt) : '-'}</td>
                  <td className="poppins-semibold px-6 py-4">{status.updatedAt ? formatDate(status.updatedAt) : '-'}</td>
                  <td className="poppins-semibold px-6 py-4">
                    <Link to={`/edit-status/${status._id}`} title="Edit Status">
                      <TbEdit size={24} className='text-gray-500' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default ShowStatus;