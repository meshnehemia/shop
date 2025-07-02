import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
        headers: {
          'Accept': 'application/json'
        }
      }); 
      // console.log(response.data)     
    return response.data;
  } catch (error) {
    // console.error('❌ Error fetching products:', error.response?.data || error.message);
    return [];
  }
};
