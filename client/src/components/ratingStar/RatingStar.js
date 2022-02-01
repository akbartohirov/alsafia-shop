import React from "react";

const RatingStar = ({ value, star, color }) => {
  return (
    <span>
      <i
        style={{ color }}
        className={`${color} ${
          value >= star[0]
            ? "fas fa-star"
            : value >= star[1]
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }`}
      ></i>
    </span>
  );
};

export default RatingStar;
