import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";

const EditModal = ({ editModal, setEditModal, refetch }) => {
  const { user } = useContext(AuthContext);

  const { caption, picture, _id } = editModal;
  const [changingImage, setChangingImage] = useState(picture);
  const [changingCaption, setChangingCaption] = useState(caption);

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatingCaption = changingCaption;
    const image = changingImage;
    const postId = _id;

    const updatingPostInfo = {
      image,
      updatingCaption,
      postId,
    };

    fetch(`https://fun-book-server.vercel.app/updatePost`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatingPostInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          refetch();
          setEditModal(null);
          toast.success("Your content updated successfully");
        }
      });
  };

  const handleImage = (event) => {
    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_bb_secret}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData.data.url);
        setChangingImage(imageData.data.url);
      });
  };

  return (
    <div>
      <input type="checkbox" id="EditModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setEditModal(null)}
            htmlFor="EditModal"
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
          <form onSubmit={handleUpdate}>
            <textarea
              onChange={(event) => setChangingCaption(event.target.value)}
              name="caption"
              defaultValue={caption}
              className="textarea textarea-bordered border-black w-full mt-5"
              placeholder="What's on your mind?"
            ></textarea>
            <img
              className="w-full lg:h-[200px] h-[150px] mx-auto rounded-lg border-2 border-black"
              src={changingImage}
              alt=""
            />
            <input
              type="file"
              name="image"
              onChange={handleImage}
              placeholder="Upload Image"
              className="file-input file-input-bordered file-input-primary w-full mt-2"
            />
            <button
              disabled={
                changingCaption === (caption || false) &&
                changingImage === (picture || false)
              }
              type="submit"
              className="btn btn-primary w-full mt-5"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
