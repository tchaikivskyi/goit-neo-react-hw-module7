import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Contact } from "@types";

axios.defaults.baseURL = `https://${
  import.meta.env.VITE_MOCK_API_KEY
}.mockapi.io/api/v1`;

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Contact[]>("/contacts");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData: Omit<Contact, "id">, thunkAPI) => {
    try {
      const response = await axios.post<Contact>("/contacts", contactData);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId: string, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (contact: Contact, thunkAPI) => {
    try {
      const response = await axios.put<Contact>(
        `/contacts/${contact.id}`,
        contact
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);