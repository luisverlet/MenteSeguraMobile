import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import { useAuthStore } from '../../../store/auth/useAuthStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterTerms'>;

export default function TermsScreen({ navigation }: Props) {
  const login = useAuthStore((s) => s.login);
  const [accepted, setAccepted] = useState(false);

  const handleFinish = async () => {
    if (!accepted) return;
    
    // Mock successful registration and login
    await login('mock-token-new', {
      id: '2',
      name: 'Nuevo Estudiante',
      email: 'estudiante@ejemplo.edu',
      studentCode: '202401',
    });
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Términos y Condiciones</Text>
      
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Text style={styles.termsText}>
            De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, sobre Protección de Datos Personales, los datos suministrados por usted en esta plataforma tienen el carácter de datos sensibles en materia de salud mental y bienestar.
            {'\n\n'}
            Estos datos serán tratados de forma estrictamente confidencial. Usted acepta y autoriza que su información médica, psicológica y académica registrada en MenteSegura será accedida y leída EXCLUSIVAMENTE por el equipo de profesionales de psicología y salud mental de la Institución Educativa (Bienestar Universitario), con el único propósito de brindarle apoyo, seguimiento y orientación.
            {'\n\n'}
            Ningún tercero, docente, personal administrativo externo al área de salud de la universidad, ni estudiantes tendrán acceso a esta información. La institución garantiza la preservación de la reserva legal y ética (Historia Clínica y Secreto Profesional) sobre los registros de sus valoraciones.
          </Text>
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => setAccepted(!accepted)}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name={accepted ? "checkbox-marked" : "checkbox-blank-outline"} 
          size={24} 
          color={accepted ? "#6B9EFA" : "#666"} 
        />
        <Text style={styles.checkboxLabel}>Aceptar terminos y condiciones</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <AuthButton 
          title="Salir" 
          variant="secondary" 
          onPress={() => navigation.goBack()} 
          style={styles.btnLeft}
        />
        <AuthButton 
          title="Registrar" 
          variant="primary" 
          onPress={handleFinish} 
          style={styles.btnRight}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: '#EAECEF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#F8F9FA'
  },
  termsText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#4A4A4A',
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLeft: {
    marginRight: 8,
  },
  btnRight: {
    marginLeft: 8,
  },
});
