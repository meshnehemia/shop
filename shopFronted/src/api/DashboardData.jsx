import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/dashboard';
const token = localStorage.getItem('token');

export const getDashboardData = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }); 
      console.log(response.data)     
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching products:', error.response?.data || error.message);
    return [];
  }
};