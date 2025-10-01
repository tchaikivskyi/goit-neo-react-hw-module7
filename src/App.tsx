import { useState } from "react";
import ContactList from "@components/ContactList";
import SearchBox from "@components/SearchBox";
import Modal from "@components/Modal";
import ContactForm from "@components/ContactForm";
import css from "./App.module.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.app}>
      <div className={css.container}>
        <header className={css.header}>
          <h1>Phonebook</h1>
          <p className={css.subtitle}>Manage your contacts with ease</p>
        </header>

        <div className={css.actions}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={css.addButton}
          >
            <span>+</span>
            Add Contact
          </button>
        </div>

        <SearchBox />
        <ContactList />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ContactForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
