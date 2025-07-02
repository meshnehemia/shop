// File: /src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: 'fa-tachometer-alt', path: '/' },
    { name: 'Products', icon: 'fa-box-open', path: '/Dashboard/products' },
    { name: 'Orders', icon: 'fa-shopping-cart', path: '/Dashboard/orders' },
    { name: 'Customers', icon: 'fa-users', path: '/Dashboard/customers' },
    { name: 'AddProduct', icon: 'fa-chart-line', path: '/Dashboard/AddProduct' },
    { name: 'Settings', icon: 'fa-cog', path: '/Dashboard/settings' },
  ];

  return (
    <aside className={`bg-gray-900 text-white p-6 fixed bottom-0 lg:fixed z-40 top-10 bottom-0 left-0 w-[250px] transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >

      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`
              }
              onClick={() => setIsOpen(false)}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;