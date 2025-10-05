import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ContactsState } from "@types";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";

const initialState: ContactsState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: ContactsState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: ContactsState,
  action: PayloadAction<unknown, string>
) => {
  state.isLoading = false;

  if (typeof action.payload === "string") {
    state.error = action.payload;
  } else if (action.payload instanceof Error) {
    state.error = action.payload.message;
  } else {
    state.error = "Something went wrong";
  }
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      // Add Contact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      // Delete Contact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, handleRejected)

      // Edit Contact
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
