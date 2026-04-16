import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { AuthInput } from '../../../core/components/AuthInput';
import { AuthButton } from '../../../core/components/AuthButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../../app/navigation/RootNavigator';

type Props = NativeStackScreenProps<MainTabParamList, 'Profile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [contacto, setContacto] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleSave = () => {
    console.log('Saved profile');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Editar Perfil</Text>

            <AuthInput 
              label="Email"
              iconName="email"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <AuthInput 
              label="Contacto"
              iconName="email" // Mockup uses email icon for some reason, maybe a mistake by designer, I will use phone icon for variety but sticking to mockup is asked. Mockup has email icon on Contacto too.
              placeholder="3052013221"
              value={contacto}
              onChangeText={setContacto}
              keyboardType="phone-pad"
            />

            <AuthInput 
              label="Clave"
              iconName="key"
              placeholder="***********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              rightIconName={secureText ? "eye" : "eye-off"}
              onRightIconClick={() => setSecureText(!secureText)}
            />

            <AuthInput 
              label="Repetir Clave"
              iconName="key"
              placeholder="***********"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureConfirm}
              rightIconName={secureConfirm ? "eye" : "eye-off"}
              onRightIconClick={() => setSecureConfirm(!secureConfirm)}
            />

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
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 10,
    alignItems: 'flex-start',
  },
  iconButton: {
    padding: 4,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
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
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
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
