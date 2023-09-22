import React, { useEffect, useState } from "react";
import ListItem from "./partials/ListItem";
import downArrow from "../../assets/images/property details page/Group 360(2).png";
import DownArrow from "../../components/DownArrow";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import { useStateValue } from "../../states/StateProvider";

const ListView = (props) => {
  const [filterData, setFilterData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataLimit, setDataLimit] = useState(null);
  const [showArrow, setShowArrow] = useState(true);

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
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/en/properties`, {
          params,
        })
        .then((response) => {
          setFilterData(filterData.concat(response.data.data.properties.data));
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
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/en/properties`, {
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
        <div className=" mb-20">
          <div className="w-full flex flex-wrap my-3 md:my-10 px-1">
            {filterData?.map((property, idx) => (
              <ListItem
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
                description={property.amenities.description}
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

export default ListView;
