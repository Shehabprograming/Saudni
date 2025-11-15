import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../constants/theme';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated && user) {
        if (user.role === 'admin') {
          router.replace('/(tabs)/admin');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/auth/welcome');
      }
    }, 1000);
  }, [isAuthenticated, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
