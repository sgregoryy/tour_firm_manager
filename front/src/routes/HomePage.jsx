import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClients, getTours, getBookings, addClient, addBooking, addTour } from "../apiService";
import Modal from "../components/Modal";
import './styles/HomePage.css'

const HomePage = () => {
    const navigate = useNavigate('');
    const [clients, setClients] = useState([]);
    const [tours, setTours] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Получение данных о клиентах
            if(isLoading){
                getClients()
                .then(data => {setClients(data.data)})
                .catch(error => console.error('Ошибка при получении списка клиентов:', error));

                // Получение данных о турах
                getTours()
                    .then(data => {setTours(data.data)})
                    .catch(error => console.error('Ошибка при получении списка туров:', error));

                // Получение данных о бронированиях
                getBookings()
                    .then(data => {setBookings(data.data)})
                    .catch(error => console.error('Ошибка при получении списка бронирований:', error));

                setLoading(false);    
            }
                    
    }, [clients, tours, bookings, isLoading]);
    const handleAddClient = (formData) => {
        
        addClient({name: formData.name, email: formData.email, phone: formData.phone})
          .then(() => {
            
            getClients()
              .then(data => setClients(data))
              .catch(error => console.error('Ошибка при получении списка клиентов:', error));
            setLoading(true);
          })
          .catch(error => console.error('Ошибка при добавлении клиента:', error));
      };
    
      const handleAddTour = (formData) => {
        console.log(formData);
        setLoading(true);
        addTour({name: formData.name, description: formData.description, price: formData.price})
          .then(() => {
            getTours()
              .then(data => setTours(data))
              .catch(error => console.error('Ошибка при получении списка туров:', error));
            setLoading(true);
          })
          .catch(error => console.error('Ошибка при добавлении тура:', error));
        
      };
    
      const handleAddBooking = (formData) => {
        addBooking({ClientId: formData.clientId, TourId: formData.tourId, details: formData.details, date: formData.date})
          .then(() => {
            setLoading(true);
            getBookings()
              .then(data => setBookings(data))
              .catch(error => console.error('Ошибка при получении списка бронирований:', error));
            setLoading(true);
          })
          .catch(error => console.error('Ошибка при добавлении бронирования:', error));
      };
      const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    return(
        <div className="home-container">
            <div className="home-left-container">
                <div className="top-direction-container">
                    <h3>Самые популярные направления</h3>
                    <dl>
                        <dt>Шри-Ланка</dt>
                        <dd>Сезон: Апрель-Май, Январь-Февраль</dd>
                        <dt>Куба</dt>
                        <dd>Сезон: Август-Октябрь</dd>
                        <dt>Египет</dt>
                        <dd>Сезон: Май-Октябрь</dd>
                    </dl>
                </div>
                <div className="panel-container">
                    <div className="nav-list">
                        <p>Навигация</p>
                        <ul>
                            <li onClick={() => navigate('/users')}><Link to='/users'>Клиенты</Link></li>
                            <li onClick={() => navigate('/stats')}><Link to='/stats'>Общая статистика</Link></li>
                            <li onClick={() => navigate('/tours')}><Link to="/tours">Туры</Link></li>
                            <li onClick={() => navigate('/bookings')}><Link to="/bookings">Бронирования</Link></li>
                        </ul>
                    </div>
                    <div className="comand-container">
                        <p>Быстрые команды</p>
                        <ul>
                            <li onClick={() => openModal('client')}>Добавить клиента</li>
                            <li onClick={() => openModal('tour')}>Добавить тур</li>
                            <li onClick={() => openModal('booking')}>Добавить бронь</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="home-right-container">
                <section>
                    <h2>Обзор</h2>
                    <div>
                    <p>Всего клиентов: {clients.length}</p>
                    <p>Всего туров: {tours.length}</p>
                    <p>Всего бронирований: {bookings.length}</p>
                    </div>
                </section>

                <section className="actions-section">
                <h2>Действия</h2>
                <div>
                        <h3>Последний клиент</h3>
                        <ul>
                            {clients.length>0 && clients.slice(clients.length-4, clients.length-1).map(client => (
                                <li key={client.id}>{client.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Последний тур</h3>
                        <ul>
                            {tours.length>0 && tours.slice(tours.length-4, tours.length-1).map(tour => (
                                <li key={tour.id}>{tour.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Последняя бронь</h3>
                        <ul>
                            {bookings.length>0 && bookings.slice(bookings.length-4, bookings.length-1) .map(booking => (
                                <li key={booking.id}>{booking.details}</li>
                            ))}
                        </ul>
                    </div>    
                </section>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={modalType === 'client' ? handleAddClient : 
                            modalType === 'tour' ? handleAddTour :
                            handleAddBooking}
                type={modalType}
            />
        </div>
    )
}

export default HomePage;