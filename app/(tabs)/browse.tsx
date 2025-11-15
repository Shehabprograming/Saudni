import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { helpRequests } from '../../utils/mockData';
import HelpRequestCard from '../../components/HelpRequestCard';

type FilterType = 'latest' | 'nearest';

export default function BrowseRequestsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('latest');
  const activeRequests = helpRequests.filter(r => r.status === 'active');

  const sortedRequests = [...activeRequests].sort((a, b) => {
    if (filter === 'latest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    // Add logic for 'nearest' when location data is available
    return 0;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>تصفح الطلبات</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'latest' && styles.filterButtonActive]}
          onPress={() => setFilter('latest')}
        >
          <Text style={[styles.filterText, filter === 'latest' && styles.filterTextActive]}>الأحدث</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'nearest' && styles.filterButtonActive]}
          onPress={() => setFilter('nearest')}
        >
          <Text style={[styles.filterText, filter === 'nearest' && styles.filterTextActive]}>الأقرب</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {sortedRequests.map((request) => (
          <HelpRequestCard
            key={request.id}
            request={request}
            onPress={() => router.push(`/request-details?id=${request.id}`)}
          />
        ))}
        {sortedRequests.length === 0 && (
          <Text style={styles.noRequestsText}>لا توجد طلبات مساعدة نشطة حالياً.</Text>
        )}
      </ScrollView>
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
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.card,
  },
  filterButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: spacing.md,
  },
  noRequestsText: {
    textAlign: 'center',
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
});
