import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthSelect } from '../../../core/components/AuthSelect';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterAcademic'>;

export default function RegisterAcademicScreen({ route, navigation }: Props) {
  const { personalData } = route.params;
  const [programa, setPrograma] = useState('Elegir Programa');
  const [semestre, setSemestre] = useState('5');

  const handleNext = () => {
    navigation.navigate('RegisterCredentials', {
      personalData,
      academicData: {
        faculty: 1, // Mocked as requested
        program: 1, // Mocked as requested
        semester: parseInt(semestre)
      }
    });
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Academico</Text>
      
      <AuthSelect 
        label="Programa Academico"
        iconName="bank"
        value={programa}
        onPress={() => setPrograma('Ingenieria')}
      />

      <AuthSelect 
        label="Semestre"
        iconName="bank"
        value={semestre}
        onPress={() => setSemestre(semestre === '5' ? '6' : '5')}
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
