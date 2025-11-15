import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { X, Check } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../constants/theme';
import { HelpRequest } from '../types';
import { categoryIcons } from '../app/(tabs)/index';
import { categoryLabels } from '../utils/mockData';

interface NewRequestModalProps {
  visible: boolean;
  request: HelpRequest;
  onClose: () => void;
  onViewDetails: () => void;
}

export default function NewRequestModal({ visible, request, onClose, onViewDetails }: NewRequestModalProps) {
  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [visible]);

  const Icon = categoryIcons[request.category];

  return (
    <Modal visible={visible} transparent animationType="none">
      <AnimatePresence>
        {visible && (
          <View style={StyleSheet.absoluteFill}>
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
            </MotiView>
            <MotiView
              style={styles.modalContainer}
              from={{ translateY: 500 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: 500 }}
              transition={{ type: 'timing', duration: 400 }}
            >
              <View style={styles.header}>
                <MotiView
                  from={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ type: 'timing', duration: 15000, delay: 500 }}
                  style={styles.timerBar}
                />
              </View>
              <View style={styles.content}>
                <View style={styles.iconContainer}>
                  {Icon && <Icon size={32} color={colors.primary} />}
                </View>
                <Text style={styles.title}>طلب مساعدة جديد!</Text>
                <Text style={styles.category}>{categoryLabels[request.category]}</Text>
                <Text style={styles.requester}>{request.requesterName}</Text>
                <Text style={styles.distance}>يبعد عنك 2.5 كم</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.ignoreButton]} onPress={onClose}>
                    <X size={20} color={colors.textSecondary} />
                    <Text style={[styles.buttonText, styles.ignoreButtonText]}>تجاهل</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onViewDetails}>
                    <Check size={20} color="#FFFFFF" />
                    <Text style={[styles.buttonText, styles.acceptButtonText]}>عرض التفاصيل</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          </View>
        )}
      </AnimatePresence>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    height: 6,
    backgroundColor: colors.border,
  },
  timerBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  requester: {
    fontSize: 18,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Cairo_700Bold',
  },
  ignoreButton: {
    backgroundColor: colors.border,
  },
  ignoreButtonText: {
    color: colors.textSecondary,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  acceptButtonText: {
    color: '#FFFFFF',
  },
});
