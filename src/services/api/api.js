import axios from 'axios';

const USER_API_URL = 'https://673ccf6796b8dcd5f3fbc68e.mockapi.io/users';
const MOVIE_API_URL = 'https://673ccf6796b8dcd5f3fbc68e.mockapi.io/movies';

export const api = {
  // User operations
  getUsers: async () => {
    const response = await axios.get(USER_API_URL);
    return response.data;
  },

  getUser: async (id) => {
    const response = await axios.get(`${USER_API_URL}/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(USER_API_URL, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${USER_API_URL}/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${USER_API_URL}/${id}`);
    return response.data;
  },

  loginUser: async (credentials) => {
    try {
      const users = await axios.get(USER_API_URL);
      const user = users.data.find(
        u => u.username === credentials.username && u.password === credentials.password
      );
      return user || null;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

// Movie operations
  getMovies: async () => {
    try {
      console.log('Making API request to:', MOVIE_API_URL);
      const response = await fetch(MOVIE_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      if (!data) {
        throw new Error('No data received from API');
      }
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  addMovie: async (movieData) => {
    const response = await axios.post(MOVIE_API_URL, movieData);
    return response.data;
  },

  updateMovie: async (id, movieData) => {
    const response = await axios.put(`${MOVIE_API_URL}/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id) => {
    const response = await axios.delete(`${MOVIE_API_URL}/${id}`);
    return response.data;
  }
};
