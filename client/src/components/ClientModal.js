import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import "../styles/Modal.scss";
import { FaTimes } from "react-icons/fa";

const csrfToken = document.cookie.match(/XSRF-TOKEN=(\w+)/);
console.log(csrfToken);

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    common: {
      "X-CSRF-TOKEN": csrfToken,
      "X-Requested-With": "XMLHttpRequest",
    },
  },
});

const ClientModal = ({ isOpen, onClose, client, isUpdate }) => {
  const [name, setName] = useState(isUpdate ? client.name : ""); 
  const [email, setEmail] = useState(isUpdate ? client.email : "");
  const [phone, setPhone] = useState(isUpdate ? client.phone : ""); 
  const [enroll_number, setEnrollNumber] = useState(
    isUpdate ? client.enroll_number : ""
  );
  const [date_of_payment, setDateOfPayment] = useState( 
    isUpdate ? client.date_of_payment : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        enroll_number,
        date_of_payment,
      };
      const response = isUpdate
        ? await instance.patch(`/clients/${client.id}`, payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        : await instance.post("/clients", payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

      console.log(response.data); // si necesitas hacer algo con la respuesta

      onClose();
      alert(
        isUpdate
          ? "Client updated successfully!"
          : "Client created successfully!"
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} shouldCloseOnOverlayClick={true}>
      <div className="modal__close" onClick={onClose}>
        <FaTimes />
      </div>
      <h2 className="modal__h2">
        {isUpdate ? "Edit Client" : "Create Client"}
      </h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="enrollNumber">Enroll Number:</label>
          <input
            type="text"
            id="enrollNumber"
            value={enroll_number}
            onChange={(event) => setEnrollNumber(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfPayment">Date of Payment:</label>
          <input
            type="date"
            id="dateOfPayment"
            value={date_of_payment}
            onChange={(event) => setDateOfPayment(event.target.value)}
            required
          />
        </div>
        <button className="modal__submit" type="submit" disabled={isLoading}>
          {isLoading
            ? "Loading..."
            : isUpdate
            ? "Update Client"
            : "Create Client"}
        </button>
      </form>
    </Modal>
  );
};

ClientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    enroll_number: PropTypes.string,
    date_of_payment: PropTypes.string,
    id: PropTypes.number,
  }),
  isUpdate: PropTypes.bool.isRequired,
};

export default ClientModal;
