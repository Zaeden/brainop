import { useState, useRef } from "react";
import { PiCameraFill } from "react-icons/pi";
import profileImage from "../assets/images/profile image.png";
import { useNavigate } from "react-router-dom";
import { notifyFailure, notifySuccess } from "../utils/toast";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState("");
  const [placeholderImage, setPlaceholderImage] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlaceholderImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // Function to upload image to cloudinary
  const uploadToCloudinary = async () => {
    const { VITE_CLOUDINARY_PRESET, VITE_CLOUDINARY_CLOUD_NAME } = import.meta
      .env;

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", `${VITE_CLOUDINARY_PRESET}`);
    data.append("cloud_name", `${VITE_CLOUDINARY_CLOUD_NAME}`);

    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvkdfcjpu/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      return cloudinaryData.url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Post the data to the server
  const postData = async () => {
    try {
      let postImageUrl = "";

      if (imageFile) {
        postImageUrl = await uploadToCloudinary();
        if (!postImageUrl) {
          notifyFailure("Failed to upload image. Please try again.");
          return;
        }
      }

      const { VITE_BASE_URL } = import.meta.env;

      const userPostData = {
        body: caption,
        image: postImageUrl,
      };

      const token = localStorage.getItem("access_token");
      console.log(token);
      const res = await fetch(`${VITE_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(userPostData),
      });

      const data = await res.json();

      if (data) {
        notifySuccess("Post Shared Successfully");
        navigate("/create-post");
        navigate("/feed");
      }
    } catch (error) {
      notifyFailure("Some Error Occurred");
      navigate("/create-post");
    }
  };

  return (
    <div
      id="create-post"
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="w-full max-w-lg p-4 bg-white border border-gray-300 rounded-lg">
        <div className="flex justify-between pb-2 border-b border-gray-300">
          <h3 className="text-lg font-bold text-center flex-grow">
            Create New Post
          </h3>
          <button
            onClick={postData}
            className="px-4 py-1 text-hotPink-500 border border-hotPink-500 rounded-full hover:bg-hotPink-500 hover:text-white transition duration-200"
          >
            Share
          </button>
        </div>
        <div className="py-2 border-b border-gray-300">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div
            className="w-80 h-80 mx-auto flex justify-center items-center border-4 border-dashed rounded-lg cursor-pointer"
            onClick={handleButtonClick}
          >
            {placeholderImage ? (
              <img
                src={placeholderImage}
                alt="Post"
                className="block aspect-square mx-auto"
              />
            ) : (
              <PiCameraFill className="text-4xl text-gray-400" />
            )}
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-center mb-2">
            <img
              src={profileImage}
              alt="User"
              className="w-10 h-10 mr-2 rounded-full"
            />
            <h3 className="text-sm font-medium">Mizan Ali Khan</h3>
          </div>
          <textarea
            placeholder="Write a caption..."
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="w-full h-20 p-2 border border-gray-300 rounded resize-none focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
