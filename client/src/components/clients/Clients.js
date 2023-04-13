import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ClientsTable from './ClientsTable';
import '../../styles/Clients.scss'
import ClientModal from "../ClientModal";

const Clients = () => {
  const isAuthenticated = useSelector(state => state.auth ? state.auth.isAuthenticated : false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className='wrapper'>
      <div className="wrapper__title"><div><h2 className='wrapper__h2'>Client List</h2></div><div className='wrapper__actions'><button onClick={handleOpenModal} className='wrapper__button'>ADD NEW CLIENT</button></div></div>
      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className='wrapper__separator'></div>
      <ClientsTable />
    </div>
    
  );
};

export default Clients;
