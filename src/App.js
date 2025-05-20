import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import Restaurant from './features/restaurant/Restaurant';
import Dishes from './features/restaurant/Dishes';
import UserLogin from './features/users/UserLogin';
import UserRegistration from './features/users/UserRegistration';
import MainLayout from './MainLayout';
import Cart from './features/Cart/Cart';

// Private Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />

        <Route element={<MainLayout />}>
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/restaurants' element={
            <PrivateRoute>
              <Restaurant />
            </PrivateRoute>
          } />
          <Route path='/dishes' element={
            <PrivateRoute>
              <Dishes />
            </PrivateRoute>
          } />
          <Route path='/cart' element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;