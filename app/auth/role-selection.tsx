import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HandHeart, UserCheck } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const handleRoleSelection = (role: 'requester' | 'helper') => {
    login('+966501234567', role);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>اختر دورك</Text>
        <Text style={styles.subtitle}>كيف تريد استخدام التطبيق؟</Text>

        <View style={styles.roles}>
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelection('requester')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <HandHeart size={48} color={colors.primary} />
            </View>
            <Text style={styles.roleTitle}>أحتاج مساعدة</Text>
            <Text style={styles.roleDescription}>
              أطلب المساعدة من المتطوعين القريبين منك
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelection('helper')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
              <UserCheck size={48} color={colors.secondary} />
            </View>
            <Text style={styles.roleTitle}>أريد المساعدة</Text>
            <Text style={styles.roleDescription}>
              كن متطوعاً وساعد الآخرين في مجتمعك
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          يمكنك تغيير دورك في أي وقت من الإعدادات
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl * 2,
  },
  roles: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  roleCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roleTitle: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
