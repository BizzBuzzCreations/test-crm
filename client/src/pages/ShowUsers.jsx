import React, { useEffect, useState } from 'react'
import { FaRegAddressBook } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader';

const ShowUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the data (NOTE: Replace with your actual API endpoint in the future)
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dummyjson.com/c/11a4-5ad2-403a-9d4c');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users: ', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <TableLoader />
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
                <th class="poppins-semibold px-6 py-3">Name</th>
                <th class="poppins-semibold px-6 py-3">Username</th>
                <th class="poppins-semibold px-6 py-3">Campaign</th>
                <th class="poppins-semibold px-6 py-3">Team</th>
                <th class="poppins-semibold px-6 py-3">User type</th>
                <th class="poppins-semibold px-6 py-3">Is Admin</th>
                <th class="poppins-semibold px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody id="leads-table-body">
              {users.map((user) => (
                <tr key={user.key} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                  <td className="poppins-semibold px-6 py-4">{user.id}</td>
                  <td className="poppins-semibold px-6 py-4">{user.name}</td>
                  <td className="poppins-semibold px-6 py-4">{user.username}</td>
                  <td className="poppins-semibold px-6 py-4">{user.campaign}</td>
                  <td className="poppins-semibold px-6 py-4">{user.team}</td>
                  <td className="poppins-semibold px-6 py-4">{user.user_type}</td>
                  <td className="poppins-semibold px-6 py-4">{user.is_admin}</td>
                  <td className="poppins-semibold px-6 py-4 flex items-center gap-4">
                    <Link to={`/leads?user_id=${user.id}`} title="Show Leads by User">
                      <FaRegAddressBook size={22} className='fill-gray-500' />
                    </Link>
                    <Link to={`/edit-user/${user.id}`} title="Edit User">
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

export default ShowUsers;