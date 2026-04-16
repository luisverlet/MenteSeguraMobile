import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterCredentials'>;

export default function RegisterCredentialsScreen({ navigation }: Props) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleNext = () => {
    navigation.navigate('RegisterTerms');
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Registrate</Text>
      
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
        label="Repetir Email"
        iconName="email"
        placeholder="example@gmail.com"
        value={emailConfirm}
        onChangeText={setEmailConfirm}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AuthInput 
        label="Clave"
        iconName="key"
        placeholder="***********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        rightIconName={secureText ? "eye" : "eye-off"}
        onRightIconClick={() => setSecureText(!secureText)}
      />

      <AuthInput 
        label="Repetir Clave"
        iconName="key"
        placeholder="***********"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={secureConfirm}
        rightIconName={secureConfirm ? "eye" : "eye-off"}
        onRightIconClick={() => setSecureConfirm(!secureConfirm)}
      />

      <View style={styles.buttonRow}>
        <AuthButton 
          title="Volver" 
          variant="secondary" 
          onPress={() => navigation.goBack()} 
          style={styles.btnLeft}
        />
        <AuthButton 
          title="Siguiente" 
          variant="primary" 
          onPress={handleNext} 
          style={styles.btnRight}
        />
      </View>

      <Text style={styles.warningText}>
        Todos los datos seran tratados segun el tratamiento de datos sensibles, asegurando la privacidad y seguridad de los mismos.
      </Text>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  btnLeft: {
    flex: 1,
    marginRight: 8,
  },
  btnRight: {
    flex: 1,
    marginLeft: 8,
  },
  warningText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
});
