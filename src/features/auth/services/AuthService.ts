import { apiClient } from '../../../core/api/apiClient';
import { useAuthStore } from '../../../store/auth/useAuthStore';

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      
      // Based on common FastAPI patterns, it might return { access_token, user }
      // If the OpenAPI says Successful Response is empty, we must rely on what we get
      const data = response.data;
      
      if (data.access_token) {
        // Mock user details if backend doesn't provide full object
        const user = data.user || { 
          id: '1', 
          name: email.split('@')[0], 
          email: email 
        };
        
        await useAuthStore.getState().login(data.access_token, user);
        return { success: true };
      }
      
      return { success: false, message: 'No se recibió token de acceso' };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al iniciar sesión';
      return { success: false, message };
    }
  },

  register: async (registerData: any) => {
    try {
      // Backend expects:
      // name, last_name, email, password, student_code, birth_date, gender, 
      // faculty (int), program (int), semester (int), accepted_informed_consent (true)
      
      const response = await apiClient.post('/register', {
        ...registerData,
        accepted_informed_consent: true,
        consent_version: 'v1',
        gender: registerData.gender || 'Prefer not to say', // Default if missing
      });
      
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log('Register error:', error.response?.data);
      const message = error.response?.data?.detail || 'Error en el registro';
      return { success: false, message };
    }
  }
};
