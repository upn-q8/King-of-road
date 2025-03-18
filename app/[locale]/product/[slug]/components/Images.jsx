"use client";
import React, { useState } from "react";

function Images({ images, cover_image }) {
  const [showZoom, setShowZoom] = useState(false);

  return (
    <>
      {/* Image Zoom Dialog */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowZoom(null)}
        >
          <div className="max-w-4xl max-h-[90vh]">
            <img
              src={showZoom}
              alt="king of road"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
      <div className="bg-white p-2 md:py-8 rounded-xl shadow-md">
        <div className="space-y-4 2xl:w-[75%] w-[90%] max-md:w-full mx-auto">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={cover_image}
              alt="king of road"
              className="max-md:w-full mx-auto md:min-h-80 object-contain cursor-zoom-in"
              onClick={() => setShowZoom(cover_image)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-auto pb-4 scrollbar-thin max-w-full">
            {images?.map((image, index) => (
              <button
                key={index}
                className={`overflow-hidden min-w-[89px] max-w-[89px]`}
                onClick={() => setShowZoom(image)}
              >
                <img
                  src={image}
                  alt={`king of road ${index + 1}`}
                  className="rounded-xl w-full aspect-square"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Images;
