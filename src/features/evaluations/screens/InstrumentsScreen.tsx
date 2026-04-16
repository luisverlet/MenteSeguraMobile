import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { useEvaluationStore } from '../../../store/evaluation/useEvaluationStore';

export type EvaluacionesStackParamList = {
  InstrumentsList: undefined;
  Questionnaire: { formId: string };
  Result: undefined;
};
type Props = NativeStackScreenProps<EvaluacionesStackParamList, 'InstrumentsList'>;

const INSTRUMENTS = [
  { id: 'PHQ9', title: 'PHQ9', desc: '9 preguntas\ncon escala\nLikert de 0 a 3', icon: 'file-document-outline' },
  { id: 'GAD7', title: 'GAD7', desc: '7 preguntas\ncon escala\nLikert de 0 a 3', icon: 'file-document-outline' },
  { id: 'Variables', title: 'Variables', desc: 'Preguntas y\ndatos\npertinentes', icon: 'file-document-outline' },
];

export default function InstrumentsScreen({ navigation }: Props) {
  const completedForms = useEvaluationStore(s => s.completedForms);
  const allCompleted = completedForms.includes('PHQ9') && completedForms.includes('GAD7') && completedForms.includes('Variables');

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as any)} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {INSTRUMENTS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Questionnaire', { formId: item.id })}
          >
            <View style={styles.leftCol}>
              <MaterialCommunityIcons name={item.icon} size={40} color="#FFF" />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {allCompleted && (
          <TouchableOpacity 
            style={[styles.card, styles.resultCard]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Result')}
          >
            <View style={styles.leftCol}>
              <MaterialCommunityIcons name="chart-pie" size={40} color="#FFF" />
              <Text style={styles.cardTitleSmall}>Resultado</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.cardDesc}>Resultado de riesgo</Text>
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 10,
    alignItems: 'flex-start',
  },
  iconButton: {
    padding: 4,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    paddingBottom: 40, // extra padding to balance with header
  },
  card: {
    backgroundColor: '#6B9EFA',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftCol: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
    marginRight: 16,
    paddingRight: 16,
  },
  rightCol: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFF',
    marginTop: 8,
    textAlign: 'center',
  },
  cardTitleSmall: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#FFF',
    marginTop: 8,
    textAlign: 'center',
  },
  cardDesc: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#FFF',
    lineHeight: 22,
  },
  resultCard: {
    backgroundColor: '#293489', // Use the dark blue for final result highlighting
    marginTop: 16,
  },
});
