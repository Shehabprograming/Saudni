import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';
import { HelpRequest, HelpCategory } from '../types';
import { categoryIcons } from '../app/(tabs)/index';

interface RequestCardProps {
  request: HelpRequest;
}

export default function RequestCard({ request }: RequestCardProps) {
  const Icon = categoryIcons[request.category as HelpCategory];
  const statusColors: Record<string, string> = {
    active: colors.warning,
    accepted: colors.primary,
    completed: colors.secondary,
    cancelled: colors.textSecondary,
  };
  const statusLabels: Record<string, string> = {
    active: 'نشط',
    accepted: 'جاري',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  };

  return (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.requestIcon}>
          {Icon && <Icon size={20} color={colors.primary} />}
        </View>
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>{request.title}</Text>
          <Text style={styles.requestDate}>
            {new Date(request.createdAt).toLocaleDateString('ar')}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[request.status] + '20' }]}>
          <Text style={[styles.statusText, { color: statusColors[request.status] }]}>
            {statusLabels[request.status]}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  requestDate: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
  },
});
