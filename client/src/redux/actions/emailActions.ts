import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async ({ to, subject, text }: { to: string; subject: string; text: string }, thunkAPI) => {
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ошибка отправки");

      return data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);