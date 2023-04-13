import React from 'react';
import moment from 'moment';
const ClientRow = ({ client, handleDelete, handleEdit}) => { 
  return (
    <tr>
      <td className='hidden'>{client.id}</td>
      <td><img className='wrapper__table__img' src={client.photo ? client.photo : process.env.PUBLIC_URL + '/img/pexels-photo-2379004 1.png'} alt='Client' /></td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{client.enroll_number}</td>
      <td>{moment(client.date_of_payment).format('DD-MMM, YYYY')}</td>
      <td>
        <button onClick={() => handleEdit(client.id)}>
          <i className='wrapper__table__icon__edit'></i>
        </button>
        <button onClick={() => handleDelete(client.id)}>
          <i className='wrapper__table__icon__trash'></i> 
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
