import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { AuthButton } from '../../../core/components/AuthButton';
import { LikertQuestion } from '../components/LikertQuestion';
import { QUESTIONNAIRES } from '../data/questionnaires';
import { EvaluacionesStackParamList } from './InstrumentsScreen'; // Assuming they are in a stack
import { useEvaluationStore } from '../../../store/evaluation/useEvaluationStore';

type Props = NativeStackScreenProps<EvaluacionesStackParamList, 'Questionnaire'>;

export default function QuestionnaireScreen({ route, navigation }: Props) {
  const { formId } = route.params;
  const form = QUESTIONNAIRES[formId];
  const markFormCompleted = useEvaluationStore(s => s.markFormCompleted);
  const setRisks = useEvaluationStore(s => s.setRisks);

  // State to hold answers
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSave = () => {
    if (!form) return;

    // Validate that all questions have been answered
    const isComplete = form.questions.every(q => answers[q.id] !== undefined);
    
    if (!isComplete) {
      Alert.alert(
        "Formulario incompleto",
        "Por favor asegúrate de contestar todas las preguntas antes de guardar."
      );
      return;
    }

    console.log(`Saved ${formId} answers:`, answers);
    markFormCompleted(formId);
    
    // Simulate risk calculation for demonstration purposes (e.g. random > 50% for testing or dynamic)
    // Actually, let's just set hardcoded mocks based on the form, or random if we need to see both states.
    // For now we'll simulate high risk to show the button if all 3 are done.
    if (formId === 'PHQ9') setRisks(60, useEvaluationStore.getState().anxietyRisk);
    if (formId === 'GAD7') setRisks(useEvaluationStore.getState().depressionRisk, 50);

    navigation.goBack();
  };

  if (!form) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{form.title}</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.description}>{form.description}</Text>
            
            <View style={styles.legendContainer}>
              <View style={styles.legendCol}>
                <Text style={styles.legendText}>{form.legend[0]}</Text>
                <Text style={styles.legendText}>{form.legend[2]}</Text>
              </View>
              <View style={styles.legendCol}>
                <Text style={styles.legendText}>{form.legend[1]}</Text>
                <Text style={styles.legendText}>{form.legend[3]}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {form.questions.map((q) => (
              <LikertQuestion
                key={q.id}
                id={q.id}
                text={q.text}
                options={form.options}
                selectedValue={answers[q.id]}
                onSelect={(val) => handleSelect(q.id, val)}
              />
            ))}

            <View style={styles.buttonContainer}>
              <AuthButton 
                title="Guardar" 
                variant="primary" 
                onPress={handleSave} 
                style={styles.saveButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
  },
  description: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#222',
    marginBottom: 16,
    lineHeight: 22,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  legendCol: {
    flex: 1,
  },
  legendText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  saveButton: {
    width: '70%',
  },
});
