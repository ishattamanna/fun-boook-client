import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AllCommentsModal from "../../Media/PostCard/AllCommentsModal/AllCommentsModal";
import EditModal from "../../Media/PostCard/EditModal/EditModal";
import PostCard from "../../Media/PostCard/PostCard";

const FeaturedPosts = () => {
  const [commentsModal, setCommentsModal] = useState("");
  const [editModal, setEditModal] = useState("");

  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://fun-book-server.vercel.app/posts?limit=3").then((res) =>
        res.json()
      ),
  });

  return (
    <div className="py-10">
      {posts?.map((post) => (
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

export default FeaturedPosts;
