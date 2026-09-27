import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Auth Error:", error);
    throw error;
  }
};

export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Prediction Error:", error);
    throw error;
  }
};

export const getDigitalTwinData = async () => {
  try {
    const response = await api.get('/digital-twin');
    return response.data;
  } catch (error) {
    console.error("Digital Twin Fetch Error:", error);
    throw error;
  }
};

export const getHistoryData = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    console.error("History Fetch Error:", error);
    throw error;
  }
};

export default api;