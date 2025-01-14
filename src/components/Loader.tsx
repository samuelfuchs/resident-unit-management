import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  message?: string;
  color?: "blue" | "white";
}

const sizeClasses = {
  small: "h-5 w-5",
  medium: "h-10 w-10",
  large: "h-20 w-20",
};

const colorClasses = {
  blue: "text-blue-500",
  white: "text-white",
};

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  message = "",
  color = "blue",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <svg
        className={`animate-spin ${colorClasses[color]} ${sizeClasses[size]} mb-2`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {message !== "" && size !== "small" && (
        <p
          className={`${
            color === "white" ? "text-white" : "text-gray-700"
          } text-sm`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
