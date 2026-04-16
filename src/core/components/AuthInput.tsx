import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuthInputProps extends TextInputProps {
  label: string;
  iconName: string;
  onRightIconClick?: () => void;
  rightIconName?: string;
  error?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({ 
  label, 
  iconName, 
  onRightIconClick, 
  rightIconName, 
  error,
  ...props 
}) => {
  return (
    <View style={[styles.container, error && styles.errorBorder]}>
      <MaterialCommunityIcons name={iconName} size={24} color="#000" style={styles.leftIcon} />
      
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
          style={styles.input} 
          placeholderTextColor="#999"
          {...props} 
        />
      </View>
      
      {rightIconName && (
        <TouchableOpacity onPress={onRightIconClick} style={styles.rightIcon}>
          <MaterialCommunityIcons name={rightIconName} size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
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
  input: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#000',
    padding: 0, // Remove default Android padding
    margin: 0,
    includeFontPadding: false,
  },
  rightIcon: {
    paddingLeft: 10,
  },
  errorBorder: {
    borderColor: '#FF5252',
    borderWidth: 2,
  },
});
