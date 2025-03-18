import React from "react";

function Title({ title ,className }) {
  return (
    <>
    <div className="flex justify-center items-center gap-1"> 
      <img src="/home/title-icon.png"  alt="" />
      <h1 className={`text text-2xl md:text-3xl font-semibold ${className} `}>{title}</h1>
    </div>
    </>
  );
}

export default Title;
