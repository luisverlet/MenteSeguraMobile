import { apiClient } from '../api/apiClient';

export const AcademicService = {
  getFaculties: async () => {
    try {
      const response = await apiClient.get('/faculties');
      // Response format: [[id, name], ...]
      return response.data.map((row: any[]) => ({
        id: row[0],
        name: row[1]
      }));
    } catch (error) {
      console.error('Error fetching faculties:', error);
      return [];
    }
  },

  getPrograms: async () => {
    try {
      const response = await apiClient.get('/programs');
      // Response format: [[id, name, faculty_id], ...]
      return response.data.map((row: any[]) => ({
        id: row[0],
        name: row[1],
        facultyId: row[2]
      }));
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }
};
