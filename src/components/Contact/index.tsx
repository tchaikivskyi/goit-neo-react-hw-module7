import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { deleteContact } from "@store/operations";
import type { Contact as ContactType } from "@types";
import Modal from "@components/Modal";
import ContactForm from "@components/ContactForm";
import css from "./style.module.css";

interface ContactProps {
  contact: ContactType;
}

export default function Contact({ contact }: ContactProps) {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      dispatch(deleteContact(contact.id));
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className={css.contact}>
        <div className={css.avatar}>{contact.name.charAt(0).toUpperCase()}</div>
        <div className={css.contactInfo}>
          <span className={css.contactName}>{contact.name}</span>
          <span className={css.contactNumber}>{contact.number}</span>
        </div>
        <div className={css.actions}>
          <button
            type="button"
            onClick={handleEdit}
            className={css.editButton}
            aria-label={`Edit ${contact.name}`}
            title="Edit contact"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={css.deleteButton}
            aria-label={`Delete ${contact.name}`}
            title="Delete contact"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ContactForm
          contact={contact}
          onSuccess={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
}
