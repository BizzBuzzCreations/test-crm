import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = ({ isOpen }) => {
    // State for dropdown visibility
    const [dropdownVisibility, setDropdownVisibility] = useState({
        leads: false,
        users: false,
        campaigns: false,
        teams: false,
        userTypes: false,
        status: false,
    });

    // Function to handle dropdown
    const toggleDropdown = (menu) => {
        setDropdownVisibility((prevState) => {
            // Close all dropdowns first
            const updatedState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            // Toggle the clicked dropdown
            updatedState[menu] = !prevState[menu];
            return updatedState;
        });
    };

    let date = new Date();
    let year = date.getFullYear();

    return (
        <div
            className={`transition-all duration-300 bg-blue-600 text-white w-64 max-h-full fixed top-0 left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
            {/* <!-- Sidebar --> */}
            <aside id="sidebar" className="flex flex-col bg-[#fbfbfc] text-slate-800 w-64 space-y-6 py-7 px-3 transition-all duration-300 h-[100vh]">
                <div className="w-44 ml-4">
                    <img src={logo} alt="BBC Logo" />
                </div>
                <nav className="flex flex-col gap-2">
                    <NavLink to="/" onClick={(e) => e.stopPropagation()} className="active py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe]">
                        <div className="flex items-center gap-3"
                            onClick={(e) => {
                                // Prevent the dropdown toggle when clicking the Dashboard link
                                if (e.target.tagName.toLowerCase() !== 'a') {
                                    toggleDropdown('dashboard');
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path
                                    d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path
                                    d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            Dashboard
                        </div>
                    </NavLink>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.leads ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('leads')}>
                            <i className="bi bi-person-lines-fill text-xl"></i>
                            <p>Leads</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.leads ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>
                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.leads ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/leads" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show Leads</NavLink></li>
                                <li><NavLink to="/add-lead" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add Lead</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.users ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('users')}>
                            <i className="bi bi-people-fill text-xl"></i>
                            <p>Users</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.users ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>

                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.users ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/users" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show Users</NavLink></li>
                                <li><NavLink to="/add-user" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add User</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.campaigns ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('campaigns')}>
                            <i className="bi bi-megaphone-fill text-xl"></i>
                            <p>Campaigns</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.campaigns ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>
                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.campaigns ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/campaigns" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show Campaigns</NavLink></li>
                                <li><NavLink to="/add-campaign" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add Campaign</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.teams ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('teams')}>
                            <i className="bi bi-file-earmark-font-fill text-xl"></i>
                            <p>Teams</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.teams ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>

                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.teams ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/teams" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show Teams</NavLink></li>
                                <li><NavLink to="/add-team" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add Team</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.userTypes ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('userTypes')}>
                            <i className="bi bi-person-video2 text-xl"></i>
                            <p>User Types</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.userTypes ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>

                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.userTypes ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/user-types" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show User Types</NavLink>
                                </li>
                                <li><NavLink to="/add-user-type" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add User Type</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`menus ${dropdownVisibility.status ? 'active' : ''} py-2.5 px-4 rounded-lg transition duration-200 text-gray-400 hover:text-[#8b5cf6] hover:bg-[#f3eefe] flex items-center gap-3`} onClick={() => toggleDropdown('status')}>
                            <i className="bi bi-asterisk text-xl"></i>
                            <p>Status</p>
                            <div className='ml-auto'>
                                {dropdownVisibility.status ?
                                    (<IoIosArrowUp className='stroke-1 size-5' />)
                                    :
                                    (<IoIosArrowDown className='stroke-1 size-5' />)
                                }
                            </div>
                        </div>

                        {/* <!-- Dropdown Menu --> */}
                        <div
                            className={`submenus ${dropdownVisibility.status ? 'block' : 'hidden'} left-0 bg-white text-gray-400 rounded-lg shadow-md p-2 transition-all duration-400 ease-in-out`}>
                            <ul>
                                <li><NavLink to="/status" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Show Statuses</NavLink>
                                </li>
                                <li><NavLink to="/add-status" className="block px-4 py-2 text-md focus:!text-[#8b5cf6] hover:!text-[#8b5cf6] !bg-transparent !text-gray-400">Add Status</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- Footer --> */}
                <footer className="text-gray-500 text-center p-3">
                    &copy; {year} BBC CRM
                </footer>
            </aside>
        </div>
    )
}

export default Sidebar