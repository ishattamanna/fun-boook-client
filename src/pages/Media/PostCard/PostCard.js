import React, { useContext, useState } from "react";
import { FaHamburger } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../contexts/AuthProvider";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-hot-toast";

const PostCard = ({ post, refetch, setCommentsModal, setEditModal }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const {
    authorEmail,
    authorName,
    authorProfileImage,
    caption,
    date,
    picture,
    _id,
    reactors,
    comments,
  } = post;

  const handleLike = (id) => {
    fetch(
      `https://fun-book-server.vercel.app/like?id=${id}&reactorEmail=${user?.email}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          refetch();
        }
      });
  };

  const handleComment = (event) => {
    event.preventDefault();

    const form = event.target;
    // const postId = form.input;
    // console.log(form);
    const commentInfo = {
      comment,
      commenterEmail: user?.email,
      commenterName: user?.displayName,
      commenterImage: user?.photoURL,
      postId: _id,
    };
    console.log(commentInfo);

    fetch(`https://fun-book-server.vercel.app/comment`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          refetch();
        }
      });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            fetch(
              `https://fun-book-server.vercel.app/deletepost?postId=${id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                  toast.success("Your content has been removed");
                  refetch();
                }
              }),
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  return (
    <div className="lg:w-[80%] w-[90%] mx-auto mt-5 rounded-lg border-2 p-2 border-black">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={authorProfileImage}
              alt=""
            />
            <div className="text-start ml-2">
              <p className="font-bold">{authorName}</p>
              <p className="text-sm text-gray-400">Date: {date}</p>
            </div>
          </div>
          <div
            className={`${user?.email !== authorEmail ? "hidden" : "block"}`}
          >
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-gray-200 rounded-box w-52"
              >
                <li>
                  <button
                    onClick={() => handleDelete(_id)}
                    disabled={user?.email !== authorEmail}
                    className={`flex`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <p className="font-bold">Delete Post</p>
                  </button>
                </li>
                <li>
                  <label
                    htmlFor="EditModal"
                    onClick={() => setEditModal(post)}
                    disabled={user?.email !== authorEmail}
                    className="flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>

                    <p className="font-bold">Edit Post</p>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-start my-5">{caption}</p>
        <img className="w-full" src={picture} alt="" />
        <p className="text-start my-2 text-sm">
          {reactors?.length > 0 ? reactors?.length : 0} likes{" "}
          {comments?.length > 0 ? comments?.length : 0} comment
        </p>
      </div>
      <div className="flex items-center justify-between mt-2 border-t-2 border-b-2 border-black mb-2">
        <button
          onClick={() => handleLike(_id)}
          className={`btn btn-ghost cursor-pointer border-r-2 w-[30%]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`lg:w-60 w-16 h-6 ${
              reactors?.includes(user?.email) ? "text-blue-600" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </button>
        <label
          onClick={() => setCommentsModal(post)}
          htmlFor="allCommentsModal"
          className="btn btn-ghost cursor-pointer border-r-2 border-l-2 w-[30%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="lg:w-60 w-16 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </label>
        <button className="btn btn-ghost cursor-pointer border-l-2 w-[30%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="lg:w-60 w-16 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
      </div>
      <form
        onSubmit={handleComment}
        className="flex items-center justify-around"
      >
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={user?.photoURL}
          alt=""
        />
        <input
          type="text"
          placeholder="Type here"
          name={`comment ${_id}`}
          onChange={(event) => setComment(event.target.value)}
          className="input input-bordered w-[90%] border-black mx-2 rounded-3xl"
        />
        <button disabled={!comment} type="submit" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default PostCard;
