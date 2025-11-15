import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.length >= 10) {
      router.push('/auth/role-selection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>تسجيل الدخول</Text>
          <Text style={styles.subtitle}>أدخل رقم هاتفك للمتابعة</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Phone size={24} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="رقم الهاتف"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              textAlign="right"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, phone.length < 10 && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={phone.length < 10}
          >
            <Text style={styles.buttonText}>التالي</Text>
            <ArrowRight size={20} color="#FFFFFF" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.info}>
          سنرسل لك رمز التحقق عبر رسالة نصية
        </Text>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl * 2,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  form: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    marginLeft: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Cairo_600SemiBold',
    color: '#FFFFFF',
    marginLeft: spacing.sm,
  },
  buttonIcon: {
    transform: [{ scaleX: -1 }],
  },
  info: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
