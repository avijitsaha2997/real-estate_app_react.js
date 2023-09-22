import React, { useEffect, useState } from "react";
import downArrow from "../../../assets/images/global/downArrow.png";
import IconSearch from "../../../assets/images/global/filterHome.png";
import BtnFilter from "../../../components/BtnFilter";
import BtnSearch from "../../../components/BtnSearch";
import { useStateValue } from "../../../states/StateProvider";
import { Link } from "react-router-dom";
import BtnSearch2 from "../../../components/BtnSearch2";

const Filter = ({ filterLists }) => {
  const [animate, setAnimate] = useState(false);
  const [{ filterValues, filterOpen }] = useStateValue();
  const [isMobileView, setIsMobileView] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAnimate((prevAnimate) => !prevAnimate);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div style={{ marginRight: "90%" }}>
      <div
        className={`${
          filterOpen
            ? "absolute w-[90%] top-[380px] bg-[#000F1D] z-20"
            : "lg:absolute lg:left-[12.5%] xl:left-1/4 w-screen lg:w-[75vw] xl:w-[50vw] bg-[#000F1D] lg:top-[92.5vh]   z-20"
        }`}
        style={{
          borderRadius: "10px",
          marginTop: isMobileView ? "-90px" : "",

          borderLeft: isMobileView
            ? ""
            : animate
            ? "5px solid #F1BE3F"
            : "5px solid #000F1D",
          borderRight: isMobileView
            ? ""
            : animate
            ? "5px solid #F1BE3F"
            : "5px solid #000F1D",
          transition: "3s",
          boxShadow: "0px 0px 15px 2px rgba(255, 255, 255, 0.3)",
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] px-8 md:pl-12  py-4">
          <BtnFilter
            btnText={"Damac Hills"}
            btnImage={downArrow}
            cat={"propertyAreas"}
            content={filterLists?.propertyAreas}
            selectedValue={filterValues?.propertyAreas}
          />
          <BtnFilter
            cat={"developers"}
            btnText={"All Dubai Developer"}
            btnImage={downArrow}
            content={filterLists?.developers}
            selectedValue={filterValues?.developers}
          />

          <BtnFilter
            cat={"propertyTypes"}
            btnText={"All Property Type"}
            btnImage={downArrow}
            content={filterLists.propertyTypes}
            selectedValue={filterValues.propertyTypes}
          />
          <BtnFilter
            cat={"completions"}
            btnText={"All Completions"}
            btnImage={downArrow}
            content={filterLists.completions}
            selectedValue={filterValues.completions}
          />
          <BtnFilter
            cat={"developmentTypes"}
            btnText={"All Development Type"}
            btnImage={downArrow}
            content={filterLists.developmentTypes}
            selectedValue={filterValues.developmentTypes}
          />
          <Link to="/view-property">
            <BtnSearch2 btnText="SEARCH" btnImage={IconSearch} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Filter;
