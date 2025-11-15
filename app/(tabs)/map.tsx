import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Navigation, MapPin } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { helpRequests, helpers } from '../../utils/mockData';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const activeRequests = helpRequests.filter(r => r.status === 'active');

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {activeRequests.map((request) => (
          <Marker
            key={request.id}
            coordinate={{
              latitude: request.location.latitude,
              longitude: request.location.longitude,
            }}
            title={request.title}
            description={request.requesterName}
            pinColor={colors.danger}
          />
        ))}

        {helpers.filter(h => h.isActive).map((helper) => (
          <Marker
            key={helper.id}
            coordinate={{
              latitude: 24.7136 + (Math.random() - 0.5) * 0.05,
              longitude: 46.6753 + (Math.random() - 0.5) * 0.05,
            }}
            title={helper.name}
            description="متطوع متاح"
            pinColor={colors.secondary}
          />
        ))}
      </MapView>

      <SafeAreaView style={styles.overlay} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>الخريطة</Text>
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheet}>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
            <Text style={styles.legendText}>طلبات المساعدة</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
            <Text style={styles.legendText}>المتطوعون</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.myLocationButton}>
          <Navigation size={24} color={colors.primary} />
          <Text style={styles.myLocationText}>موقعي الحالي</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  header: {
    backgroundColor: colors.card + 'F0',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
  },
  myLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '10',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  myLocationText: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.primary,
  },
});
