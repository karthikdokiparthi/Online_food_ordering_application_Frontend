import './App.css';
import UserLogin from './features/users/UserLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegistration from './features/users/UserRegistration';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='register' element={<UserRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
