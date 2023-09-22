import React from "react";

const PaymentHeading = (props) => {
  return (
    <button className=" text-white relative p-1 group z-20">
      <span className="absolute w-[20px] h-[32px] -left-[10px] bg-[#000F1D] z-20"></span>
      <div className="flex justify-around text-[12px] font-semibold items-center  relative btn-explore px-8 py-2 before:!border-2 after:!border-2 before:!border-l-0 after:!border-l-0 before:!border-[#F1BF3F] after:!border-[#F1BF3F]">
        <span className="btn-explore-text"> {props.title}</span>
      </div>
      <span className="absolute pulse3 z-30 left-1 -top-[1px] border rounded w-[6px] h-[50px] bg-[#ffd15f]"></span>
    </button>
  );
};

export default PaymentHeading;
