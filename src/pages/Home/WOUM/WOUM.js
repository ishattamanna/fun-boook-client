import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";

const WOUM = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-5 lg:ml-5 lg:w-full w-[90%] mx-auto">
      <div className="flex items-center">
        {user?.photoURL ? (
          <>
            <div className="avatar">
              <div className="lg:w-16 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <FaUserAlt className="text-3xl" />
          </>
        )}
        <label
          htmlFor="postModal"
          className="border-2 border-black rounded-3xl w-[90%]  py-3 lg:ml-5 ml-2 font-bold cursor-pointer bg-slate-200"
        >
          What's on your mind?
        </label>
      </div>
    </div>
  );
};

export default WOUM;
