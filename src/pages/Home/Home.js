import React, { useEffect, useState } from "react";
import FeaturedPosts from "./FeaturedPosts/FeaturedPosts";
import PostModal from "./WOUM/PostModal/PostModal";
import WOUM from "./WOUM/WOUM";

const Home = () => {
  const [modaltoggler, setModalToggler] = useState(true);

  useEffect(() => {
    setModalToggler(true);
  }, [modaltoggler]);

  return (
    <div className="w-full h-screen overflow-y-scroll overflow-x-hidden pb-10">
      <WOUM></WOUM>
      {modaltoggler && (
        <PostModal setModalToggler={setModalToggler}></PostModal>
      )}
      <FeaturedPosts></FeaturedPosts>
    </div>
  );
};

export default Home;
