import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const ProfileBanner = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="w-full">
      <img
        className="container w-full rounded-lg"
        src="https://i.pinimg.com/originals/c0/c4/f0/c0c4f06b14625c8fb9c4cdcbaa58c6d8.png"
        alt=""
      />
      {/* <img src="https://source.unsplash.com/random/480x320" alt="" /> */}
      <div className="flex items-center justify-start">
        <div className="avatar -mt-20 shadow-md lg:-mt-40 rounded-full lg:ml-10 ml-5">
          <div className="lg:w-60 w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img className="w-full" src={user?.photoURL} alt="" />
          </div>
        </div>
        <p className="lg:text-3xl text-xl font-bold">{user?.displayName}</p>
      </div>
    </section>
  );
};

export default ProfileBanner;
