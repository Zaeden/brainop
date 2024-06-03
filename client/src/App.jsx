import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// Lazy loading the components
const SignUp = lazy(() => import("./components/SignUp.jsx"));
const CreatePost = lazy(() => import("./components/CreatePost.jsx"));
const PostFeed = lazy(() => import("./components/PostFeed.jsx"));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<PostFeed />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
