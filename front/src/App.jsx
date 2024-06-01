import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import UsersPage from './routes/UsersPage';
import HomePage from './routes/HomePage';
import User from './components/User';
import StatsPage from './routes/StatsPage';
import PrivateRoute from './PrivateRoute';
import TourPage from './routes/TourPage';
import BookingPage from './routes/BookingPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          >
            <Route path=":userId" element={<User />} />
          </Route>
          <Route
            path="stats"
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="tours"
            element={
              <PrivateRoute>
                <TourPage />
              </PrivateRoute>
            }
          />
          <Route
            path="bookings"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
