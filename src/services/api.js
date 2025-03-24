import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = {
  /**
   * Send a message to the chatbot and get a response
   * @param {string} message - The user's message
   * @returns {Promise<Object>} - The chatbot's response
   */
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_URL}/api/chat`, { message });
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
      const response = await axios.get(`${API_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default api; 