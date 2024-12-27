// Define the structure of a LotteryTicket
export const SET_ALL_LOTTERIES = "SET_ALL_LOTTERIES";
export const SET_SEARCH_LOTTERIES = "SET_SEARCH_LOTTERIES";

export type LotteryTicket = {
  id: number;
  name: string;
  type:string;
  drawDate: string;
  prize: string;
  winningAmount: string;
  alltickets: Array<{ count: number; ticket: string[] | string }>;
  soldTickets: Array<{ count: number; ticket: string[] | string }>;
  availableTickets: Array<{ count: number; ticket: string[] | string}>;
};

// Define the structure of the action payload
export type SetAllLotteriesAction = {
  type: "SET_ALL_LOTTERIES";
  alllotteries: LotteryTicket[]; // Array of LotteryTicket objects
};
export type SearchLotteriesAction = {
  type: "SET_SEARCH_LOTTERIES";
  searchBooks: LotteryTicket[];
};

export const setSearchLotteries = (searchLotteries:LotteryTicket[]) => {
  console.log("Search Lotteries", searchLotteries);
  return { type: SET_SEARCH_LOTTERIES, searchLotteries };
};
export const setalllotteries = (alllotteries: LotteryTicket[]): SetAllLotteriesAction => {
  console.log("All Lotteries", alllotteries);
  return {
    type: "SET_ALL_LOTTERIES",
    alllotteries:{...alllotteries},
  };
};
