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
  
  // export const lotteryTickets: LotteryTicket[] = [
  //   {
  //     id: 1,  
  //     name: "Mega Jackpot",
  //     drawDate: "Dec 31, 2024",
  //     prize: "100",
  //     winningAmount: "₹100,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 2,  // Assigning a number id
  //     name: "Grand Prize",
  //     drawDate: "Jan 15, 2025",
  //     prize: "50",
  //     winningAmount: "₹50,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 3,  // Assigning a number id
  //     name: "Super Lotto",
  //     drawDate: "Feb 1, 2025",
  //     prize: "100",
  //     winningAmount: "₹200,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 4,  // Assigning a number id
  //     name: "Lucky Winner",
  //     drawDate: "Mar 10, 2025",
  //     prize: "30",
  //     winningAmount: "₹300,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 5,  // Assigning a number id
  //     name: "Dream Prize",
  //     drawDate: "Apr 20, 2025",
  //     prize: "75",
  //     winningAmount: "₹75,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 6,  // Assigning a number id
  //     name: "Golden Ticket",
  //     drawDate: "May 5, 2025",
  //     prize: "100",
  //     winningAmount: "₹150,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 7,  // Assigning a number id
  //     name: "Big Win",
  //     drawDate: "Jun 25, 2025",
  //     prize: "100",
  //     winningAmount: "₹120,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 8,  // Assigning a number id
  //     name: "Instant Cash",
  //     drawDate: "Jul 18, 2025",
  //     prize: "90",
  //     winningAmount: "₹90,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 9,  // Assigning a number id
  //     name: "Cash Bonanza",
  //     drawDate: "Aug 12, 2025",
  //     prize: "150",
  //     winningAmount: "₹500,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  //   {
  //     id: 10,  // Assigning a number id
  //     name: "Dream Big",
  //     drawDate: "Sep 10, 2025",
  //     prize: "120",
  //     winningAmount: "₹100,000",
  //     alltickets: [
  //       { count: 1, ticket: ["001", "002", "003", "004", "005", "006"] },
  //       { count: 5, ticket: ["001-005", "006-010", "011-015"] },
  //       { count: 10, ticket: ["001-010", "011-020", "021-030"] },
  //       { count: 20, ticket: ["001-020", "021-040", "041-060"] },
  //     ],
  //     soldTickets: [
  //       { count: 1, ticket: ["001", "002"] },
  //       { count: 5, ticket: ["001-005"] },
  //     ],
  //     availableTickets: [
  //       { count: 10, ticket: ["006-010", "011-015"] },
  //       { count: 20, ticket: ["021-030", "041-060"] },
  //     ],
  //   },
  // ];
  