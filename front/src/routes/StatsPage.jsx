import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { getClients, getTours, getBookings } from '../apiService';
import './styles/StatsPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const StatsPage = () => {
  const [clients, setClients] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');
  const [dataset1, setDataset1] = useState([]);
  const [dataset2, setDataset2] = useState([]);
  const [dataset3, setDataset3] = useState([]);
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const [incomeData, setIncomeData] = useState([]);
  useEffect(() => {
    // Получаем данные с сервера
    Promise.all([getClients(), getTours(), getBookings()])
      .then(([clientsResponse, toursResponse, bookingsResponse]) => {
        setClients(clientsResponse.data);
        setTours(toursResponse.data);
        setBookings(bookingsResponse.data);
      })
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  useEffect(() => {
    if (clients.length > 0 && tours.length > 0 && bookings.length > 0) {
      // Пример вычисления статистики на основе полученных данных
      const tourBookingsCount = tours.map(tour => {
        return bookings.filter(booking => booking.TourId === tour.id).length;
      });

      const clientBookingsCount = clients.map(client => {
        return bookings.filter(booking => booking.ClientId === client.id).length;
      });

      // Группируем бронирования по дате
      const bookingsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      bookings.forEach(booking => {
        const date = new Date(booking.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const monthString = `${year}-${month.toString().padStart(2, '0')}`;
        if (!bookingsByMonth[month]) {
          bookingsByMonth[month] = 0;
        }
        bookingsByMonth[month]++;
      });

      const tourIncome = tours.map(tour => {
        const tourBookings = bookings.filter(booking => booking.TourId === tour.id).length;
        const totalIncome = tourBookings * tour.price;
        return totalIncome;
      });

      console.log(bookingsByMonth);

      setDataset1(tourBookingsCount);
      setDataset2(clientBookingsCount);
      setDataset3(bookingsByMonth);
      setIncomeData(tourIncome);

    }
  }, [clients, tours, bookings]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...dataset1, ...dataset2, ...dataset3, 20), 
      },
    },
  };
  const optionsIncome = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...incomeData, 3000000), 
      },
    },
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <div className="chart-container">
            <div className="chart-elem">
              <Bar options={options} data={{
                labels: clients.map(client => client.name),
                datasets: [{
                  data: dataset2,
                  label: 'Бронирования по клиентам',
                  backgroundColor: 'rgb(190, 0, 75)',
                }],
              }} width={700} height={700} />
            </div>
            <div className="chart-elem">
              <Line options={options} data={{
                labels: clients.map(client => client.name),
                datasets: [{
                  data: dataset2,
                  label: 'Бронирования по клиентам',
                  backgroundColor: 'rgb(190, 0, 75)',
                }],
              }} width={700} height={700} />
            </div>
          </div>
        );
      case 'tours':
        return (
          <div className="chart-container">
            <div className="chart-elem">
              <Bar options={options} data={{
                labels: tours.map(tour => tour.name),
                datasets: [{
                  data: dataset1,
                  label: 'Бронирования по турам',
                  backgroundColor: 'rgb(190, 0, 75)',
                }],
              }} width={700} height={700} />
            </div>
            <div className="chart-elem">
              <Line options={options} data={{
                labels: tours.map(tour => tour.name),
                datasets: [{
                  data: dataset1,
                  label: 'Бронирования по турам',
                  backgroundColor: 'rgb(190, 0, 75)',
                }],
              }} width={700} height={700} />
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="chart-container">
            <div className="chart-elem">
              <Bar
                options={options}
                data={{
                  labels: months,
                  datasets: [{
                    data: dataset3,
                    label: 'Количество бронирований по месяцам',
                    backgroundColor: 'rgb(190, 0, 75)',
                  }],
                }}
                width={700}
                height={700}
              />
            </div>
            <div className="chart-elem">
              <Line
                options={options}
                data={{
                  labels: months,
                  datasets: [{
                    data: dataset3,
                    label: 'Количество бронирований по месяцам',
                    backgroundColor: 'rgb(190, 0, 75)',
                  }],
                }}
                width={700}
                height={700}
              />
            </div>
            <div className="chart-elem">
              <Bar options={optionsIncome} data={{
                labels: tours.map(tour => tour.name),
                datasets: [{
                  data: incomeData,
                  label: 'Доход по направлениям',
                  backgroundColor: 'rgb(0, 75, 190)',
                }],
              }} width={700} height={350} />
            </div>
            <div className="chart-elem">
              <Line options={optionsIncome} data={{
                labels: tours.map(tour => tour.name),
                datasets: [{
                  data: incomeData,
                  label: 'Доход по направлениям',
                  backgroundColor: 'rgb(0, 75, 190)',
                }],
              }} width={700} height={350} />
            </div>
          </div>
          
        );
      default:
        return null;
    }
  };

  return (
    <div className="statspage">
      <div className="sidebar">
        <p>Параметры</p>
        <ul>
          <li className={activeTab === 'clients' ? 'active' : ''} onClick={() => setActiveTab('clients')}>Клиенты</li>
          <li className={activeTab === 'tours' ? 'active' : ''} onClick={() => setActiveTab('tours')}>Туры</li>
          <li className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Бронирования</li>
        </ul>
      </div>
      <div className="main-container">
        <div><p>Статистика</p></div>
        {renderChart()}
      </div>
    </div>
  );
};

export default StatsPage;
