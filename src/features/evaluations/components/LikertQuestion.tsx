import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LikertQuestionProps {
  id: string;
  text: string;
  options: number[]; // e.g., [0, 1, 2, 3]
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export const LikertQuestion: React.FC<LikertQuestionProps> = ({ 
  id, 
  text, 
  options, 
  selectedValue, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        <Text style={styles.questionId}>{id}. </Text>
        {text}
      </Text>
      
      <View style={styles.optionsContainer}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected
              ]}
              onPress={() => onSelect(opt)}
            >
              <Text 
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  questionText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  questionId: {
    fontFamily: 'Montserrat-Bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  optionButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#6B9EFA', // default blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#293489', // darker blue if selected
    borderWidth: 2,
    borderColor: '#1D2460',
  },
  optionText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFF',
  },
  optionTextSelected: {
    color: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAECEF',
    width: '100%',
  },
});
