import React from "react";

const AllCommentsModal = ({ commentsModal }) => {
  const comments = commentsModal?.comments;
  console.log(comments);

  return (
    <div>
      <input type="checkbox" id="allCommentsModal" className="modal-toggle" />
      <label htmlFor="allCommentsModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">All Comments</h3>

          {comments?.map((comment, i) => (
            <div key={i} className="flex items-center mt-2">
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={comment.commenterImage}
                alt=""
              />
              <div className="ml-2 bg-gray-300 p-2 rounded-lg w-full">
                <h3 className="text-start font-bold">
                  {comment.commenterName}
                </h3>
                <div className="text-start">{comment.comment}</div>
              </div>
            </div>
          ))}
        </label>
      </label>
    </div>
  );
};

export default AllCommentsModal;
