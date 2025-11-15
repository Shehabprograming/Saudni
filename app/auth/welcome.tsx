import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Heart size={80} color="#FFFFFF" fill="#FFFFFF" />
        </View>

        <Text style={styles.title}>ساعدني</Text>
        <Text style={styles.subtitle}>
          منصة ذكية لربط المحتاجين للمساعدة{'\n'}مع المتطوعين القريبين
        </Text>

        <View style={styles.features}>
          <FeatureItem text="مساعدة فورية وآمنة" />
          <FeatureItem text="متطوعون بالقرب منك" />
          <FeatureItem text="سهولة في الاستخدام" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.buttonText}>ابدأ الآن</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.dot} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Cairo_700Bold',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Cairo_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
  },
  features: {
    marginBottom: spacing.xl * 2,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginLeft: spacing.md,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: borderRadius.full,
    width: width - spacing.lg * 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: colors.primary,
  },
});
