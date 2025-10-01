import { useSelector } from "react-redux";
import Contact from "@components/Contact";
import type { RootState } from "@types";
import css from "./style.module.css";

export default function ContactList() {
  const contacts = useSelector((state: RootState) => state.contacts.items);
  const filter = useSelector((state: RootState) => state.filters.name);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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
