import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const menu = (
    <>
      <li className="font-bold text-xl">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="font-bold text-xl">
        <Link to={"/media"}>Media</Link>
      </li>
      <li className="font-bold text-xl">
        <Link>Message</Link>
      </li>
      <li className="font-bold text-xl">
        <Link>About</Link>
      </li>
    </>
  );

  return (
    <div
      className={`navbar bg-base-100 ${
        location.pathname === "/signin" || location.pathname === "/signup"
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="navbar-start">
        <div>
          <div className="lg:hidden">
            <div className="btm-nav">
              <NavLink to={"/"} className={(isActive) => "active"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </NavLink>
              <NavLink to={"/media"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </NavLink>
              <NavLink to={"/message"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </NavLink>
              <NavLink to={"/profile"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </NavLink>
              <NavLink>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
        <img className="w-[300px] h-[50px] p-0 m-0" src={logo} alt="" />
      </div>
      <div className={`navbar-center hidden w-[50%] lg:flex`}>
        <input
          type="text"
          placeholder="Search"
          className={`input input-bordered w-full ${
            location.pathname === "/profile" ? "hidden" : "block"
          }`}
        />
        <p
          className={`text-3xl font-bold text-center w-full ${
            location.pathname === "/profile" ? "block" : "hidden"
          }`}
        >
          {user?.displayName}
        </p>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <>
            <div className="dropdown dropdown-hover dropdown-end">
              <label tabIndex={0} className="btn btn-ghost m-1">
                <div className="flex items-center flex-row-reverse">
                  {user?.photoURL ? (
                    <>
                      <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={user.photoURL} alt="" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FaUserAlt className="text-3xl" />
                    </>
                  )}
                  <p className="font-bold mr-2 hidden lg:block">
                    {user?.displayName}
                  </p>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={handleSignOut} className="btn btn-outline">
                    Sign Out <FaSignOutAlt />
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to={"/signup"} className="btn">
              Get started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
