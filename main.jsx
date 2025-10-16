import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Booking from './pages/Booking';
import Subscribe from './pages/Subscribe';
import Calendar from './pages/Calendar';
import Login from './pages/Login';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Booking/>} />
          <Route path='subscribe' element={<Subscribe/>} />
          <Route path='calendar' element={<Calendar/>} />
          <Route path='login' element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
