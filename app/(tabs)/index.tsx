import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle, Car, Heart, Home, Smartphone, ShoppingCart, MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { helpRequests, categoryLabels } from '../../utils/mockData';
import { HelpCategory, HelpRequest } from '../../types';
import RequestCard from '../../components/RequestCard';
import HelpRequestCard from '../../components/HelpRequestCard';
import StatCard from '../../components/StatCard';
import NewRequestModal from '../../components/NewRequestModal';

const { width } = Dimensions.get('window');

export const categoryIcons: Record<HelpCategory, any> = {
  car_breakdown: Car,
  first_aid: Heart,
  home_repair: Home,
  tech_support: Smartphone,
  shopping: ShoppingCart,
  other: MoreHorizontal,
};

export default function IndexScreen() {
  const { user } = useAuth();
  if (!user) return null;

  return user.role === 'helper' ? <HelperHomeScreen /> : <RequesterHomeScreen />;
}

function RequesterHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleHelpRequest = (category?: HelpCategory) => {
    router.push({
      pathname: '/request-details',
      params: { mode: 'create', category: category || '' },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>مرحباً، {user?.name}</Text>
          <Text style={styles.subtitle}>كيف يمكننا مساعدتك اليوم؟</Text>
        </View>

        <View style={styles.emergencySection}>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => handleHelpRequest()}
          >
            <LinearGradient
              colors={[colors.danger, '#DC2626']}
              style={styles.emergencyGradient}
            >
              <AlertCircle size={32} color="#FFFFFF" />
              <Text style={styles.emergencyText}>أحتاج مساعدة الآن!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أنواع المساعدة</Text>
          <View style={styles.categoriesGrid}>
            {(Object.keys(categoryLabels) as HelpCategory[]).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryCard}
                  onPress={() => handleHelpRequest(category)}
                >
                  <View style={styles.categoryIcon}>
                    <Icon size={24} color={colors.primary} />
                  </View>
                  <Text style={styles.categoryText}>{categoryLabels[category]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>طلباتي الأخيرة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          {helpRequests.slice(0, 3).map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HelperHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [newRequest, setNewRequest] = useState<HelpRequest | null>(null);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        // Simulate receiving a new request
        const activeRequests = helpRequests.filter(r => r.status === 'active');
        if (activeRequests.length > 0) {
          setNewRequest(activeRequests[0]);
        }
      }, 5000); // Show modal after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isActive]);


  const activeRequests = helpRequests.filter(r => r.status === 'active');

  const handleViewDetails = (request: HelpRequest) => {
    setNewRequest(null);
    router.push(`/request-details?id=${request.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>مرحباً، {user?.name}</Text>
          <Text style={styles.subtitle}>جاهز لمساعدة الآخرين؟</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.activeToggle, isActive && styles.activeToggleOn]}
            onPress={() => setIsActive(!isActive)}
          >
            <View style={styles.activeToggleContent}>
              <View style={[styles.activeIndicator, isActive && styles.activeIndicatorOn]} />
              <Text style={[styles.activeToggleText, isActive && styles.activeToggleTextOn]}>
                {isActive ? 'متاح للمساعدة' : 'غير متاح'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <StatCard title="طلبات اليوم" value="12" color={colors.primary} />
          <StatCard title="تقييمك" value="4.9" color={colors.warning} />
          <StatCard title="مساعداتك" value={user?.totalHelps.toString() || '0'} color={colors.secondary} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>طلبات المساعدة القريبة</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          {activeRequests.slice(0, 3).map((request) => (
            <HelpRequestCard key={request.id} request={request} onPress={() => router.push(`/request-details?id=${request.id}`)} />
          ))}
          {activeRequests.length === 0 && (
            <Text style={styles.noRequestsText}>لا توجد طلبات مساعدة نشطة حالياً.</Text>
          )}
        </View>
      </ScrollView>

      {newRequest && (
        <NewRequestModal
          visible={!!newRequest}
          request={newRequest}
          onClose={() => setNewRequest(null)}
          onViewDetails={() => handleViewDetails(newRequest)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  emergencySection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  emergencyButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  emergencyText: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  activeToggle: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  activeToggleOn: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary + '10',
  },
  activeToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  activeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.textSecondary,
  },
  activeIndicatorOn: {
    backgroundColor: colors.secondary,
  },
  activeToggleText: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: colors.textSecondary,
  },
  activeToggleTextOn: {
    color: colors.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  noRequestsText: {
    textAlign: 'center',
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
});
