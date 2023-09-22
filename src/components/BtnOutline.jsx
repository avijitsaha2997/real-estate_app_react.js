import React from "react";

const BtnOutline = (props) => {
  return (
    <button
      className=" border border-[#283646] hover:border-transparent rounded-[5px] w-full md:w-[15rem]"
      onMouseEnter={() => props.onMouseEnterEvent(true)}
      onMouseLeave={() => props.onMouseEnterEvent(false)}
    >
      <div
        className={`w-full h-full flex justify-around items-center outLineBtn text-white rounded text-xs md:text-sm font-robotoCondensed py-2 uppercase ${props.className}`}
      >
        {props.btnText}
        <div className="w-[25px]">
          <img src={props.btnImage} alt="btn image" />
        </div>
      </div>
    </button>
  );
};

export default BtnOutline;
