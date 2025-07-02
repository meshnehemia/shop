// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/homepage';
import OrdersPage from './pages/UserPages/OrdersPages';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard"/> : <Navigate to="/auth"/>}/>
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard/*" element={token ? <Dashboard /> : <Navigate to="/auth" />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path='/orders' element ={OrdersPage} />
      <Route path="*" element={<div className="text-center mt-20 text-red-500 text-xl">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
