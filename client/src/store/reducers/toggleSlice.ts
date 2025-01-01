import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveToggle } from "@src/types/main";
import { ToggleState } from "@src/types/storeTypes";

const initialState: ToggleState = {
  activeToggle: null,
  isReg: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<ActiveToggle>) {
      const toggleType = action.payload;

      if (state.activeToggle === toggleType) {
        state.activeToggle = null;
      } else {
        state.activeToggle = toggleType;
      }
    },
    toggleFalse(state) {
      state.activeToggle = null;
    },
    toggleReg(state, action: PayloadAction<boolean>) {
      state.isReg = action.payload;
    },
  },
});

export const { toggle, toggleFalse, toggleReg } = toggleSlice.actions;

export default toggleSlice.reducer;
