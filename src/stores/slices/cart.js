import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null
  },
  reducers: {
    setCartData: function (state, action) {
      //action: cart data
      state.data = action.payload;
    }
  },
});

export const cartActions = {
  ...cartSlice.actions,
};
export const cartReducer = cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import api from "@api";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     data: null
//   },
//   reducers: {
   
//   },
// });

// export const cartActions = {
//   ...cartSlice.actions,
// };
// export const cartReducer = cartSlice.reducer;
