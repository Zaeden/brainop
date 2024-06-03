import { useEffect, useState } from "react";
import { notifyFailure } from "../utils/toast.js";
import PostCard from "../components/PostCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Navbar from "../components/Navbar.jsx";

const PostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const { VITE_BASE_URL } = import.meta.env;
        const response = await fetch(
          `${VITE_BASE_URL}/api/posts?page=${page}&limit=10`,
          {
            headers: {
              Authorization: `${localStorage.getItem("access_token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok && data.message === "Success") {
          setPosts((prevPosts) => [...prevPosts, ...data.posts]);
          setHasMore(data.posts.length > 0);
        } else {
          notifyFailure(data.message);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load posts", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  return (
    <>
      <Navbar />

      {/* ------Post feed------ */}
      <div
        id="home"
        className="flex flex-col items-center justify-center px-8 py-8 mx-auto w-full max-w-5xl"
      >
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
        {loading && <LoadingSpinner />}
        {!loading && hasMore && (
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="border px-4 py-2 rounded-full mt-4"
          >
            Load More
          </button>
        )}
        {!loading && !hasMore && (
          <p className="text-gray-500 mt-4">No more posts to load.</p>
        )}
      </div>
    </>
  );
};

export default PostsComponent;
