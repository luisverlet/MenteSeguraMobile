import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { SidebarMenu } from '../components/SidebarMenu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../../app/navigation/RootNavigator';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<MainTabParamList, 'Home'>;

const DASHBOARD_ITEMS = [
  { id: '1', title: 'Evaluacion', icon: 'file-document-outline', route: 'Evaluaciones' },
  { id: '2', title: 'Historial', icon: 'file-clock-outline', route: 'History' },
  { id: '3', title: 'Atencion', icon: 'map-marker-path', route: 'Atencion' },
  { id: '4', title: 'Citas', icon: 'calendar-month-outline', route: 'Citas' },
];

export default function DashboardScreen({ navigation }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
          <MaterialCommunityIcons name="menu" size={32} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account-circle" size={40} color="#BD0000" style={styles.avatarIcon} />
        </TouchableOpacity>
      </View>

      {/* Grid Content */}
      <View style={styles.content}>
        <View style={styles.grid}>
          {DASHBOARD_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.route as any)}
            >
              <View style={styles.itemInnerContainer}>
                <MaterialCommunityIcons name={item.icon} size={48} color="#FFF" style={styles.itemIcon} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <SidebarMenu 
        isVisible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
        onNavigate={(route) => {
          setMenuVisible(false);
          navigation.navigate(route as any);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    marginTop: 2, // Slight adjustment to center default icon
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width * 0.9,
    gap: 16,
  },
  gridItem: {
    width: (width * 0.9 - 32) / 2,
    aspectRatio: 1,
    backgroundColor: '#6B9EFA',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden', // Ensure shadow/borders are clean
  },
  itemInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 8,
  },
  itemIcon: {
    // No margins to avoid shifts
  },
  itemTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 6, // Small fixed gap between icon and text
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

