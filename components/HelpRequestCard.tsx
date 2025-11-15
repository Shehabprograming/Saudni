import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';
import { HelpRequest, HelpCategory } from '../types';
import { categoryIcons } from '../app/(tabs)/index';

interface HelpRequestCardProps {
  request: HelpRequest;
  onPress: () => void;
}

export default function HelpRequestCard({ request, onPress }: HelpRequestCardProps) {
  const Icon = categoryIcons[request.category as HelpCategory];
  const timeDiff = Math.floor((Date.now() - new Date(request.createdAt).getTime()) / 60000);

  return (
    <TouchableOpacity style={styles.helpRequestCard} onPress={onPress}>
      <View style={styles.helpRequestHeader}>
        <View style={styles.helpRequestIcon}>
          {Icon && <Icon size={24} color={colors.primary} />}
        </View>
        <View style={styles.helpRequestInfo}>
          <Text style={styles.helpRequestTitle}>{request.title}</Text>
          <Text style={styles.helpRequestRequester}>{request.requesterName}</Text>
          <Text style={styles.helpRequestLocation}>{request.location.address}</Text>
        </View>
        <View style={styles.helpRequestTime}>
          <Text style={styles.timeText}>{timeDiff} د</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  helpRequestCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  helpRequestHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  helpRequestIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  helpRequestInfo: {
    flex: 1,
  },
  helpRequestTitle: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  helpRequestRequester: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  helpRequestLocation: {
    fontSize: 12,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  helpRequestTime: {
    backgroundColor: colors.warning + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.warning,
  },
});
