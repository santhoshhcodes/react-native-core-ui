// --------EXAMPLE usage of API

import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const HRService = {
  // Example: Mark Attendance
  markAttendance: async (locationData: object) => {
    const response = await apiClient.post(ENDPOINTS.HR.ATTENDANCE, locationData);
    return response.data;
  },

  // Example: Send message to your FastAPI AI Agent
  sendAIChat: async (message: string) => {
    const response = await apiClient.post(ENDPOINTS.AI.CHAT, { query: message });
    return response.data;
  }
};