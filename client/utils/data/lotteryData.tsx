export type Lottery = {
  _id: string ;  
  name: string;
  drawDate: string;
  prize: string;
  winningAmount: string;
  alltickets: Array<{ count: number; ticket: string[] }>;
  soldTickets: Array<{ count: number; ticket: string[]  }>;
  availableTickets: Array<{ count: number; ticket: string[]  }>;
};

export type LotteryState = {
  alllotteries: Record<string, Lottery>;
};
  