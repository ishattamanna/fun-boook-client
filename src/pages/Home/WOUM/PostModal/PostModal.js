import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const PostModal = ({ setModalToggler }) => {
  const { user } = useContext(AuthContext);
  const [writingStatus, setWritingStatus] = useState("");
  const [uploadingImage, setUploadingImage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const caption = form.caption.value;
    const image = form.image.files[0];

    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_bb_secret}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imagedata) => {
        console.log(imagedata?.data?.url);
        const postInfo = {
          authorName: user.displayName,
          authorEmail: user.email,
          authorProfileImage: user?.photoURL,
          caption,
          picture: imagedata?.data?.url,
        };

        console.log(postInfo);

        fetch(`https://fun-book-server.vercel.app/posts`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(postInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              setModalToggler(false);
              toast.success("Your content has been posted successfully");
            }
          });
      });
  };

  return (
    <div>
      {/* The button to open modal */}
      {/* <label htmlFor="postModal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="postModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="postModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-bold ml-2">{user?.displayName}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="caption"
              onChange={(event) => setWritingStatus(event.target.value)}
              className="textarea textarea-bordered border-black w-full mt-5"
              placeholder="What's on your mind?"
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={(event) => setUploadingImage(event.target.value)}
              placeholder="Upload Image"
              className="file-input file-input-bordered file-input-primary w-full mt-2"
            />
            <button
              type="submit"
              className="btn btn-primary w-full mt-5"
              disabled={!writingStatus && !uploadingImage}
            >
              post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
