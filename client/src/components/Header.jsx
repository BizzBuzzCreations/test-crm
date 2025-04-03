import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineNotificationsNone, MdNotificationsActive } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [notifyClicked, setNotifyClicked] = useState(false);

  const menuRef = useRef(null); // Ref to track the profile menu
  const avatarRef = useRef(null); // Ref to track the avatar button
  const notifyRef = useRef(null); // Ref to track the notification button

  // Handle avatar click to toggle the profile menu visibility
  const handleClicked = () => {
    setAvatarClicked(prevState => {
      if (!prevState) setNotifyClicked(false); // Close notification dropdown if opening avatar dropdown
      return !prevState;
    });
  };

  const handleNotificationClick = () => {
    setNotifyClicked(prevState => {
      if (!prevState) setAvatarClicked(false); // Close avatar dropdown if opening notification dropdown
      return !prevState;
    });
  };

  // Profile name & role
  const role = "admin";
  const username = "Mohd Ahsan Raza Khan";

  // Get the current path
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    // Use switch for matching exact paths
    switch (true) {
      case path === '/' || path === '/dashboard':
        return 'Dashboard';
      case path === '/leads':
        return 'Show Leads';
      case path === '/users':
        return 'Show Users';
      case path === '/campaigns':
        return 'Show Campaigns';
      case path === '/teams':
        return 'Show Teams';
      case path === '/user-types':
        return 'Show User Types';
      case path === '/status':
        return 'Show Statuses';
      case path === '/add-lead':
        return 'Add Lead';
      case path === '/add-user':
        return 'Add User';
      case path === '/add-campaign':
        return 'Add Campaign';
      case path === '/add-team':
        return 'Add Team';
      case path === '/add-user-type':
        return 'Add User Type';
      case path === '/add-status':
        return 'Add Status';
      // Check for /edit-lead/:id using startsWith to match dynamic path
      case path.startsWith('/edit-lead/'):
        return 'Edit Lead';
      case path.startsWith('/edit-user/'):
        return 'Edit User';
      case path.startsWith('/edit-campaign'):
        return 'Edit Campaign';
      case path.startsWith('/edit-team/'):
        return 'Edit Team';
      case path.startsWith('/edit-user-type'):
        return 'Edit User Type';
      case path.startsWith('/edit-status/'):
        return 'Edit Status';
      default:
        return 'Dashboard';
    }
  };

  // Close the profile menu if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside of the menu, avatar button, or notification button, close the menus
      if (menuRef.current && !menuRef.current.contains(event.target) && !avatarRef.current.contains(event.target) && !notifyRef.current.contains(event.target)) {
        setAvatarClicked(false);
        setNotifyClicked(false);
      }
    };

    // Add event listener for mouse clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* <!-- Top Bar --> */}
      <header className="bg-white shadow py-4 px-14 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          {/* Menu Button */}
          <button
            onClick={toggleSidebar}
            className="cursor-pointer"
          >
            {isSidebarOpen ? (
              <TbLayoutSidebarLeftCollapse
                size={34}
                className="text-gray-800 stroke-[1.2px] transition-transform duration-700 ease-in-out transform"
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                size={34}
                className="text-gray-800 stroke-[1.2px] transition-transform duration-700 ease-in-out transform"
              />
            )}
          </button>
          <h2 className="poppins-medium text-3xl text-gray-600">{getTitle()}</h2>
        </div>
        <div className="flex gap-5 items-center">
          {/* Notification Button */}
          <div className="relative">
            <div className="cursor-pointer" onClick={handleNotificationClick} ref={notifyRef}>
              {notifyClicked ? (
                <MdNotificationsActive size={32} className="text-gray-800" />
              ) : (
                <MdOutlineNotificationsNone size={32} className="text-gray-800" />
              )}
            </div>
            {/* Conditionally render notification menu based on notifyClicked */}
            {notifyClicked && (
              <div ref={menuRef} className={`rounded-lg border border-gray-300 absolute w-max -right-[10px] top-11 bg-white shadow transition-all transform duration-300 ease-out ${notifyClicked ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                <div className="absolute right-[18px] top-[-7px] w-0 h-0 border-solid border-t-0 border-r-[7px] border-b-[7px] border-l-[7px] border-transparent border-b-gray-300"></div>
                <div className="bg-white w-auto rounded-lg p-4">
                  <h4 className="font-semibold">Notifications</h4>
                  <ul className="flex flex-col gap-2 mt-2">
                    <li className="py-2 text-gray-600 border border-gray-300 hover:bg-gray-300 rounded-lg px-3">You have 3 new notifications</li>
                    <li className="py-2 text-gray-600 border border-gray-300 hover:bg-gray-300 rounded-lg px-3">New comment on your post</li>
                    <li className="py-2 text-gray-600 border border-gray-300 hover:bg-gray-300 rounded-lg px-3">You were mentioned in a comment</li>
                    <li className="py-2 text-gray-600 border border-gray-300 hover:bg-gray-300 rounded-lg px-3">Someone liked your photo</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="cursor-pointer" onClick={handleClicked} ref={avatarRef}>
              <Avatar
                name={username}
              />
            </div>
            {/* Conditionally render profile menu based on avatarClicked */}
            {avatarClicked && (
              <div ref={menuRef} className={`rounded-lg border border-gray-300 absolute w-max right-0 top-14 bg-white shadow transition-all transform duration-300 ease-out ${avatarClicked ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                <div class="absolute right-[18px] top-[-7px] w-0 h-0 border-solid border-t-0 border-r-[7px] border-b-[7px] border-l-[7px] border-transparent border-b-gray-300">
                </div>

                <div className="flex items-center gap-2 border-b border-gray-300 p-2">
                  <Avatar name={username} />
                  <div>
                    <h3>{username}</h3>
                    <small>{role}</small>
                  </div>
                </div>
                <div className="flex gap-3 items-center p-2 pl-5 rounded-b-lg hover:bg-gray-100 cursor-pointer">
                  <HiOutlineLogout size={20} className="stroke-[1.4px]" />
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
