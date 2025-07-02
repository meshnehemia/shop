import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import {getDashboardData} from '../../api/DashboardData'
Chart.register(...registerables);

export default function Dashboard() {
  const revenueRef = useRef(null);
  const categoryRef = useRef(null);
  const chartInstances = useRef([]);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData(); // ✅ Await the async function
        console.log(data)
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    // Destroy previous charts on re-render
    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    };
  }, []);

  useEffect(() => {
    if (revenueRef.current && categoryRef.current) {
      // Destroy existing charts before creating new ones
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];

      // Revenue Chart
      const revenueChart = new Chart(revenueRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Revenue',
            data: [6500, 5900, 8000, 8100, 5600, 7500, 8200],
            backgroundColor: 'rgba(72, 149, 239, 0.1)',
            borderColor: '#4895ef',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });

      // Category Chart
      const categoryChart = new Chart(categoryRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Audio', 'Mobile', 'Footwear', 'Accessories'],
          datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: ['#4361ee', '#4895ef', '#4cc9f0', '#f72585', '#3f37c9'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right' } },
          cutout: '70%'
        }
      });

      chartInstances.current = [revenueChart, categoryChart];
    }
  }, []);

  return (
    <div className="p-1 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-500">Welcome back, Admin! Here's what's happening with your store today.</p>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-8">
        {/* Card Example */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between relative">
            <div>
              <p className="text-gray-500">Total Assets</p>
              <p className="text-xl font-bold mt-2">{dashboardData?.totalAsset?.toLocaleString('en-KE', {
                        style: 'currency',
                        currency: 'ksh',
                        })}</p>
              <p className="text-green-500 text-sm mt-1 flex items-center">
                {/* <i className="fas fa-arrow-up mr-1"></i>  */}
                profit + initial capital
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-dollar-sign text-green-600"></i>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-gray-500">Total Orders</p>
                            <p class="text-3xl font-bold mt-2">1,248</p>
                            <p class="text-green-500 text-sm mt-1 flex items-center">
                                {/* <i class="fas fa-arrow-up mr-1"></i>  */}
                                past 7 days
                            </p>
                        </div>
                        <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-shopping-cart text-blue-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-gray-500">Bookings</p>
                            <p class="text-3xl font-bold mt-2"> { dashboardData?.recentBookingsCount }</p>
                            <p class="text-green-500 text-sm mt-1 flex items-center">
                                {/* <i class="fas fa-arrow-up mr-1"></i>  */}
                                past 7 days
                            </p>
                        </div>
                        <div class="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <i class="fas fa-calendar-check text-purple-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-gray-500">New Customers</p>
                            <p class="text-3xl font-bold mt-2">{ dashboardData?.newCustomersCount }</p>
                        <p class="text-green-500 text-sm mt-1 flex items-center">
                            {/* <i class="fas fa-arrow-up mr-1"></i>  */}
                            past 7 days
                        </p>
                    </div>
                    <div class="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <i class="fas fa-user-plus text-orange-600"></i>
                    </div>
                </div>
            </div>
        {/* Add the other 3 cards exactly like above (Orders, Bookings, Customers) */}
      </div>

      <br />
      <hr />
      <br />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-80">
            <canvas ref={revenueRef}></canvas>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales by Category</h2>
            <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-80">
            <canvas ref={categoryRef}></canvas>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold">Recent Orders</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">#ORD-1001</div>
                                        <div class="text-sm text-gray-500">May 15, 2023</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">John Doe</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">$199.99</div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">#ORD-1002</div>
                                        <div class="text-sm text-gray-500">May 14, 2023</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">Alice Smith</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Shipped</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">$149.99</div>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">#ORD-1003</div>
                                        <div class="text-sm text-gray-500">May 12, 2023</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">Robert Johnson</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">$899.99</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                        <a href="#" class="text-sm text-primary hover:text-secondary font-medium">View All Orders</a>
                    </div>
                </div>

                
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold">Recent Bookings</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">message</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dashboardData?.recentBookings?.map((booking, index) => (
                                    <tr key={booking._id} className="hover:bg-gray-50">
                                    {/* 📧 Email & Phone */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.email}</div>
                                        <div className="text-sm text-gray-500">{booking.phone}</div>
                                    </td>

                                    {/* 📦 Product Title */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                        {booking.product?.title || "—"}
                                        </div>
                                    </td>

                                    {/* 📌 Status */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        booking.status === 'Cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : booking.status === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {booking.status || 'Pending'}
                                        </span>
                                    </td>

                                    {/* 🗓️ Date & Time */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                        {new Date(booking.bookedAt).toLocaleDateString('en-KE', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                        {new Date(booking.bookedAt).toLocaleTimeString('en-KE', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                        </div>
                                    </td>
                                    {/* 📦 Product Title */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                        {booking?.message || "—"}
                                        </div>
                                    </td>

                                    {/* 💰 Price */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                        Ksh {booking.product?.price?.toLocaleString('en-KE', {
                                            minimumFractionDigits: 2,
                                        }) || '0.00'}
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                        <a href="#" class="text-sm text-primary hover:text-secondary font-medium">View All Bookings</a>
                    </div>
                </div>
            </div>

            <br />
            <hr />
            <br />
         
            <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold">Recent Customers</h2>
                </div>
                <div class="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Customer
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Orders
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Joined
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {dashboardData?.recentCustomers?.map((customer) => {
      const initials = `${customer.firstname?.[0] || ''}${customer.lastname?.[0] || ''}`.toUpperCase();
      const fullName = `${customer.firstname} ${customer.lastname}`;
      const joinedDate = new Date(customer.createdAt).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        <tr key={customer._id} className="hover:bg-gray-50">
          {/* Name + Email + Username */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>
              </div>
              <div className="ml-4 p-4">
                <div className="text-sm font-medium text-gray-900">{fullName}</div>
              </div>
            </div>
          </td>

          {/* Email (optional duplicate) */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{customer.email}</div>
            <div className="text-xs text-gray-400">({customer.username})</div>
          </td>

          {/* Orders */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {customer.orders?.length > 0 ? customer.orders.length : <span className="text-red-500">-</span>}
            </div>
          </td>

          {/* Joined */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{joinedDate}</div>
          </td>

          {/* Action */}
          <td className="px-6 py-4 whitespace-nowrap">
            <a href={`/users/${customer._id}`} className="text-primary hover:text-secondary text-sm font-medium">View</a>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

                </div>
                <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                    <a href="#" class="text-sm text-primary hover:text-secondary font-medium">View All Customers</a>
                </div>
            </div>
      {/* You can continue adding the rest of the tables for recent orders, bookings, customers the same way */}
    </div>
  );
}
