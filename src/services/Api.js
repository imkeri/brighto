import axios from 'axios';
import CryptoJS from 'crypto-js';
const baseURL = import.meta.env.VITE_BASEURL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Create axios instance 
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const API = {
  // handle GET request
  get: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== "")
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      api.get(fullUrl)
        .then(response => {
          const decryptedData = decrypt(response.data?.data);
          resolve(decryptedData);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  },

  // handle POST request
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      const encryptedData = encrypt(data);
      api.post(url, encryptedData)
        .then(response => {
          const decryptedData = decrypt(response.data?.data);
          resolve(decryptedData);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  },

  // handle PUT request
  put: (url, data, isFile) => {
    return new Promise((resolve, reject) => {
      const encryptedData = encrypt(data);
      const config = !isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      api.put(url, isFile ? encryptedData : data, config)
        .then(response => {
          const decryptedData = decrypt(response.data?.data);
          resolve(decryptedData);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  },

  // handle DELETE request
  delete: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== "")
      );
      const queryString = new URLSearchParams(filteredParams).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      api.delete(fullUrl)
        .then(response => {
          const decryptedData = decrypt(response.data?.data);
          resolve(decryptedData);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  },
};

// Function to handle API errors
const handleApiError = (error) => {
  console.error('API error occurred:', error);
};

// Function to encrypt data
const encrypt = (data) => {
  const stringData = JSON.stringify(data);
  const encrypted = {
    data: CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString(),
  }
  return encrypted;
};

// Function to decrypt data
const decrypt = (encryptedData) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Decryption error occurred:', error);
    throw error;
  }
};

export default API;
