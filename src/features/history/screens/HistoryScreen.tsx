import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthBackground } from '../../../core/components/AuthBackground';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { EvaluationService } from '../../evaluations/services/EvaluationService';

const ITEMS_PER_PAGE = 5;

export default function HistoryScreen({ navigation }: any) {
  const user = useAuthStore(s => s.user);
  const [evaluations, setEvaluations] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      const studentId = user.id;
      console.log('Fetching history for studentId:', studentId);
      
      try {
        const result = await EvaluationService.getStudentEvaluations(studentId);
        console.log('History API result:', result);

        if (result.success && result.data && Array.isArray(result.data.history)) {
          const mapped = result.data.history.map((item: any, index: number) => ({
            id: String(index),
            name: `Evaluacion ${result.data.history.length - index}`,
            date: item.date 
              ? new Date(item.date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, ' - ')
              : 'Fecha N/A',
            // score: raw PHQ-9 score (0-27). Convert to percentage for the ring.
            scorePercent: Math.round(((item.score || 0) / 27) * 100),
            score: item.score || 0,
            // risk: integer category from backend (0=Bajo, 1=Moderado, 2=Alto)
            riskLevel: item.risk ?? 0,
          }));
          setEvaluations(mapped);
        } else {
          console.log('No history found or invalid format');
          setEvaluations([]);
        }
      } catch (error) {
        console.error('Error in fetchHistory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const totalPages = Math.ceil(evaluations.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = evaluations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AuthBackground />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#293489" />
          <Text style={{ marginTop: 10, fontFamily: 'Montserrat-Medium' }}>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Mis Resultados</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tableCard}>
          {evaluations.length === 0 ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={64} color="#CCC" />
              <Text style={{ fontFamily: 'Montserrat-Medium', color: '#666', marginTop: 16, textAlign: 'center' }}>
                Aún no tienes evaluaciones registradas.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Evaluacion</Text>
                <Text style={styles.headerCell}>Fecha</Text>
              </View>
              
              <View style={styles.divider} />

              <View style={styles.rowsContainer}>
                {currentItems.map((item) => (
                  <View key={item.id}>
                    <View style={styles.tableRow}>
                      <TouchableOpacity 
                        onPress={() => navigation.navigate('HistoryDetail', item)}
                      >
                        <Text style={styles.evalLink}>{item.name}</Text>
                      </TouchableOpacity>
                      <Text style={styles.dateCell}>{item.date}</Text>
                    </View>
                    <View style={styles.rowDivider} />
                  </View>
                ))}
              </View>

              {/* Pagination Selector */}
              <View style={styles.pagination}>
                <TouchableOpacity 
                  disabled={currentPage === 1}
                  onPress={() => setCurrentPage(p => p - 1)}
                >
                  <MaterialCommunityIcons 
                    name="chevron-left" 
                    size={24} 
                    color={currentPage === 1 ? "#CCC" : "#293489"} 
                  />
                </TouchableOpacity>

                <View style={styles.pageNumbers}>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <TouchableOpacity 
                      key={i} 
                      onPress={() => setCurrentPage(i + 1)}
                      style={[styles.pageButton, currentPage === i + 1 && styles.activePageButton]}
                    >
                      <Text style={[styles.pageText, currentPage === i + 1 && styles.activePageText]}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                  disabled={currentPage === totalPages}
                  onPress={() => setCurrentPage(p => p + 1)}
                >
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={24} 
                    color={currentPage === totalPages ? "#CCC" : "#293489"} 
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16 },
  iconButton: { padding: 4 },
  pageTitle: { 
    fontFamily: 'Montserrat-Bold', fontSize: 18, color: '#111', 
    marginHorizontal: 24, marginTop: 16, marginBottom: 8 
  },
  content: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  tableCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3,
  },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 8 },
  headerCell: { fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#111' },
  divider: { height: 2, backgroundColor: '#888', marginBottom: 16 },
  rowsContainer: {
    // Removed minHeight to eliminate empty space
  },
  tableRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingVertical: 26, paddingHorizontal: 8 
  },
  evalLink: { fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#6B9EFA', textDecorationLine: 'underline' },
  dateCell: { fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#111' },
  rowDivider: { height: 1, backgroundColor: '#CCC' },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12, // Reduced margin
    gap: 10,
  },
  pageNumbers: {
    flexDirection: 'row',
    gap: 12,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#EEF4FF',
  },
  pageText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#888',
  },
  activePageText: {
    fontFamily: 'Montserrat-Bold',
    color: '#293489',
  },
});
