import { useEffect } from "react";
import Contact from "@components/Contact";
import type { RootState } from "@types";
import css from "./style.module.css";
import { fetchContacts } from "@/redux/operations";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import Loader from "@components/Loader";
import Error from "@components/Error";

export default function ContactList() {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state: RootState) => state.contacts.items);
  const isLoading = useAppSelector(
    (state: RootState) => state.contacts.isLoading
  );
  const error = useAppSelector((state: RootState) => state.contacts.error);
  const filter = useAppSelector((state: RootState) => state.filters.name);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (error) {
    return (
      <div className={css.errorState}>
        <Error error={error} />
        <button
          className={css.retryButton}
          onClick={() => dispatch(fetchContacts())}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (contacts.length === 0) {
    return (
      <div className={css.emptyState}>
        <div className={css.emptyIcon}>📱</div>
        <h3 className={css.emptyTitle}>No contacts yet</h3>
        <p className={css.emptyText}>Add your first contact to get started</p>
      </div>
    );
  }

  if (filteredContacts.length === 0 && filter) {
    return (
      <div className={css.emptyState}>
        <div className={css.emptyIcon}>🔍</div>
        <h3 className={css.emptyTitle}>No contacts found</h3>
        <p className={css.emptyText}>No results for "{filter}"</p>
      </div>
    );
  }

  return (
    <div className={css.contactList}>
      <div className={css.listHeader}>
        <span className={css.contactCount}>
          {filteredContacts.length} contact
          {filteredContacts.length !== 1 ? "s" : ""}
          {filter && ` found`}
        </span>
      </div>
      <div className={css.list}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
