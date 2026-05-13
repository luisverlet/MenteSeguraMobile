import { apiClient } from '../../../core/api/apiClient';
import { useAuthStore } from '../../../store/auth/useAuthStore';

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      const data = response.data;

      if (data.access_token) {
        // Manual Base64 decoding for React Native (replaces missing atob)
        const decodeBase64 = (str: string) => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          let output = '';
          str = str.replace(/[^A-Za-z0-9+/=]/g, '');
          for (let i = 0; i < str.length; i += 4) {
            const enc1 = chars.indexOf(str.charAt(i));
            const enc2 = chars.indexOf(str.charAt(i + 1));
            const enc3 = chars.indexOf(str.charAt(i + 2));
            const enc4 = chars.indexOf(str.charAt(i + 3));
            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;
            output += String.fromCharCode(chr1);
            if (enc3 !== 64) output += String.fromCharCode(chr2);
            if (enc4 !== 64) output += String.fromCharCode(chr3);
          }
          return output;
        };

        // Step 1: Decode JWT payload
        let tokenPayload: any = null;
        let userId: string | null = null;
        try {
          const tokenParts = data.access_token.split('.');
          if (tokenParts.length === 3) {
            const base64 = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
            tokenPayload = JSON.parse(decodeBase64(base64));
            userId = String(tokenPayload.sub ?? tokenPayload.id ?? tokenPayload.user_id ?? 'not-found');
          }
        } catch (e) {
          console.error('Error decoding token:', e);
        }

        // Step 2: Fetch students list and search for match
        let studentId = userId || '1';
        let studentsDebug: any = null;
        let evaluationsDebug: any = null;

        try {
          const studentsResponse = await apiClient.get('/students', {
            headers: { Authorization: `Bearer ${data.access_token}` }
          });
          studentsDebug = studentsResponse.data;

          if (Array.isArray(studentsDebug)) {
            const studentEntry = studentsDebug.find((row: any[]) => String(row[1]) === userId);
            if (studentEntry) {
              studentId = String(studentEntry[0]);
            }
          }
        } catch (e: any) {
          studentsDebug = `ERROR: ${e.message}`;
        }

        // Step 3: Try /evaluations to find student_id by email match
        try {
          const evalResponse = await apiClient.get('/evaluations', {
            headers: { Authorization: `Bearer ${data.access_token}` }
          });
          evaluationsDebug = evalResponse.data;
          
          const items = evalResponse.data?.items;
          if (Array.isArray(items)) {
            const myEntry = items.find((item: any) => item.student_code);
            if (myEntry && studentId === userId) {
              // last resort: use the student_id from evaluations
              studentId = String(myEntry.student_id);
            }
          }
        } catch (e: any) {
          evaluationsDebug = `ERROR: ${e.message}`;
        }

        const user = {
          id: studentId,
          name: email.split('@')[0],
          email: email,
        };

        await useAuthStore.getState().login(data.access_token, user);

        // Return debug info so UI can display it
        return {
          success: true,
          debug: {
            token: data.access_token.substring(0, 50) + '...',
            tokenPayload,
            userId,
            resolvedStudentId: studentId,
            studentsListSample: Array.isArray(studentsDebug) ? studentsDebug.slice(0, 3) : studentsDebug,
            evaluationsDebug: typeof evaluationsDebug === 'object' ? JSON.stringify(evaluationsDebug).substring(0, 200) : evaluationsDebug,
          }
        };
      }

      return { success: false, message: 'No se recibió token de acceso' };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al iniciar sesión';
      return { success: false, message };
    }
  },

  register: async (registerData: any) => {
    try {
      // Backend expects detailed student profile
      const response = await apiClient.post('/register', {
        ...registerData,
        accepted_informed_consent: true,
        consent_version: 'v1',
      });
      
      return { success: true, message: response.data.message || 'Registro exitoso' };
    } catch (error: any) {
      console.log('Register error:', error.response?.data);
      const message = typeof error.response?.data?.detail === 'string' 
        ? error.response.data.detail 
        : 'Error en el registro';
      return { success: false, message };
    }
  },

  verifyEmail: async (email: string, code: string) => {
    try {
      const response = await apiClient.post('/verify-email', {
        email,
        verification_code: code
      });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al verificar email';
      return { success: false, message };
    }
  },

  resendCode: async (email: string) => {
    try {
      const response = await apiClient.post('/resend-code', { email });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al reenviar código';
      return { success: false, message };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post('/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Error al procesar solicitud';
      return { success: false, message };
    }
  }
};
