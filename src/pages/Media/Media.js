import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AllCommentsModal from "./PostCard/AllCommentsModal/AllCommentsModal";
import EditModal from "./PostCard/EditModal/EditModal";
import PostCard from "./PostCard/PostCard";

const Media = () => {
  const [commentsModal, setCommentsModal] = useState("");
  const [editModal, setEditModal] = useState("");

  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://fun-book-server.vercel.app/posts").then((res) =>
        res.json()
      ),
  });

  console.log(posts);

  return (
    <div className="w-full h-screen overflow-y-scroll pt-10 pb-20">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refetch={refetch}
          setCommentsModal={setCommentsModal}
          setEditModal={setEditModal}
        ></PostCard>
      ))}
      <AllCommentsModal
        setCommentsModal={setCommentsModal}
        commentsModal={commentsModal}
      ></AllCommentsModal>
      {editModal && (
        <EditModal
          editModal={editModal}
          setEditModal={setEditModal}
          refetch={refetch}
        ></EditModal>
      )}
    </div>
  );
};

export default Media;
