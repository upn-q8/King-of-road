import React from "react";

const RoundedButton = ({ className, onClick, text, type }) => {
  return (
    <button className={`${className} rounded-full`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundedButton;
