import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { AuthService } from '../services/AuthService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLogin = async () => {
    setHasError(false);
    
    // TEMPORARY BYPASS: Access without backend configuration
    if (!email || !password) {
      console.log('Bypassing login for preview...');
      await useAuthStore.getState().login('mock-token-preview', {
        id: 'preview',
        name: 'Usuario Invitado',
        email: 'invitado@mentesegura.com',
        studentCode: 'PREVIEW'
      });
      return;
    }

    const result = await AuthService.login(email, password);
    if (!result.success) {
      setHasError(true);
      const displayMsg = result.message.includes('JWT_SECRET') 
        ? 'Error interno del servidor (JWT_SECRET). Entra sin datos para probar el diseño.' 
        : result.message;
      Alert.alert('Error de inicio de sesión', displayMsg);
    }
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Bienvenido</Text>
      
      <AuthInput 
        label="Email"
        iconName="email"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        error={hasError}
      />
      
      <AuthInput 
        label="Contraseña"
        iconName="key"
        placeholder="***********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        rightIconName={secureText ? "eye" : "eye-off"}
        onRightIconClick={() => setSecureText(!secureText)}
        error={hasError}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Olvidaste tu contraseña</Text>
      </TouchableOpacity>

      <AuthButton 
        title="Ingresar" 
        onPress={handleLogin} 
        style={styles.loginButton}
      />
      
      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPersonal')}>
          <Text style={[styles.linkText, { fontFamily: 'Montserrat-Bold' }]}>Crea una</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  linkText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#6B9EFA',
  },
  loginButton: {
    marginBottom: 24,
    width: '70%',
    alignSelf: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#6B9EFA',
  },
});
