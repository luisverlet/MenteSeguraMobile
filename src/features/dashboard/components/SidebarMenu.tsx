import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../../store/auth/useAuthStore';

const { width, height } = Dimensions.get('window');

interface SidebarMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ isVisible, onClose, onNavigate }) => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.sidebar}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate?.('Profile')}>
              <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { logout(); onClose(); }}>
              <Text style={styles.menuText}>Cerrar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 100,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sidebar: {
    width: width * 0.6,
    height: '100%',
    backgroundColor: '#F8F9FA',
    borderRightWidth: 1,
    borderRightColor: '#EAECEF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#6B9EFA',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  menuText: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFF',
    fontSize: 14,
  },
});
