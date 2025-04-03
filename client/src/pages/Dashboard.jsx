import React, { useState, useEffect } from 'react';
import { MdPhoneCallback, MdCall } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";
import { PiUserListFill, PiUserCheckFill } from "react-icons/pi";
import { FaRegAddressBook, FaShoppingCart, FaHandHoldingUsd, FaFileInvoiceDollar, FaMoneyBillWave, FaCoins, FaBalanceScale } from 'react-icons/fa';


const Dashboard = () => {
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
      {/* <!-- Dashboard Content --> */}
      <main className="p-6 flex-1 h-auto bg-gray-100">
        {/* Admin Dashboard */}
        <section className="mb-5">
          <h2 className="text-2xl mb-3">Admin Dashboard</h2>
          <div className="grid gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center gap-5">
              {/* <!-- Active Leads --> */}
              <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
                {/* <!-- Stats --> */}
                <div className="flex justify-between items-start gap-7 p-5">
                  <div>
                    <p className="poppins-light text-lg text-slate-500 text-nowrap">Active Leads</p>
                    <h3 className="poppins-medium text-2xl text-slate-600">2405</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <PiUserCheckFill size={34} className="fill-green-500" />
                  </div>
                </div>
              </div>

              {/* <!-- Total Leads --> */}
              <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
                {/* <!-- Stats --> */}
                <div className="flex justify-between items-start gap-7 p-5">
                  <div>
                    <p className="poppins-light text-lg text-slate-500 text-nowrap">Total Leads</p>
                    <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <PiUserListFill size={34} className="fill-red-500" />
                  </div>
                </div>
              </div>

              {/* <!-- Total Callbacks --> */}
              <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
                {/* <!-- Stats --> */}
                <div className="flex justify-between items-start gap-7 p-5">
                  <div>
                    <p className="poppins-light text-lg text-slate-500 text-nowrap">Total Callbacks</p>
                    <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MdCall size={34} className="fill-amber-500" />
                  </div>
                </div>
              </div>

              {/* <!-- Callbacks Today --> */}
              <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
                {/* <!-- Stats --> */}
                <div className="flex justify-between items-start gap-7 p-5">
                  <div>
                    <p className="poppins-light text-lg text-slate-500 text-nowrap">Callbacks Today</p>
                    <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                  </div>
                  <div className="bg-violet-100 p-3 rounded-full">
                    <MdPhoneCallback size={34} className="fill-violet-600" />
                  </div>
                </div>
              </div>

              {/* <!-- New Web Leads --> */}
              <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
                {/* <!-- Stats --> */}
                <div className="flex justify-between items-start gap-7 p-5">
                  <div>
                    <p className="poppins-light text-lg text-slate-500 text-nowrap">New Web Leads</p>
                    <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BsGlobe2 size={34} className="fill-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md rounded-lg h-[85vh] xl:max-h-[48vh] overflow-y-auto">
              <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 roundeds">
                <thead className="text-sm text-gray-200 uppercase bg-gray-600">
                  <tr>
                    <th class="poppins-semibold px-6 py-3">Agents</th>
                    <th class="poppins-semibold px-6 py-3 text-nowrap">IVA Verified</th>
                    <th class="poppins-semibold px-6 py-3">DMP</th>
                    <th class="poppins-semibold px-6 py-3">Charity</th>
                    <th class="poppins-semibold px-6 py-3">Loan</th>
                  </tr>
                </thead>
                <tbody id="target-table-body">
                  {users.map((user) => (
                    <tr key={user.key} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 border-gray-200">
                      <td className="poppins-semibold px-6 py-4">{user.name}</td>
                      <td className="poppins-semibold px-6 py-4">02</td>
                      <td className="poppins-semibold px-6 py-4">01</td>
                      <td className="poppins-semibold px-6 py-4">00</td>
                      <td className="poppins-semibold px-6 py-4">00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <hr className="my-5 text-gray-400" />
        {/* User Dashboard */}
        <section>
          <h2 className="text-2xl mb-3">User Dashboard</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center gap-5">
            {/* <!-- Number of Leads --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">Number of Leads</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-sky-100 p-3 rounded-full">
                  <FaRegAddressBook size={34} className="fill-sky-500" />
                </div>
              </div>
            </div>

            {/* <!-- Total sales this month --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">Sales this month</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-cyan-100 p-3 rounded-full">
                  <FaShoppingCart size={34} className="fill-cyan-500" />
                </div>
              </div>
            </div>

            {/* <!-- IVA this month --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">IVA this month</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaHandHoldingUsd size={34} className="fill-indigo-500" />
                </div>
              </div>
            </div>

            {/* <!-- DMP this month --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">DMP this month</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <FaFileInvoiceDollar size={34} className="fill-teal-500" />
                </div>
              </div>
            </div>

            {/* <!-- Total Sales --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">Total Sales</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-pink-100 p-3 rounded-full">
                  <FaMoneyBillWave size={34} className="fill-pink-500" />
                </div>
              </div>
            </div>

            {/* <!-- Total IVA --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">Total IVA</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaCoins size={34} className="fill-yellow-500" />
                </div>
              </div>
            </div>

            {/* <!-- Total DMP --> */}
            <div className="bg-white border-2 border-gray-300 w-full rounded-lg hover:shadow-lg transition-all 2s ease-in-out">
              {/* <!-- Stats --> */}
              <div className="flex justify-between items-start gap-7 p-5">
                <div>
                  <p className="poppins-light text-lg text-slate-500 text-nowrap">Total DMP</p>
                  <h3 className="poppins-medium text-2xl text-slate-600">4205</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaBalanceScale size={34} className="fill-purple-500" />
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default Dashboard;