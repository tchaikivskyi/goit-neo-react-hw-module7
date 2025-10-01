import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact } from "@store/contactsSlice";
import type { RootState } from "@store/store";
import type { Contact } from "@types";
import css from "./style.module.css";

interface ContactFormProps {
  contact?: Contact;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ContactForm({
  contact,
  onSuccess,
  onCancel,
}: ContactFormProps) {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.items);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const isEditing = Boolean(contact);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const existingContact = contacts.find(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== contact?.id
    );

    if (existingContact) {
      setError(`${name} is already in contacts!`);
      return;
    }

    if (isEditing && contact) {
      const updatedContact: Contact = {
        ...contact,
        name: name.trim(),
        number: number.trim(),
      };
      dispatch(editContact(updatedContact));
    } else {
      const newContact: Contact = {
        id: crypto.randomUUID(),
        name: name.trim(),
        number: number.trim(),
      };
      dispatch(addContact(newContact));
    }

    if (!isEditing) {
      setName("");
      setNumber("");
    }
    setError("");
    onSuccess?.();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>
        {isEditing ? "Edit Contact" : "Add New Contact"}
      </h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.field}>
          <label htmlFor="name" className={css.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={css.input}
            placeholder="Enter full name"
          />
        </div>

        <div className={css.field}>
          <label htmlFor="number" className={css.label}>
            Phone Number
          </label>
          <input
            type="tel"
            name="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={css.input}
            placeholder="Enter phone number"
          />
        </div>

        {error && <div className={css.error}>{error}</div>}

        <div className={css.buttons}>
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          )}
          <button type="submit" className={css.submitButton}>
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
