import axios from "axios";
import { store } from "../../redux/store";
import { placeOrder } from "../../redux/slice/historySlice"; // Update the path if needed
import { ToLink } from "../../app/page";

// Ticket interface
interface Ticket {
  ticket: string;
  count: number;
}

// Lottery interface
interface Lottery {
  retailerID: string;
  lotteryName: string;
  drawDate: string;
  type: string; // Add new property for order type if needed
  price: number;
  tickets: Ticket[];
}

// API Order interface (from the API response)
interface Order {
  orderDate: string;
  totalAmount: number;
  orders: Lottery[];
}

// Redux-compatible Order interface
interface Order {
  orderDate: string;
  totalAmount: number;
  orders: Lottery[];
}

// Function to transform API response into the Redux-compatible format
const mapApiResponseToRedux = (data: Order[]): Order[] => {
  return data.map(order => ({
    orderDate: order.orderDate,
    totalAmount: order.totalAmount,
    orders: order.orders.map(lottery => ({
      lotteryName: lottery.lotteryName,
      retailerID: lottery.retailerID,
      drawDate: lottery.drawDate,
      type: lottery.type,
      price: lottery.price,
      tickets: lottery.tickets.map(ticket => ({
        ticket: ticket.ticket,
        count: ticket.count,
      })),
    })),
  }));
};

export const getAllOrders = async (phone: string, renderID: string): Promise<void> => {
  console.log(`Fetching orders for phone: ${phone} and renderID: ${renderID}`);
  try {
    const response = await axios.get<{ data: Order[] }>(`${ToLink}/userAllOrder`, {
      params: {
        phone: phone,
      },
    });

    console.log(response);

    // Transform the API response
    const transformedOrders = mapApiResponseToRedux(response.data.data);

    // Filter orders based on renderID
    const filteredOrders = transformedOrders.map(order => ({
      ...order,
      orders: order.orders.filter(lottery => lottery.retailerID === renderID),
    })).filter(order => order.orders.length > 0); // Exclude orders without matching lotteries

    // Dispatch each filtered order to the Redux store
    filteredOrders.forEach(order => {
      store.dispatch(placeOrder(order)); // Use the `placeOrder` action from the slice
    });

    console.log("Filtered and updated orders to Redux:", filteredOrders);
  } catch (e) {
    console.error("Error in fetching orders:", e);
  }
};
