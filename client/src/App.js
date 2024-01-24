import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Booking from './pages/Booking';
import BookingList from './pages/BookingList';
import Profile from './pages/Profile';
import PlaceOrder from './pages/PlaceOrder';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/booking/:bikeid' element={<Booking />} />
      <Route path='/booking-list' element={<BookingList />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/payment/:id' element={<Payment />} />
      {/* <Route path='/placeorder' element={<PlaceOrder />} /> */}
    </Routes>
  );
}

export default App;

