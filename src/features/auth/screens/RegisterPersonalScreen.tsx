import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthLayout } from '../../../core/components/AuthLayout';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthSelect } from '../../../core/components/AuthSelect';
import { AuthButton } from '../../../core/components/AuthButton';
import { AuthStackParamList } from '../../../app/navigation/RootNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterPersonal'>;

export default function RegisterPersonalScreen({ navigation }: Props) {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fecha, setFecha] = useState('17/06/2000');

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

      <AuthSelect 
        label="Fecha de nacimiento"
        iconName="account"
        value={fecha}
        onPress={() => {
          // Open date picker simulation
          setFecha('18/06/2000');
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
          onPress={() => navigation.navigate('RegisterAcademic')} 
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
