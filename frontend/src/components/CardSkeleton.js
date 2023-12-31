import React from "react";

export default function CardSkeleton() {
  return (
    <div
      role="status"
      className="bg-white max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 grow"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
        <svg
          className="w-12 h-12 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-8 bg-gray-200 rounded mb-2.5"></div>
      <div className="h-7 w-24 bg-gray-200 rounded-full "></div>

      <div className="flex items-center mt-4 sm:space-x-3  justify-between">
        <div className="hidden sm:block">
          <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="w-full sm:w-32 h-9 bg-gray-200 rounded-full "></div>

      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
