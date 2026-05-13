import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { AuthButton } from '../../../core/components/AuthButton';
import { useEvaluationStore } from '../../../store/evaluation/useEvaluationStore';

// Same risk derivation as HistoryDetailScreen
const getRiskFromScore = (score: number): { label: string; color: string; emoji: string } => {
  if (score <= 4)  return { label: 'Riesgo Mínimo',   color: '#4CAF50', emoji: '🟢' };
  if (score <= 9)  return { label: 'Riesgo Leve',     color: '#FFC107', emoji: '🟡' };
  if (score <= 14) return { label: 'Riesgo Moderado', color: '#FF9800', emoji: '🟠' };
  if (score <= 19) return { label: 'Riesgo Alto',     color: '#F44336', emoji: '🔴' };
  return                  { label: 'Riesgo Severo',   color: '#B71C1C', emoji: '🔴' };
};

export default function ResultScreen({ navigation }: any) {
  const { lastScore: score, lastScorePercent: scorePercent } = useEvaluationStore();

  const riskInfo = getRiskFromScore(score);
  const showAppointmentButton = score > 14; // Moderate-severe or above

  // SVG ring settings
  const size = 200;
  const strokeWidth = 16;
  const center = size / 2;
  const radius = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const ringOffset = circumference - (scorePercent / 100) * circumference;

  // Format today's date
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, '0')} - ${(today.getMonth() + 1).toString().padStart(2, '0')} - ${today.getFullYear()}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultado de Evaluación</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Risk level badge */}
          <View style={[styles.riskBadge, { backgroundColor: riskInfo.color + '15', borderColor: riskInfo.color }]}>
            <Text style={[styles.riskBadgeText, { color: riskInfo.color }]}>{riskInfo.emoji}  {riskInfo.label}</Text>
          </View>

          {/* Ring chart showing score percentage */}
          <View style={styles.chartContainer}>
            <Svg width={size} height={size}>
              <Circle
                cx={center} cy={center} r={radius}
                stroke="#EAECEF" strokeWidth={strokeWidth} fill="none"
              />
              <Circle
                cx={center} cy={center} r={radius}
                stroke={riskInfo.color} strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round" fill="none"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </Svg>
            <View style={styles.chartCenter}>
              <Text style={[styles.percentText, { color: riskInfo.color }]}>{scorePercent}%</Text>
              <Text style={styles.chartSubLabel}>PHQ-9</Text>
            </View>
          </View>

          {/* Score detail row */}
          <View style={styles.detailRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{score}</Text>
              <Text style={styles.detailLabel}>Puntaje total</Text>
              <Text style={styles.detailLabelSub}>(máx 27)</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailBox}>
              <Text style={[styles.detailValue, { color: riskInfo.color }]}>{riskInfo.label}</Text>
              <Text style={styles.detailLabel}>Nivel de riesgo</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.barSection}>
            <Text style={styles.barTitle}>Porcentaje de puntaje máximo PHQ-9</Text>
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: `${scorePercent}%`, backgroundColor: riskInfo.color }]} />
            </View>
            <Text style={styles.barLabel}>{scorePercent}% del máximo posible</Text>
          </View>

          {/* Date */}
          <Text style={styles.dateLabel}>Evaluación realizada el {dateStr}</Text>
        </View>

        {showAppointmentButton && (
          <View style={styles.buttonContainer}>
            <AuthButton 
              title="Agendar cita" 
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
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 24,
  },
  riskBadge: {
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 28,
    alignSelf: 'center',
  },
  riskBadgeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  chartContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    alignSelf: 'center',
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    lineHeight: 40,
  },
  chartSubLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    alignItems: 'center',
  },
  detailBox: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#DDDFE3',
  },
  detailValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#293489',
    marginBottom: 6,
    textAlign: 'center',
  },
  detailLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  detailLabelSub: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: '#AAA',
    textAlign: 'center',
  },
  barSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  barTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  barContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#EAECEF',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  barLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  dateLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  saveButton: {
    width: '70%',
  },
});
