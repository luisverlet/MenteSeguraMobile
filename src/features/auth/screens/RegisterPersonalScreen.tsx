import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthSelect } from '../../../core/components/AuthSelect';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterPersonal'>;

export default function RegisterPersonalScreen({ navigation }: Props) {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fecha, setFecha] = useState('2000-06-17'); 
  const [genero, setGenero] = useState('Masculino');
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);

  const handleNext = () => {
    if (!nombres || !apellidos || !codigo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    navigation.navigate('RegisterAcademic', {
      personalData: {
        name: nombres,
        last_name: apellidos,
        student_code: codigo,
        birth_date: fecha,
        gender: genero
      }
    });
  };

  const handleConfirmDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFecha(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Personal</Text>
      
      <AuthInput 
        label="Nombres"
        iconName="account"
        placeholder="Tus Nombres"
        value={nombres}
        onChangeText={setNombres}
      />
      
      <AuthInput 
        label="Apellidos"
        iconName="account"
        placeholder="Tus Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />

      <AuthInput 
        label="Codigo"
        iconName="account"
        placeholder="Tu Código Universitario"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
      />

      {/* Stacking vertically to avoid overflow */}
      <AuthSelect 
        label="Género"
        iconName="account-multiple-outline"
        value={genero}
        onPress={() => setGenderModalVisible(true)}
      />

      <AuthSelect 
        label="Fecha de nacimiento"
        iconName="calendar-range"
        value={fecha}
        onPress={() => setDatePickerVisibility(true)}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        date={new Date(fecha)}
      />

      {/* Basic Modal for Gender selection */}
      <Modal visible={isGenderModalVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona Género</Text>
            {['Masculino', 'Femenino', 'Otro'].map((g) => (
              <TouchableOpacity 
                key={g} 
                style={styles.option} 
                onPress={() => {
                  setGenero(g);
                  setGenderModalVisible(false);
                }}
              >
                <Text style={[styles.optionText, genero === g && styles.selectedOption]}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  selectedOption: {
    color: '#6B9EFA',
    fontFamily: 'Montserrat-Bold',
  },
});
