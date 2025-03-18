import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function DropImageMulti({ images, setImages }) {
  const t = useTranslations("");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImages([...(images || []), file]);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    setImages([...(images || []), file]);
  };

  const clearFiles = (i) => {
    setImages((prev) => {
      const x = [...prev];
      x.splice(i, 1);
      return x;
    });
  };

  return (
    <>
      <div
        className="flex items-center justify-center w-full mb-5"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center w-full h-44 border-[3px] border-[#A4ACAD] bg-white border-dashed rounded-lg cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="bg-[#A4ACAD] px-3 py-1 font-semibold text-4xl text-white rounded-full">
              +
            </div>
            <div className="text-[#A4ACAD] text-xl">{t("choose-image")}</div>
          </div>
          <input
            id="DropImageMulti-file"
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </label>
      </div>
      <div className="flex items-center gap-5">
        {images?.map((file, i) => (
          <div key={i} className="relative w-20 h-20">
            <div
              className="absolute cursor-pointer -left-2 text-red-500 border-2 border-red-500 rounded-full text-xs px-1 shadow-md -top-2 z-10"
              onClick={() => clearFiles(i)}
            >
              X
            </div>
            <img
              className="object-contain border p-1 rounded-md"
              src={typeof file == "string" ? file : URL.createObjectURL(file)}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
