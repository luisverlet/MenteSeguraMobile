import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthSelect } from '../../../core/components/AuthSelect';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import { AcademicService } from '../../../core/services/AcademicService';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterAcademic'>;

export default function RegisterAcademicScreen({ route, navigation }: Props) {
  const { personalData } = route.params;
  const [faculties, setFaculties] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [semestre, setSemestre] = useState('1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [facData, progData] = await Promise.all([
        AcademicService.getFaculties(),
        AcademicService.getPrograms()
      ]);
      setFaculties(facData);
      setPrograms(progData);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleNext = () => {
    if (!selectedFaculty || !selectedProgram) {
      alert('Por favor selecciona facultad y programa');
      return;
    }

    navigation.navigate('RegisterCredentials', {
      personalData,
      academicData: {
        faculty: selectedFaculty.id,
        program: selectedProgram.id,
        semester: parseInt(semestre)
      }
    });
  };

  const filteredPrograms = selectedFaculty 
    ? programs.filter(p => p.facultyId === selectedFaculty.id)
    : [];

  if (loading) {
    return (
      <AuthLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#293489" />
          <Text style={{ marginTop: 16, fontFamily: 'Montserrat-Medium' }}>Cargando datos académicos...</Text>
        </View>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Text style={styles.title}>Academico</Text>
      
      <AuthSelect 
        label="Facultad"
        iconName="bank"
        value={selectedFaculty?.name || 'Elegir Facultad'}
        onPress={() => {
          // Simple cycle logic for demo, in real app use a Picker/Modal
          const currentIndex = faculties.findIndex(f => f.id === selectedFaculty?.id);
          const nextIndex = (currentIndex + 1) % faculties.length;
          setSelectedFaculty(faculties[nextIndex]);
          setSelectedProgram(null); // Reset program when faculty changes
        }}
      />

      <AuthSelect 
        label="Programa Academico"
        iconName="book"
        value={selectedProgram?.name || 'Elegir Programa'}
        onPress={() => {
          if (!selectedFaculty) {
            alert('Primero selecciona una facultad');
            return;
          }
          const currentIndex = filteredPrograms.findIndex(p => p.id === selectedProgram?.id);
          const nextIndex = (currentIndex + 1) % filteredPrograms.length;
          setSelectedProgram(filteredPrograms[nextIndex]);
        }}
      />

      <AuthSelect 
        label="Semestre"
        iconName="numeric"
        value={semestre}
        onPress={() => {
          const next = (parseInt(semestre) % 10) + 1;
          setSemestre(String(next));
        }}
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
