import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const AuthBackground = () => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.backgroundColor} />
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 375 812" preserveAspectRatio="none">
        {/* Top-right curve */}
        <Path d="M150 0 C 250 150, 400 50, 450 200 C 500 350, 250 400, 375 0 Z" fill="none" stroke="#F1F3F6" strokeWidth="40" strokeLinecap="round" />
        
        {/* Middle-left curve */}
        <Path d="M -50 200 C 50 250, 150 400, -20 500 Z" fill="none" stroke="#EAECEF" strokeWidth="30" strokeLinecap="round" />
        
        {/* Bottom curve */}
        <Path d="M200 850 C 150 700, 300 650, 400 800 Z" fill="none" stroke="#F1F3F6" strokeWidth="50" strokeLinecap="round" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F9FB',
  },
});
