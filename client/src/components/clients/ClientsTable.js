import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import axios from "axios";
import EditClientModal from '../../components/EditClientModal';

const csrfToken = document.cookie.match(/XSRF-TOKEN=(\w+)/);

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
  headers: {
    common: {
      "X-CSRF-TOKEN": csrfToken,
      "X-Requested-With": "XMLHttpRequest",
    },
  }
});

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateModal, setShowCreateEditModal] = useState(false);  
  
  useEffect(() => {
    const fetchClients = async () => {
      const response = await instance.get('/clients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleSort = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    const sortedClients = [...clients].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return order === 'asc' ? -1 : 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setClients(sortedClients);
  };

  const handleDelete = async (id) => {
    if (!id) {
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro que quieres eliminar este cliente?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await instance.delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(response.data.message); // si necesitas hacer algo con la respuesta
      setClients(clients.filter(client => client.id !== id)); // eliminar el cliente de la lista actual
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    setShowEditModal(true);
    setSelectedClient(id);
    
  };
  
  const handleCancel = () => {
    // Limpiar el cliente seleccionado
    setSelectedClient(null);
    setShowEditModal(false);
  };
  const handleCreateClient = () => {
    setShowCreateEditModal(true);
    showEditModal(true);
  }
  return (
    <div className='wrapper__table'>
      <table className='wrapper__table__table'>
        <thead>
          <tr>
            <th className='hidden'>ID</th>
            <th><p className='hidden'>Photo</p></th>
            <th className='wrapper__table__order_column' onClick={handleSort}><i className='wrapper__table__order_column__i'></i><span>Name</span></th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enroll Number</th>
            <th>Date of payment</th>
            <th><p className='hidden'>Acciones</p></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <ClientRow
              key={client.id}
              client={client}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              /*setSelectedClient={setSelectedClient}
              setShowEditModal={setShowEditModal}*/
            />
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditClientModal
          isOpen={setShowEditModal}
          onClose={() => setShowEditModal(false)}
          client={clients.find((client) => client.id === selectedClient)}
        />
      )}
      
      
    </div>
  );
};

export default ClientsTable;
