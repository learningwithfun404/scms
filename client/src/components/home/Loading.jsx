import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring Animation */}
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>

        {/* Inner Spinner */}
        <span className="loading loading-spinner text-primary w-12"></span>
      </div>

      {/* Subtle Text */}
    </div>
  );
};

export default Loading;
