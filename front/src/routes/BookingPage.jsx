import React, { useEffect, useState } from 'react';
import { getBookings, addBooking, getClients, getTours } from '../apiService'; // Предполагается, что в apiService есть функции для получения клиентов, туров и бронирований
import Modal from '../components/ModalTour'; // Ваше модальное окно
import './styles/BookingPage.css';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [tours, setTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({ ClientId: '', TourId: '', date: '', details: '' });
  const [isAdded, setAdded] = useState(false);

  useEffect(() => {
    Promise.all([getBookings(), getClients(), getTours()])
      .then(([bookingsResponse, clientsResponse, toursResponse]) => {
        setBookings(bookingsResponse.data);
        setFilteredBookings(bookingsResponse.data);
        setClients(clientsResponse.data);
        setTours(toursResponse.data);
      })
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, [isModalOpen]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredBookings(bookings.filter(booking => {
      const client = clients.find(client => client.id === booking.ClientId);
      const tour = tours.find(tour => tour.id === booking.TourId);
      return (client && client.name.startsWith(query)) || (tour && tour.name.startsWith(query));
    }));
  };

  const handleAddBooking = () => {
    addBooking(newBooking)
      .then(response => {
        const updatedBookings = [...bookings, response.data];
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings);
        setIsModalOpen(false);
        setNewBooking({ СlientId: '', TourId: '', date: '', details: '' });
        setAdded(true);
      })
      .catch(error => console.error('Ошибка при добавлении бронирования:', error));
  };

  const getClientName = (ClientId) => {
    const client = clients.find(client => client.id === ClientId);
    return client ? client.name : 'Неизвестный клиент';
  };

  const getTourName = (TourId) => {
    const tour = tours.find(tour => tour.id === TourId);
    return tour ? tour.name : 'Неизвестный тур';
  };

  return (
    <div className="bookingspage">
      <h1>Список бронирований</h1>
      <input
        type="text"
        placeholder="Поиск по имени клиента или названию тура"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => setIsModalOpen(true)}>Добавить бронирование</button>
      <ul>
        {filteredBookings.map(booking => (
          <li key={booking.id}>
            <h2>Бронирование #{booking.id}</h2>
            <p>Клиент: {getClientName(booking.ClientId)}</p>
            <p>Тур: {getTourName(booking.TourId)}</p>
            <p>Дата: {booking.date}</p>
            <p>Описание: {booking.details}</p>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Добавить новое бронирование</h2>
          <select
            value={newBooking.ClientId}
            onChange={(e) => setNewBooking({ ...newBooking, ClientId: e.target.value })}
          >
            <option value="" disabled>Выберите клиента</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          <select
            value={newBooking.TourId}
            onChange={(e) => setNewBooking({ ...newBooking, TourId: e.target.value })}
          >
            <option value="" disabled>Выберите тур</option>
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Дата"
            value={newBooking.date}
            onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Описание"
            value={newBooking.details}
            onChange={(e) => setNewBooking({ ...newBooking, details: e.target.value })}
          />
          <button onClick={handleAddBooking}>Добавить</button>
        </Modal>
      )}
    </div>
  );
};

export default BookingPage;
