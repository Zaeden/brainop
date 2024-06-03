import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-hotPink-500"></div>
    </div>
  );
};

export default LoadingSpinner;
