import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthBackground } from '../../../core/components/AuthBackground';

const { width } = Dimensions.get('window');

export default function AppointmentsListScreen({ navigation }: any) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Mock appointments on 4th and 18th
  const appointmentDays = [4, 18];

  const handleDayPress = (day: number) => {
    if (appointmentDays.includes(day)) {
      navigation.navigate('AppointmentDetail', { date: `${day.toString().padStart(2, '0')} - 04 - 2026` });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>January 2022</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>January 2022</Text>
            <View style={styles.arrows}>
              <TouchableOpacity><MaterialCommunityIcons name="chevron-left" size={24} color="#333" /></TouchableOpacity>
              <TouchableOpacity><MaterialCommunityIcons name="chevron-right" size={24} color="#333" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysRow}>
            {days.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
          </View>

          <View style={styles.grid}>
             {Array.from({ length: 6 }).map((_, i) => <View key={`p-${i}`} style={styles.dayCell}><Text style={styles.prevMonthText}>{25 + i}</Text></View>)}
            
            {monthDays.map(d => {
              const hasAppt = appointmentDays.includes(d);
              return (
                <TouchableOpacity 
                  key={d} 
                  style={[styles.dayCell, hasAppt && styles.apptDay]}
                  onPress={() => handleDayPress(d)}
                >
                  <Text style={[styles.dayText, hasAppt && styles.apptDayText]}>{d.toString().padStart(2, '0')}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16, alignItems: 'center', flexDirection: 'row' },
  iconButton: { padding: 4 },
  headerTitle: { fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#111', marginLeft: 8 }, // Added for consistency but month is below
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  calendarCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  monthText: { fontFamily: 'Montserrat-Bold', fontSize: 20, color: '#111' },
  arrows: { flexDirection: 'row', gap: 16 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dayLabel: { fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: '#333', width: (width - 88) / 7, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayCell: { width: (width - 88) / 7, height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  dayText: { fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#333' },
  prevMonthText: { fontFamily: 'Montserrat-Medium', fontSize: 16, color: '#EEE' },
  apptDay: { backgroundColor: '#6B9EFA', borderRadius: 25, width: 40, height: 40, marginHorizontal: ((width - 88) / 7 - 40) / 2 },
  apptDayText: { color: '#FFF', fontFamily: 'Montserrat-Bold' },
});
