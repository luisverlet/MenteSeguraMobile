import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    // Mock login
    await login('mock-token', {
      id: '1',
      name: 'Luis',
      email: email,
      studentCode: '123',
    });
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
          <Text style={[styles.linkText, { fontWeight: 'bold' }]}>Crea una</Text>
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
