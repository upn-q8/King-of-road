import React from "react";

function TitleDecor({ title }) {
  return (
    <p className="flex gap-2 items-end text-xl">
      <img src="/decor.png" alt="" /> {title}
    </p>
  );
}

export default TitleDecor;
