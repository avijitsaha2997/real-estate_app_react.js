import React from "react";

const SkeletonSingleProperty = (props) => {
  return (
    <div
      className={`sm:px-12 md:px-20 lg:px-28 xl:px-32 2xl:px-40 py-2 md:py-12 md:flex ${
        props && props.className
      }`}>
      {props.children}
    </div>
  );
};

export default SkeletonSingleProperty;
