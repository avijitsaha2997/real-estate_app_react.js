import React, { useState, useEffect } from "react";
import SinglePropertyHeader from "../../SinglePropertyDetails/partials/SinglePropertyHeader";
import Filter from "./Filter";
import rightArrow from "../../../assets/images/global/right.png";
import Button from "../../../components/Button";
import filter from "../../../assets/images/global/filter.png";
import { useStateValue } from "../../../states/StateProvider";

const HeroSection = (props) => {
  const [{ filterValues, filterOpen }, dispatch] = useStateValue();
  const [index, setIndex] = useState(0);
  const sliders = props.sliders;

  useEffect(() => {
    const lastIndex = sliders.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sliders]);

  const handleFilterbtn = () => {
    dispatch({ type: "setFilterOpen", item: true });
  };

  return (
    <section
      style={{ zIndex: "10" }}
      className={`relative  w-[100vw] h-[90vh] md: lg:h-screen overflow-hidden flex`}>
      {sliders.map((slider, idx) => {
        let position = "nextSlide";
        if (idx === index) {
          position = "activeSlide";
        }
        if (idx === index - 1 || (index === 0 && idx === sliders.length - 1)) {
          position = "lastSlide";
        }
        return (
          <article
            key={idx}
            className={`${position}  opacity-0 absolute top-0 left-0  article transition-all duration-500 h-full w-full bg-cover bg-no-repeat flex justify-center items-center flex-shrink-0`}
            style={{
              backgroundImage: `url(${slider.image})`,
              backgroundSize: "cover",
            }}>
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
            <div
              className="w-[605px] flex flex-col justify-center items-center text-center px-5 md:px-0"
              style={{ zIndex: 1 }}>
              <h2 className="font-fuemen text-[#f1bf3f] text-[24px] lg:text-[38px]">
                {slider.description1}
              </h2>
              <h1 className="font-expleteusSans text-[28px] lg:text-[44px] font-bold text-white text-center">
                {slider.description2}
              </h1>
              <p className="text-white font-saira text-[14px]">
                Secure Your Property Investment Without Paying any Commission or
                Fees
              </p>
              <div className="w-full md:hidden mt-10">
                <button
                  onClick={handleFilterbtn}
                  className="border rounded-md px-6 py-2 font-semibold text-[12px] flex m-auto bg-gradient-to-r from-[#A7893A] via-[#BFA04B] to-[#A7893A]">
                  <img src={filter} alt="filter logo" />
                  <span className="ml-2">Filter</span>
                </button>
              </div>
              <div
                className="inner-shadow"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "5px", // Adjust this to control the size of the shadow
                  background:
                    "linear-gradient(to top, rgba(0, 15, 29, 0.9), rgba(0, 15, 29, 0))",
                }}
              />
              <div
                className="inner-shadow"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "15px", // Adjust this to control the size of the shadow
                  background:
                    "linear-gradient(to top, rgba(0, 15, 29, 0.9), rgba(0, 15, 29, 0))",
                }}
              />
              <div
                className="inner-shadow"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "30px", // Adjust this to control the size of the shadow
                  background:
                    "linear-gradient(to top, rgba(0, 15, 29, 0.9), rgba(0, 15, 29, 0))",
                }}
              />
              <div
                className="inner-shadow"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "50px", // Adjust this to control the size of the shadow
                  background:
                    "linear-gradient(to top, rgba(0, 15, 29, 0.9), rgba(0, 15, 29, 0))",
                }}
              />
              <div
                className="inner-shadow"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "70px", // Adjust this to control the size of the shadow
                  background:
                    "linear-gradient(to top, rgba(0, 15, 29, 0.9), rgba(0, 15, 29, 0))",
                }}
              />
            </div>
          </article>
        );
      })}
      <div
        className="hidden md:flex group absolute border hover:border-[#F1BF3F] cursor-pointer right-16 top-[45%] w-[38px] h-[38px] bg-[#0E0E1A] opacity-50 rotate-45  justify-center items-center transition-all duration-500"
        onClick={() => setIndex(index + 1)}>
        <div className="-rotate-45">
          <img
            src={rightArrow}
            alt=""
            className="group-hover:ml-3 group-hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
