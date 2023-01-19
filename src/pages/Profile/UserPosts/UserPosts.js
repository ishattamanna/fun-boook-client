import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import AllCommentsModal from "../../Media/PostCard/AllCommentsModal/AllCommentsModal";
import EditModal from "../../Media/PostCard/EditModal/EditModal";
import PostCard from "../../Media/PostCard/PostCard";

const UserPosts = () => {
  const { user } = useContext(AuthContext);
  const [commentsModal, setCommentsModal] = useState("");
  const [editModal, setEditModal] = useState("");

  const { data: userPosts = [], refetch } = useQuery({
    queryKey: ["userposts", user],
    queryFn: () =>
      fetch(
        `https://fun-book-server.vercel.app/userposts?email=${user?.email}`
      ).then((res) => res.json()),
  });

  console.log(userPosts);

  return (
    <div
      className={`lg:w-[50%] pb-24 ${
        userPosts.length < 1 ? "hidden" : "block"
      }`}
    >
      {userPosts.map((userPost) => (
        <PostCard
          key={userPost._id}
          post={userPost}
          refetch={refetch}
          setCommentsModal={setCommentsModal}
          setEditModal={setEditModal}
        ></PostCard>
      ))}
      <AllCommentsModal
        commentsModal={commentsModal}
        setCommentsModal={setCommentsModal}
      ></AllCommentsModal>
      {editModal && (
        <EditModal
          editModal={editModal}
          setEditModal={setEditModal}
        ></EditModal>
      )}
    </div>
  );
};

export default UserPosts;
