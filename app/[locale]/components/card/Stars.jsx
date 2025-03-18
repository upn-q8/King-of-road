import React from "react";

function Stars({ rate }) {
  return (
    <div className="flex text-yellow-500 text-sm items-center md:gap-3 gap-1 my-2">
      {Array.from({ length: Number(rate) })?.map((item, i) => (
        <img key={i} src="/home/starYellow.png" alt="" />
      ))}
      {Array.from({ length: 5 - Number(rate) })?.map((item, i) => (
        <img key={i} src="/home/starBorder.png" alt="" />
      ))}
      ({rate})
    </div>
  );
}

export default Stars;
