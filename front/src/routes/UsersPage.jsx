import React, { useEffect, useState } from 'react';
import { getClients, addClient } from '../apiService';
import Modal from '../components/ModalTour';
import './styles/TourPage.css';

const UsersPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    getClients()
      .then(response => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch(error => console.error('Ошибка при получении списка клиентов:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredClients(clients.filter(client => client.name.toLowerCase().startsWith(query.toLowerCase())));
  };

  const handleAddClient = () => {
    addClient(newClient)
      .then(response => {
        setClients([...clients, response.data]);
        setFilteredClients([...clients, response.data]);
        setIsModalOpen(false);
        setNewClient({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error('Ошибка при добавлении клиента:', error));
  };

  return (
    <div className="tourspage">
      <h1>Список клиентов</h1>
      <input
        type="text"
        placeholder="Поиск по имени клиента"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => setIsModalOpen(true)}>Добавить клиента</button>
      <ul>
        {filteredClients.map(client => (
          <li key={client.id}>
            <h2>{client.name}</h2>
            <p>{client.email}</p>
            <p>{client.phone}</p>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Добавить нового клиента</h2>
          <input
            type="text"
            placeholder="Имя"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          />
          <input
            type="mail"
            placeholder="Почта"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Телефон"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          />
          <button onClick={handleAddClient}>Добавить</button>
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
