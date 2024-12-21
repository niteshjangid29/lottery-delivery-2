interface Ticket {
    ticket: string;
    count: number;
  }
  
  interface Lottery {
    id: number; 
    lotteryName: string;
    drawDate: string; 
    price: number;
    tickets: Ticket[];
  }
  
  interface User {
    id: number; 
    name: string;
    mobileno: string;
    address: string;  
    cart: Lottery[];
    pastTickets: Lottery[];
  }
  
  const dummyUserData: User = {
    id: 1,  // User ID
    name: "John Doe",
    mobileno: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra, 400001", // Single-line address
    cart: [
      {
        id: 1,  // Lottery ID
        lotteryName: "Mega Millions",
        drawDate: "2024-12-25T00:00:00Z",
        price: 500,
        tickets: [
          { ticket: "A1234", count: 2 },
          { ticket: "B5678", count: 1 },
        ],
      },
      {
        id: 2,  // Lottery ID
        lotteryName: "Lucky 7",
        drawDate: "2024-12-26T00:00:00Z",
        price: 300,
        tickets: [
          { ticket: "C91011", count: 3 },
          { ticket: "D121314", count: 1 },
        ],
      },
    ],
    pastTickets: [
      {
        id: 3,  // Lottery ID
        lotteryName: "Super Lotto",
        drawDate: "2024-11-30T00:00:00Z",
        price: 200,
        tickets: [
          { ticket: "E151617", count: 1 },
          { ticket: "F181920", count: 2 },
        ],
      },
      {
        id: 4,  // Lottery ID
        lotteryName: "Lucky 8",
        drawDate: "2024-10-15T00:00:00Z",
        price: 150,
        tickets: [
          { ticket: "G212223", count: 4 },
          { ticket: "H242526", count: 2 },
        ],
      },
    ],
  };
  
  export default dummyUserData;
  