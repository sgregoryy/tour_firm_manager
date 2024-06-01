import React, { useEffect, useState } from 'react';
import { getTours, addTour } from '../apiService'; // Предполагается, что в apiService есть функции для получения и добавления туров
import Modal from '../components/ModalTour'; // Ваше модальное окно
import './styles/TourPage.css';

const TourPage = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTour, setNewTour] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    getTours()
      .then(response => {
        setTours(response.data);
        setFilteredTours(response.data);
      })
      .catch(error => console.error('Ошибка при получении списка туров:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredTours(tours.filter(tour => tour.name.toLowerCase().startsWith(query.toLowerCase())));
  };

  const handleAddTour = () => {
    addTour(newTour)
      .then(response => {
        setTours([...tours, response.data]);
        setFilteredTours([...tours, response.data]);
        setIsModalOpen(false);
        setNewTour({ name: '', description: '', price: '' });
      })
      .catch(error => console.error('Ошибка при добавлении тура:', error));
  };

  return (
    <div className="tourspage">
      <h1>Список туров</h1>
      <input
        type="text"
        placeholder="Поиск по названию тура"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => setIsModalOpen(true)}>Добавить тур</button>
      <ul>
        {filteredTours.map(tour => (
          <li key={tour.id}>
            <h2>{tour.name}</h2>
            <p>{tour.description}</p>
            <p>Цена: {tour.price}</p>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Добавить новый тур</h2>
          <input
            type="text"
            placeholder="Название"
            value={newTour.name}
            onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Описание"
            value={newTour.description}
            onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена"
            value={newTour.price}
            onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
          />
          <button onClick={handleAddTour}>Добавить</button>
        </Modal>
      )}
    </div>
  );
};

export default TourPage;
