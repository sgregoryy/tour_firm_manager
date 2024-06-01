// src/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Интерсептор для добавления токена в заголовки запросов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Функции API для клиентов
export const getClients = async () => {
  return api.get('/clients/allclients');
};

export const addClient = async (clientData) => {
  return api.post('/clients/newclient', clientData);
};

// Функции API для туров
export const getTours = async () => {
  return api.get('/tours/alltours');
};

export const addTour = async (tourData) => {
  return api.post('/tours/newtour', tourData);
};

// Функции API для бронирований
export const getBookings = async () => {
  return api.get('/bookings/allbookings');
};

export const addBooking = async (bookingData) => {
  return api.post('/bookings/newbooking', bookingData);
};

// Функции API для пользователей
export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = async (userData) => {
  return api.post('/auth/login', userData);
};

// Функции API для защищенных маршрутов
export const getProtectedData = async () => {
  return api.get('/protected');
};
