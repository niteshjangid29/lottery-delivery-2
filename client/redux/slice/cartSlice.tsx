import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  ticket: string;
  count: number;
}

interface CartItem {
  id: string;
  lotteryName: string;
  drawDate: string;
  price: number;
  tickets: Ticket[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeTicket: (
      state,
      action: PayloadAction<{ lotteryId: number; ticketId: number }>
    ) => {
      const { lotteryId, ticketId } = action.payload;
      const lottery = state.items.find((item,id) => id === lotteryId);

      if (lottery) {
        lottery.tickets.splice(ticketId, 1);
        if (lottery.tickets.length === 0) {
          state.items = state.items.filter((item,id) => id !== lotteryId);
        }
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action.payload);
      state.items.push(action.payload);
    },
    updateCart: (
      state,
      action: PayloadAction<{ lotteryId: string; updatedTickets: Ticket[] }>
    ) => {
      const { lotteryId, updatedTickets } = action.payload;
      const lottery = state.items.find((item) => item.id === lotteryId);

      if (lottery) {
        lottery.tickets = updatedTickets;
      }
    },
  },
});

export const { addToCart, removeTicket, updateCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
