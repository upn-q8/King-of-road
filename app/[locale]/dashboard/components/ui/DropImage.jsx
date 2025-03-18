import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function Dropzone({ img, setImg }) {
  const [selectImage, setSelectImage] = useState();

  const t = useTranslations("");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImg(file);
    setSelectImage(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    setImg(file);
    setSelectImage(URL.createObjectURL(file));
  };

  const clearFiles = () => {
    setImg(null);
    setSelectImage(null);
  };

  return (
    <>
      <div
        className="flex items-center justify-center w-full mb-5"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center w-full h-44 border-[3px] border-[#A4ACAD] bg-white border-dashed rounded-lg cursor-pointer">
          {img == null ? (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="bg-[#A4ACAD] px-3 py-1 font-semibold text-4xl text-white rounded-full">
                  +
                </div>
                <div className="text-[#A4ACAD] text-xl">
                  {t("choose-image")}
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </>
          ) : (
            <div className="flex flex-col gap-5">
              {/* {uploadedFileArr.map((file) => (
              <span key={file.name}>{file.name}</span>
            ))} */}
              <img
                className="max-w-48 max-h-36"
                src={typeof img == "string" ? img : URL.createObjectURL(img)}
                alt=""
              />
              <Button onClick={clearFiles}>Clear File</Button>
            </div>
          )}
        </label>
      </div>
    </>
  );
}
