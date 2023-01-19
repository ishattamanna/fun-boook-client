import React, { useEffect, useState } from "react";
import PostModal from "../Home/WOUM/PostModal/PostModal";
import WOUM from "../Home/WOUM/WOUM";
import Abouts from "./Abouts/Abouts";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import UserPosts from "./UserPosts/UserPosts";

const Profile = () => {
  const [modaltoggler, setModalToggler] = useState(true);

  useEffect(() => {
    setModalToggler(true);
  }, [modaltoggler]);

  return (
    <div className="w-full h-screen overflow-y-scroll overflow-x-hidden">
      <ProfileBanner></ProfileBanner>
      <WOUM></WOUM>
      <div className="flex lg:flex-row flex-col-reverse">
        <UserPosts></UserPosts>
        <Abouts></Abouts>
      </div>
      {modaltoggler && (
        <PostModal setModalToggler={setModalToggler}></PostModal>
      )}
    </div>
  );
};

export default Profile;
