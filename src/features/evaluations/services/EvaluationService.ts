import { apiClient } from '../../../core/api/apiClient';

export interface PHQ9Answers {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: number;
  question7: number;
  question8: number;
  question9: number;
}

export const EvaluationService = {
  predict: async (answers: PHQ9Answers) => {
    try {
      const response = await apiClient.post('/predict', answers);
      return {
        success: true,
        data: response.data // { probabilidad, clase, total_score }
      };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al procesar la evaluación';
      return { success: false, message };
    }
  },

  getStudentEvaluations: async (studentId: number | string) => {
    try {
      const response = await apiClient.get(`/students/${studentId}/evaluations`);
      return {
        success: true,
        data: response.data // { current_risk, latest_phq9, history }
      };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al obtener historial';
      return { success: false, message };
    }
  }
};
