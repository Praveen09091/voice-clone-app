import axios from 'axios';

// More robust production environment detection
const isProduction = process.env.NODE_ENV === 'production' || 
                   process.env.REACT_APP_NODE_ENV === 'production' ||
                   window.location.hostname !== 'localhost';

// Use relative paths for Netlify Functions in production
const API_URL = isProduction 
  ? '/.netlify/functions'
  : process.env.REACT_APP_API_URL || 'http://localhost:3001';

console.log("Environment:", isProduction ? "Production" : "Development");
console.log("API URL:", API_URL);

const api = {
  /**
   * Send a message to the chatbot and get a response
   * @param {string} message - The user's message
   * @returns {Promise<Object>} - The chatbot's response
   */
  sendMessage: async (message) => {
    try {
      // In production, use Netlify Function; otherwise, use the original API endpoint
      const endpoint = isProduction
        ? `${API_URL}/chat`
        : `${API_URL}/api/chat`;
      
      console.log("Using endpoint:", endpoint); // Debug log
      const response = await axios.post(endpoint, { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * Health check for the API
   * @returns {Promise<Object>} - Health check response
   */
  healthCheck: async () => {
    try {
      // In production, use Netlify Function; otherwise, use the original API endpoint
      const endpoint = isProduction
        ? `${API_URL}/health`
        : `${API_URL}/health`;
      
      console.log("Using health endpoint:", endpoint); // Debug log
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default api; 