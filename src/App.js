import './App.css';
import UserLogin from './features/users/UserLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegistration from './features/users/UserRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='register' element={<UserRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
