import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { AuthButton } from '../../../core/components/AuthButton';
import { useEvaluationStore } from '../../../store/evaluation/useEvaluationStore';

const { width } = Dimensions.get('window');

export default function ResultScreen({ navigation }: any) {
  const { depressionRisk, anxietyRisk } = useEvaluationStore();

  const showAppointmentButton = depressionRisk > 50 || anxietyRisk > 50;
  
  // Concentric circle settings
  const size = 200;
  const strokeWidth = 15;
  const center = size / 2;
  const radius1 = (size / 2) - strokeWidth; // Outer ring
  const radius2 = radius1 - strokeWidth - 5; // Inner ring
  
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  
  const depressionOffset = circumference1 - (depressionRisk / 100) * circumference1;
  const anxietyOffset = circumference2 - (anxietyRisk / 100) * circumference2;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ultima Evaluacion</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <Svg width={size} height={size} style={styles.svg}>
              {/* Depression Outer Ring */}
              <Circle
                cx={center}
                cy={center}
                r={radius1}
                stroke="#EAECEF"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={center}
                cy={center}
                r={radius1}
                stroke="#293489"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference1}
                strokeDashoffset={depressionOffset}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${center} ${center})`}
              />
              
              {/* Anxiety Inner Ring */}
              <Circle
                cx={center}
                cy={center}
                r={radius2}
                stroke="#EAECEF"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={center}
                cy={center}
                r={radius2}
                stroke="#6B9EFA"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference2}
                strokeDashoffset={anxietyOffset}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </Svg>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.percentageText}>{depressionRisk}%</Text>
            <Text style={styles.labelSubText}>Riesgo Depresion</Text>
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: `${depressionRisk}%` }]} />
            </View>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.percentageText}>{anxietyRisk}%</Text>
            <Text style={styles.labelSubText}>Riesgo Ansiedad</Text>
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: `${anxietyRisk}%`, backgroundColor: '#6B9EFA' }]} />
            </View>
          </View>

        </View>
        
        {showAppointmentButton && (
          <View style={styles.buttonContainer}>
            <AuthButton 
              title="Agendar" 
              variant="primary" 
              onPress={() => navigation.navigate('Atencion')} 
              style={styles.saveButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#111',
    marginLeft: 8,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
    marginBottom: 24,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '0deg' }],
  },
  resultItem: {
    marginBottom: 24,
  },
  percentageText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#293489',
    lineHeight: 36,
  },
  labelSubText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  barContainer: {
    height: 4,
    width: '60%',
    backgroundColor: '#EAECEF',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#293489',
    borderRadius: 2,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  saveButton: {
    width: '70%',
  },
});

