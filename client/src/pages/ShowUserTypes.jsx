import React from 'react';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader';
import formatDate from '../utils/FormatDate';
import useUserTypes from '../hooks/useUserTypes';

const ShowUserTypes = () => {

  const { userTypes, loading } = useUserTypes();

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
                <th className="poppins-semibold px-6 py-3">ID</th>
                <th className="poppins-semibold px-6 py-3">User Type</th>
                <th className="poppins-semibold px-6 py-3">Created At</th>
                {/* <th className="poppins-semibold px-6 py-3">Status (Active/Inactive)</th> */}
                <th className="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {userTypes.map((userType, index) => (
                <tr key={userType._id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{index + 1}</td>
                  <td className="poppins-semibold px-6 py-4">{userType.name}</td>
                  <td className="poppins-semibold px-6 py-4">{formatDate(userType.createdAt)}</td>
                  {/* <td className="poppins-semibold px-6 py-4">{userType.status}</td> */}
                  <td className="poppins-semibold px-6 py-4">
                    <Link to={`/edit-user-type/${userType._id}`} title="Edit User Type">
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
 
export default ShowUserTypes;