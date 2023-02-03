import React from "react";

export default function IconBtn({ Icon, func }) {
  return (
    <button className="icon-btn" onClick={func && (() => func())}>
      <span>
        <Icon />
      </span>
    </button>
  );
}
