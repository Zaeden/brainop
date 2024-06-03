import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const PostCard = ({ post }) => {
  console.log(post);
  const [postData, setPostData] = useState(post);

  return (
    <div className="w-full max-w-md border border-gray-200 rounded-3xl mb-8">
      <div className="flex items-center p-4">
        <img
          src={post.postedBy.profileImage}
          alt="User"
          className="w-10 h-10 rounded-full mr-2"
        />
        <h3 className="text-sm">{post.postedBy.username}</h3>
      </div>
      <div className="w-full">
        <img src={post.image} alt="Post" className="w-full" />
      </div>
      <div className="p-4">
        <button className="bg-transparent border-none cursor-pointer">
          <FaHeart className="text-hotPink-800" />
        </button>

        <h5 className="mt-2 mb-2">{postData.likes.length} Like</h5>
        <p className="text-sm mb-2">{post.body}</p>

        <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-800">
          View all comments
        </p>
        <div className="w-full flex items-center mt-4 flex-wrap sm:flex-nowrap">
          <div className="text-xl mb-2 sm:mb-0">
            <MdOutlineEmojiEmotions />
          </div>
          <input
            type="text"
            name="comment"
            placeholder="Add a comment..."
            value={""}
            className="flex-grow p-2 mx-2 border-none focus:outline-none mb-2 sm:mb-0"
          />
          <button className="bg-transparent border border-hotPink-500 text-hotPink-500 rounded px-2 py-1 font-bold cursor-pointer">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
