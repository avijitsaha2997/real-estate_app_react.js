import React, { useEffect, useRef, useState } from "react";
import SkeletonSingleProperty from "../../../components/Skeleton/SkeletonSingleProperty";
import HeadingText from "./HeadingText";
import PaymentCircle from "./PaymentItem";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";

import upArrow2 from "../../../assets/images/global/upArrow2.png";
import upArrow from "../../../assets/images/global/upArrow.png";
import tick from "../../../assets/images/property details page/icon-tick.svg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const PaymentPlan = (props) => {
  const [panelRef, setPanelRef] = useState(null);
  const paymentPlan = props.paymentPlan.slice(1);
  const circleDivRef = useRef(null);
  const parentRef = useRef(null);
  const scrollDiv = useRef(null);

  const planTitle = (plan) => {
    return plan.percentage
      ? plan.percentage
      : plan.installment
      ? plan.installment
      : plan.date;
  };

  const [firstPlan, setFirstPlan] = useState({
    title: planTitle(props.paymentPlan[0]),
    description: props.paymentPlan[0].milestone,
  });

  const [planList, setPlanList] = useState([
    {
      title: planTitle(props.paymentPlan[0]),
      description: props.paymentPlan[0].milestone,
    },
  ]);

  useEffect(() => {
    const newData = planList.find((item) => item.title == firstPlan.title);
    const newData2 = planList.find(
      (item, index) => index == props.paymentPlan.length - 1
    );

    if (!newData) {
      setPlanList([...planList, firstPlan]);
    } else if (newData2) {
      setPlanList([...planList, firstPlan]);
    }
  }, [firstPlan]);

  function checkHit() {
    if (!props.mobileView) {
      const holder = document
        .querySelector(".holder")
        .getBoundingClientRect().right;
      paymentPlan.map((item, index) => {
        const itemX =
          (document.querySelector(`.p-item-${index}`).getBoundingClientRect()
            .left +
            document.querySelector(`.p-item-${index}`).getBoundingClientRect()
              .right) /
          2;
        if (index == 0 && itemX > holder) {
          setFirstPlan({
            title: planTitle(props.paymentPlan[0]),
            description: props.paymentPlan[0].milestone,
          });
        }
        if (itemX <= holder) {
          setFirstPlan({
            title: planTitle(item),
            description: item.milestone,
          });

          gsap.to(`.p-item-${index}`, {
            opacity: 0,
            duration: 0.1,
          });
        } else {
          gsap.to(`.p-item-${index}`, {
            opacity: 1,
            duration: 0.1,
          });
        }
      });
    }
  }

  useEffect(() => {
    if (!props.mobileView) {
      const holder = document
        .querySelector(".holder")
        .getBoundingClientRect().left;
      console.log(holder, "holder");
      const ctx = gsap.context(() => {
        gsap.to(".p-item", {
          xPercent: -500,
          duration: 5,
          stagger: 1,
          onUpdate: checkHit,
          scrollTrigger: {
            trigger: ".payment-section",
            scrub: 0.5,
            start: "top 5%",
            end: "bottom 20%",
            pin: true,
            pinType: "transform",
          },
        });
      });
      return () => {
        ctx.revert();
      };
    }
  }, []);

  return (
    <section
      className="relative mb-5 mt-16 md:mt-0  payment-section"
      ref={parentRef}>
      <SkeletonSingleProperty className="px-5 flex-col ">
        <div className="w-full md:w-[80%] h-auto ml-0 md:ml-2">
          <HeadingText
            innerText="Payment Plan"
            className="items-start text-center w-full md:w-auto"
            size="px-4"
          />
        </div>
        <div className="w-full relative mt-20">
          {props.mobileView ? (
            <>
              <div className="flex items-start mx-10">
                <div
                  className={`panel flex justify-center items-center w-[3.5rem] h-[3.5rem] bg-gradient-to-r from-[#000F1D] via-[#00182E] to-[#000F1D] rounded-full `}>
                  <div className=" w-[2rem] h-[2rem] bg-white-0 rounded-full flex justify-center items-center z-20">
                    <div className="w-[.75rem] h-[.75rem] bg-[#FFD15F] rounded-full z-20"></div>
                  </div>
                </div>
                <div className={`flex w-full justify-between items-center`}>
                  <p className="font-robotoCondensed text-[16px] text-white tracking-[0] mr-12 pt-[10px]">
                    {firstPlan.description}
                  </p>
                  <h1 className={`font-oswald uppercase text-white `}>
                    {firstPlan.title}
                  </h1>
                </div>
              </div>
              {paymentPlan.map((item, idx) => {
                return (
                  <div className="flex items-center mx-10" key={idx}>
                    <div
                      className={`panel flex justify-center items-center w-[3.5rem] h-[3.5rem] bg-gradient-to-r from-[#000F1D] via-[#00182E] to-[#000F1D] rounded-full `}>
                      <div className=" w-[2rem] h-[2rem] bg-white-0 rounded-full flex justify-center items-center z-20">
                        <div className="w-[.75rem] h-[.75rem] bg-[#FFD15F] rounded-full z-20"></div>
                      </div>
                    </div>

                    <div className="flex justify-between w-full ml-2 relative">
                      <p className="text-center font-robotoCondensed text-[16px] text-white tracking-[0]">
                        {item.milestone}
                      </p>
                      <h1
                        className={`text-center font-oswald uppercase text-white text-[16px]
                `}>
                        {item.percentage
                          ? item.percentage
                          : item.installment
                          ? item.installment
                          : item.date}
                      </h1>
                      <div className="absolute w-[1px] -top-[40px] -left-[31px]  h-[50px] bg-yellow-400"></div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div
              className=" flex justify-center items-center w-3/4  pt-52 relative left-[25%]"
              ref={scrollDiv}>
              <div
                className={` basis-1/2 flex justify-center items-center z-10 holder`}>
                <div className={`absolute top-0 left-0 px-2 w-auto`}>
                  <h1
                    className={`font-oswald uppercase text-white text-[75px]`}>
                    {firstPlan.title}
                  </h1>
                  <p className="font-robotoCondensed text-[16px] text-white tracking-[0]">
                    {firstPlan.description}
                  </p>
                </div>
                <div className="w-[6rem] h-[6rem] bg-white-0 rounded-full flex justify-center items-center">
                  <div className="circle-border">
                    <div className="circle-white">
                      <p className="flex flex-col justify-center items-center">
                        <img src={upArrow2} alt="" />
                        <img src={upArrow} alt="" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {paymentPlan.map((item, index) => (
                <div
                  className={`basis-1/2 flex justify-center items-center z-10 p-item p-item-${index} `}
                  key={`payment-${index}`}>
                  <PaymentCircle
                    title={
                      item.percentage
                        ? item.percentage
                        : item.installment
                        ? item.installment
                        : item.date
                    }
                    description={item.milestone}
                    id={index}
                    refer={circleDivRef}
                    setPanelRef={setPanelRef}
                  />
                </div>
              ))}
              <div className="absolute w-full top-[7.6rem] md:top-[16.5rem] -right-[4.3rem] md:-right-32 h-[1px] md:h-[2px] bg-yellow-400"></div>
            </div>
          )}
        </div>
      </SkeletonSingleProperty>
      <div className="hidden md:flex flex-col items-start text-white fixed top-36 ml-40 ">
        {planList.map((item, idx) => (
          <div key={idx} className="flex items-start justify-center">
            <img
              src={tick}
              alt="tick"
              className=" w-[20px] h-[11.43px] ml-10"
            />
            <div className="ml-6">
              {item.title} {item.description}
            </div>
          </div>
        ))}
      </div>
      <div className="-rotate-90 absolute -right-[190px] top-[9rem] opacity-0 md:opacity-5 text-white mix-blend-overlay font-turretRoad">
        <h1 className="text-[70px] ">Payment Plan</h1>
      </div>
    </section>
  );
};

export default PaymentPlan;
