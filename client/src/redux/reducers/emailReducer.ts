import { createSlice } from "@reduxjs/toolkit";
import { sendEmail } from "../actions/emailActions";

interface EmailState {
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: EmailState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetEmailStatus(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload as string;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetEmailStatus } = emailSlice.actions;
export default emailSlice.reducer;