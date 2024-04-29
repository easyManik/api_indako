/* eslint-disable */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.43.4:8000/api/',
  timeout: 10000, // Timeout 10 detik
  headers: {
    'Content-Type': 'application/json',
    // Tambahan headers jika diperlukan (seperti token akses)
  },
});

export default apiClient;
