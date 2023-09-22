import React, { useEffect, useState } from "react";
import FilterSearch from "../../components/FilterSearch";
import Skeleton from "../../components/Skeleton/Skeleton";
import ListItem from "../ListView/partials/ListItem";
import GridItem from "./partials/GridItem";

import downArrow from "../../assets/images/property details page/Group 360(2).png";
import DownArrow from "../../components/DownArrow";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStateValue } from "../../states/StateProvider";

const GridView = (props) => {
  const [filterData, setFilterData] = useState([]);
  const [dataLimit, setDataLimit] = useState(null);
  const [showArrow, setShowArrow] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const [{ filterValues }] = useStateValue();
  const dataLength = 6;

  const fetchMore = () => {
    let pageNumber = 2;
    return function () {
      const params = {
        page: pageNumber,
        size: dataLength,
        developerId: filterValues.developers,
        developmentTypeId: filterValues.developmentTypes,
        propertyAreaId: filterValues.propertyAreas,
        completion: filterValues.completions,
        propertyTypeId: filterValues.propertyTypes,
      };

      axios
        .get(`http://52.77.121.171:3008/api/v1/en/properties`, {
          params,
        })
        .then((response) => {
          setFilterData(filterData.concat(response.data.data.properties.data));
          console.log(`Console: page number${pageNumber}`);
        })
        .catch((error) => {
          console.error(error);
        });
      pageNumber += 1;
    };
  };

  const fetchMoreData = fetchMore();

  useEffect(() => {
    const params = {
      page: 1,
      size: dataLength,
      developerId: filterValues.developers,
      developmentTypeId: filterValues.developmentTypes,
      propertyAreaId: filterValues.propertyAreas,
      completion: filterValues.completions,
      propertyTypeId: filterValues.propertyTypes,
    };
    axios
      .get(`http://52.77.121.171:3008/api/v1/en/properties`, {
        params,
      })
      .then((response) => {
        setFilterData(response.data.data.properties.data);
        setDataLimit(response.data.data.properties.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filterValues]);

  useEffect(() => {
    if (dataLimit == filterData.length) {
      setShowArrow(false);
    }
  }, [filterData]);

  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchMoreData}
        hasMore={hasMore}>
        <div className="mb-20">
          <div className="w-full overflow-scroll scrollbar-hide grid grid-cols-1 md:grid-cols-3 my-3 md:my-10 md:px-1">
            {filterData.map((property, idx) => (
              <GridItem
                id={idx + 1}
                key={property.propertyName}
                coverImage={property.images.filter((image) => {
                  if (image.type === "cover") {
                    return image.path;
                  }
                })}
                propertyName={property.propertyName}
                areaName={property.propertyArea.areaName}
                developerName={property.developerType.name}
                propertyType={property.propertyType.name}
                unitSize={property.unitType.size}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
      {showArrow && (
        <button className="m-auto pt-5" onClick={props.handleShowAll}>
          <DownArrow />
        </button>
      )}
    </>
  );
};

export default GridView;
