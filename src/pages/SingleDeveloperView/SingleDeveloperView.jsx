import React, { useEffect, useState } from "react";
import RouteLink from "../../components/RouteLink";
import { useLocation, useParams } from "react-router-dom";
import EmmarProperties from "./partials/Properties";
import PropertyList from "./partials/PropertyList";
import TableView from "./partials/TableView";
import { getApiData } from "../../services/apiFunctions";
import { useStateValue } from "../../states/StateProvider";
import { useQuery } from "react-query";
import axios from "axios";
import FilterSelect from "../../components/FilterSelect";
import home from "../../assets/images/global/icon-search.png";
import FilterSearchInput from "../ViewProperty/partials/filterSearch";
import FilterModal from "../ViewProperty/partials/filterModal";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";

const SingleDeveloperView = (props) => {
  const [{ lang }] = useStateValue();
  const [{ propertyToView }] = useStateValue();
  const { developerId } = useParams();
  const [filterList, setFilterList] = useState();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const beds = [1, 2, 3, 4, 5];
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

  // const location = useLocation();

  useEffect(() => {
    axios
      .get("http://52.77.121.171:3008/api/v1/en/data/filter-list")
      .then((response) => {
        setFilterList(response.data.data);
      });
  }, []);

  const getSingleDeveloper = () => {
    return getApiData(lang, `developers/${developerId}`);
  };

  const { isLoading, isError, error, data } = useQuery(
    ["single-developer", lang, developerId],
    getSingleDeveloper
  );

  if (isLoading) {
    return "Loading... Please Wait...";
  }

  if (isError) {
    return error.message;
  }

  const developer = data.data;

  const locationName = [developer.developer.name];
  return (
    <>
      {isMobileView ? (
        <Navbar2 className={`w-full py-5 bg-[#000F1D] z-50 `} type="inline" />
      ) : (
        <Navbar2
          className={`sticky top-0 left-0 w-full py-5 bg-[#000F1D] z-50 `}
          type="inline"
        />
      )}
      <div
        style={{
          marginTop: isMobileView ? "" : "15px",
          marginBottom: isMobileView ? "" : "80px",
        }}>
        <RouteLink locationName={locationName} buttonHide={"true"} />
        <EmmarProperties developerDetails={developer.developer} />
        <div
          className="sticky  bg-gradient-to-r from-[#001120] via-[#00182E] to-[#001120] ml-4 mr-4 md:ml-[130px] md:mr-[130px] md:py-2"
          style={{ "z-index": "20", top: isMobileView ? "-10px" : "88px" }}>
          {props.mobileView ? (
            <div className="py-4">
              <FilterSearchInput setIsFilterModalOpen={setIsFilterModalOpen} />
            </div>
          ) : (
            <div className="w-full md:grid grid-cols-5">
              <div
                className="mt-2 md:mt-0  md:auto relative px-3 md:px-0 md:pl-0 rounded-md bg-white bg-opacity-10  md:mx-1 text-white hover:text-[#FFD15F] "
                style={{ width: "220px" }}>
                <FilterSelect
                  searchBy="Property Areas"
                  selectBy={filterList?.propertyAreas}
                />
              </div>
              <div
                className="mt-2 md:mt-0  md:auto relative px-3 md:px-0 md:pl-0 rounded-md bg-white bg-opacity-10  md:mx-1 text-white hover:text-[#FFD15F] "
                style={{ width: "220px" }}>
                <FilterSelect
                  searchBy="Property Types"
                  selectBy={filterList?.propertyTypes}
                />
              </div>
              <div
                className="mt-2 md:mt-0  md:auto relative px-3 md:px-0 md:pl-0 rounded-md bg-white bg-opacity-10  md:mx-1 text-white hover:text-[#FFD15F] "
                style={{ width: "220px" }}>
                <FilterSelect searchBy="Beds" selectBy={beds} />
              </div>
              <div
                className="mt-2 md:mt-0  md:auto relative px-3 md:px-0 md:pl-0 rounded-md bg-white bg-opacity-10  md:mx-1 text-white hover:text-[#FFD15F] "
                style={{ width: "220px" }}>
                <FilterSelect
                  searchBy="Completions"
                  selectBy={filterList?.completions}
                />
              </div>
              <div
                className="w-full bg-white bg-opacity-10 rounded-md flex items-center custom-shadow mt-3 md:mt-0"
                style={{
                  border: "1px solid #bea04e",
                  // "border-right": "1px solid #FFD15F",
                  // "border-top": "1px solid #FFD15F",
                  // "border-bottom": "1px solid #FFD15F",
                }}>
                <input
                  type="search"
                  name="search developers"
                  id="search-developers"
                  placeholder="SEARCH"
                  className="w-full px-5 py-1 rounded-md font-roboto font-extralight text-[#DBA318] placeholder:text-[#798A9C] placeholder:font-light placeholder:font-roboto placeholder:text-sm bg-transparent focus-visible:outline-0"
                />
                <button className="px-5">
                  <img src={home} alt="search" className="w-7 " />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="">
          <FilterModal
            propertyToView={propertyToView}
            isFilterModalOpen={isFilterModalOpen}
            setIsFilterModalOpen={setIsFilterModalOpen}
          />
        </div>
        <TableView
          mobileView={props.mobileView}
          properties={developer.developerProperty.data}
        />

        <PropertyList propertyList={developer.developerProperty.data} />
      </div>
      <Footer footerBg={"footer_background"} />
    </>
  );
};

export default SingleDeveloperView;
