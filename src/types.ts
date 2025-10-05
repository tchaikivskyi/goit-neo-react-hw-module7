export interface Contact {
  id: string;
  name: string;
  number: string;
}

export interface ContactsState {
  items: Contact[];
  isLoading: boolean;
  error: string | null;
}

export interface FiltersState {
  name: string;
}

export interface RootState {
  contacts: ContactsState;
  filters: FiltersState;
}
