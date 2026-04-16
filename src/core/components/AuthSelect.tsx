import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuthSelectProps {
  label: string;
  iconName: string;
  value: string;
  onPress: () => void;
}

export const AuthSelect: React.FC<AuthSelectProps> = ({ 
  label, 
  iconName, 
  value, 
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color="#000" style={styles.leftIcon} />
      
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      
      <View style={styles.rightIcon}>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    height: 64,
  },
  leftIcon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: '#4A4A4A',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#000',
  },
  rightIcon: {
    paddingLeft: 10,
  },
});
