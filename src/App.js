import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Restaurant from './features/restaurant/Restaurant';
import Dishes from './features/restaurant/Dishes';
import UserLogin from './features/users/UserLogin';
import UserRegistration from './features/users/UserRegistration';
import MainLayout from './MainLayout';
import Cart from './features/Cart/Cart';
import UserAddress from './features/users/UserAddress';
import UserProfile from './features/users/UserProfile';
import PlaceOrder from './features/Cart/PlaceOrder';
import Payment from './features/Cart/Payment';

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
          <Route path='/address' element={
            <PrivateRoute>
              <UserAddress />
            </PrivateRoute>
          } />
          <Route path='/placeorder' element={
            <PrivateRoute>
              <PlaceOrder />
            </PrivateRoute>
          } />
          <Route path='/order-confirmation' element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          } />
          <Route path='/profile' element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;