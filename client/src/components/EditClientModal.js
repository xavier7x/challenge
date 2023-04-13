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

const EditClientModal = ({ isOpen, onClose, client }) => {
  console.log(client);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [enroll_number, setEnrollNumber] = useState(client.enroll_number);
  const [date_of_payment, setDateOfPayment] = useState(client.date_of_payment);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await instance.patch(
        `/clients/${client.id}`,
        {
          name,
          email,
          phone,
          enroll_number,
          date_of_payment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data); // si necesitas hacer algo con la respuesta

      onClose();
      alert('Client updated successfully!');
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
      <h2 className="modal__h2">Edit Client</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="enrollNumber">Enroll Number:</label>
          <input
            type="text"
            id="enrollNumber"
            value={enroll_number}
            onChange={(event) => setEnrollNumber(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOfPayment">Date of payment:</label>
          <input
            type="date"
            id="dateOfPayment"
            value={date_of_payment}
            onChange={(event) => setDateOfPayment(event.target.value)}
          />
        </div>
        {isLoading ? (
          <button className="modal__button" disabled>
            Loading...
          </button>
        ) : (
          <button className="modal__button" type="submit">
            Save changes
          </button>
        )}
      </form>
    </Modal>
  );
};

EditClientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    enroll_number: PropTypes.string.isRequired,
    date_of_payment: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditClientModal;
