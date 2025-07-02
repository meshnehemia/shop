import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import Dashboard from './AdminPages/Dashboard';
import Products from './AdminPages/Products';
import Orders from './AdminPages/Orders';
import Customers from './AdminPages/Customers';
import AddProduct from './AdminPages/AddProduct';
import Settings from './AdminPages/settings';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className=" flex flex-col">
    <Header setIsOpen={setIsSidebarOpen} />
      <div className='flex flex-row'>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:fixed lg:left-[250px]">
        <main className="p-6 overflow-y-auto mt-2 h-[calc(100vh-4rem)]">
            
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      </div>
    </div>
  );
}
