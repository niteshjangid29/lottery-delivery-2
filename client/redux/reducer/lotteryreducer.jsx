import * as lotteryaction from "../action/lotteryactions";
const initialState = {
  alllotteries: [],
  searchLotteries: [],
};

const lotteriesreducer = (state = initialState, action) => {
  switch (action.type) {
    case lotteryaction.SET_ALL_LOTTERIES:
      return {
        ...state,
        alllotteries: action.alllotteries,
      };
    // case lotteryaction.SET_BOOK_TAGS:
    //   return {
    //     ...state,
    //     alltags: action.alltags,
    //   };
    case lotteryaction.SET_SEARCH_LOTTERIES:
      return {
        ...state,
        searchLotteries: action.searchLotteries,
      };
    // case lotteryaction.SET_FILTERED_BOOKS:
    //   return {
    //     ...state,
    //     filteredbooks: action.filteredbooks,
    //   };
    default:
      return state;
  }
};

export default lotteriesreducer;
