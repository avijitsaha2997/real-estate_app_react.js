import React, { useEffect } from "react";
import Button from "../../../components/Button";
import SkeletonSingleProperty from "../../../components/Skeleton/SkeletonSingleProperty";
import iconBuilding from "../../../assets/images/property details page/icon-building.png";
import iconLocationBlack from "../../../assets/images/property details page/icon-locate.png";
import iconDownload from "../../../assets/images/global/icon-download-outline.svg";
import iconLocation from "../../../assets/images/property details page/18-location-pin-outline.gif";
import iconFilm from "../../../assets/images/global/icon-film-outline.svg";
import RegisterForm from "./RegisterForm";
import ButtonOutline from "../../../components/ButtonOutline";
import { useState } from "react";
import BtnOutline from "../../../components/BtnOutline";

const SinglePropertyDescription = (props) => {
  const [btnHoverEffect, setBtnHoverEffect] = useState(false);

  const propertyDetails = props.property;

  const propertyDescription =
    propertyDetails.propertyDescription.split("\r\n\r\n");

  return (
    <section className="ml-3 mr-3">
      <SkeletonSingleProperty className="relative flex-col md:flex-row h-auto z-0 ">
        <div className="xl:basis-[75%] xl:pr-8 text-justify lg:text-left">
          <h1 className="font-robotoCondensed font-medium text-white text-[30px] ml-2">
            {propertyDetails.propertyName}
          </h1>
          <div className="flex items-center ml-2">
            <p className="font-montserrat text-white text-[12px] leading-4 flex items-center my-2 mr-4">
              <img src={iconLocationBlack} alt="Location" className="mr-1" />
              {propertyDetails.developerType.name}
            </p>
            <p className="font-montserrat text-white text-[12px] leading-4 flex items-center my-2 mr-4">
              <img src={iconBuilding} alt="building" className="mr-1" />
              {propertyDetails.propertyArea.areaName}
            </p>
          </div>
          {propertyDescription.map((paragraph, index) => (
            <p
              className="font-montserrat text-white leading-7 py-2 text-[15px]"
              key={`paragraph-${index}`}
              style={{
                textAlign: "left",
                fontWeight: "200",
                fontSize: "14px",
                marginLeft: "10px",
              }}>
              {paragraph}
            </p>
          ))}

          <div className="relative -bottom-[18%] py-8 px-10 md:px-0">
            <div className="md:flex justify-evenly">
              <div className="xl:pr-4 pt-3 ">
                <Button
                  btnText="Download Brochure"
                  btnImage={iconDownload}
                  btnClass={btnHoverEffect ? "?bg-none" : ""}
                />
              </div>
              <div className=" xl:pl-4 pt-3 ">
                <BtnOutline
                  btnText="location"
                  btnImage={iconLocation}
                  onMouseEnterEvent={setBtnHoverEffect}
                />
              </div>
            </div>
            <div className="md:flex justify-evenly">
              <div className="xl:pl-16 pt-5">
                <BtnOutline
                  onMouseEnterEvent={setBtnHoverEffect}
                  btnText="Download Floor Plan"
                  btnImage={iconDownload}
                />
              </div>
              <div className="xl:pr-16 pt-5">
                <BtnOutline
                  btnText="view gallery"
                  btnImage={iconFilm}
                  onMouseEnterEvent={setBtnHoverEffect}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="xl:basis-[24.7%] z-10 mt-10 md:mt-0 px-3 md:px-0 md:mr-3">
          <RegisterForm propertyName={propertyDetails.propertyName} />
        </div>
      </SkeletonSingleProperty>
    </section>
  );
};

export default SinglePropertyDescription;
