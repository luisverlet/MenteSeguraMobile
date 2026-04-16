import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { AuthButton } from '../../../core/components/AuthButton';

const { width } = Dimensions.get('window');

export default function AppointmentDetailScreen({ route, navigation }: any) {
  const { date } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fecha Confirmada</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.dateText}>{date}</Text>
          
          <View style={styles.infoWrapper}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Ruta de atencion:</Text> Primer piso, oficina de Bienestar estudiantil
            </Text>
          </View>
        </View>

        <AuthButton 
          title="Cancelar Cita" 
          variant="secondary" 
          onPress={() => {
            console.log('Cancelled');
            navigation.goBack();
          }} 
          style={{ width: '70%' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16, alignItems: 'center', flexDirection: 'row' },
  iconButton: { padding: 4 },
  headerTitle: { fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#111', marginLeft: 8, flex: 1, textAlign: 'center', marginRight: 48 },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 40, width: '100%', marginBottom: 40,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
    justifyContent: 'center', alignItems: 'center', minHeight: 400,
  },
  dateText: { fontFamily: 'Montserrat-Bold', fontSize: 32, color: '#111', marginBottom: 60 },
  infoWrapper: { width: '100%', alignItems: 'center' },
  infoText: { fontFamily: 'Montserrat-Regular', fontSize: 18, color: '#333', textAlign: 'center', lineHeight: 28 },
  bold: { fontFamily: 'Montserrat-Bold' },
});
