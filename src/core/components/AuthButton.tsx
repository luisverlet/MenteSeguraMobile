import { TouchableOpacity, Text, StyleSheet, ViewStyle, View, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  iconName?: string;
  loading?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  style,
  iconName,
  loading = false
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
        loading && styles.disabled
      ]} 
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.innerContent}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            {iconName && (
              <MaterialCommunityIcons name={iconName} size={28} color="#FFF" style={styles.icon} />
            )}
            <Text style={styles.text}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  primary: {
    backgroundColor: '#6B9EFA',
  },
  secondary: {
    backgroundColor: '#FA6B6B',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFF',
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  disabled: {
    opacity: 0.6,
  },
});
