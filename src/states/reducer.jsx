export const initialState = {
  lang: "en",
  viewType: "grid",
  planList: [],
  showModal: false,
  openMeetLink: null,
  isZoomSelected: false,
  isMeetSelected: true,
  isDropdownMenuOpen: false,
  filterOpen: false,
  filterValues: {
    propertyAreas: null,
    developers: null,
    propertyTypes: null,
    completions: null,
    developmentTypes: null,
    bdes: null,
  },
  filterValuesMob: {
    propertyAreas: null,
    developers: null,
    propertyTypes: null,
    completions: null,
    developmentTypes: null,
    bdes: null,
  },
  filterData: [],
  filterSelectReset: false,
  propertyToView: "all",
  query: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setLang":
      return {
        ...state,
        lang: action.item,
      };
    case "setViewType":
      return {
        ...state,
        viewType: action.item,
      };

    case "setPlanList":
      return {
        ...state,
        planList: planlist.concat(action.item),
      };

    case "setShowModal":
      return {
        ...state,
        showModal: action.item,
      };
    case "selectVideoMeeting":
      return {
        ...state,
        openMeetLink: action.item,
      };
    case "setZoomMeeting":
      return {
        ...state,
        isZoomSelected: action.item,
      };
    case "setGoogleMeet":
      return {
        ...state,
        isMeetSelected: action.item,
      };
    case "setDropdownOpen":
      return {
        ...state,
        isDropdownMenuOpen: action.item,
      };
    case "setPropertyAreas":
      return {
        ...state,
        propertyAreas: action.item,
      };
    case "setDevelopers":
      return {
        ...state,
        developers: action.item,
      };
    case "setPropertyTypes":
      return {
        ...state,
        propertyTypes: action.item,
      };
    case "setCompletions":
      return {
        ...state,
        completions: action.item,
      };
    case "setDevelopmentTypes":
      return {
        ...state,
        developmentTypes: action.item,
      };
    case "setFilterValues":
      return {
        ...state,
        filterValues: action.item,
      };
    case "setFilterValuesMob":
      return {
        ...state,
        filterValuesMob: action.item,
      };
    case "setFilterData":
      return {
        ...state,
        filterData: action.item,
      };
    case "setPropertyToView":
      return {
        ...state,
        propertyToView: action.item,
      };
    case "setQuery":
      return {
        ...state,
        query: action.item,
      };

    case "setFilterOpen":
      return {
        ...state,
        filterOpen: action.item,
      };
    case "setFilterSelectReset":
      return {
        ...state,
        filterSelectReset: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
