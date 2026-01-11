import { useEffect } from "react";
import Contact from "@components/Contact";
import css from "./style.module.css";
import { fetchContacts } from "@/redux/operations";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@components/Loader";
import Error from "@components/Error";

export default function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.items);
  const isLoading = useSelector(
    (state) => state.contacts.isLoading
  );
  const error = useSelector((state) => state.contacts.error);
  const filter = useSelector((state) => state.filters.name);

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
