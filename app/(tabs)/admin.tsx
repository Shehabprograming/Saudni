import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, AlertCircle, CheckCircle, TrendingUp, Activity, UserCheck, Shield } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { helpRequests, helpers } from '../../utils/mockData';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const activeRequests = helpRequests.filter(r => r.status === 'active').length;
  const completedRequests = helpRequests.filter(r => r.status === 'completed').length;
  const activeHelpers = helpers.filter(h => h.isActive).length;
  const successRate = ((completedRequests / helpRequests.length) * 100).toFixed(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Shield size={32} color={colors.primary} />
          <Text style={styles.headerTitle}>لوحة التحكم</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon={Users}
            label="المستخدمون"
            value={(helpers.length + 100).toString()}
            color={colors.primary}
          />
          <StatCard
            icon={AlertCircle}
            label="طلبات نشطة"
            value={activeRequests.toString()}
            color={colors.warning}
          />
          <StatCard
            icon={CheckCircle}
            label="مكتمل"
            value={completedRequests.toString()}
            color={colors.secondary}
          />
          <StatCard
            icon={TrendingUp}
            label="معدل النجاح"
            value={`${successRate}%`}
            color={colors.success}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>نظرة عامة</Text>
          <OverviewCard
            icon={UserCheck}
            title="متطوعون نشطون"
            value={activeHelpers.toString()}
            subtitle="متاحون للمساعدة الآن"
            color={colors.secondary}
          />
          <OverviewCard
            icon={Activity}
            title="نشاط اليوم"
            value="47"
            subtitle="طلب مساعدة جديد"
            color={colors.primary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إدارة سريعة</Text>
          <QuickActionCard title="إدارة المستخدمين" count="245" />
          <QuickActionCard title="إدارة الطلبات" count={helpRequests.length.toString()} />
          <QuickActionCard title="إدارة الفئات" count="6" />
          <QuickActionCard title="التقارير" count="12" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>آخر الطلبات</Text>
          {helpRequests.slice(0, 5).map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '10' }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function OverviewCard({ icon: Icon, title, value, subtitle, color }: any) {
  return (
    <View style={styles.overviewCard}>
      <View style={[styles.overviewIcon, { backgroundColor: color + '10' }]}>
        <Icon size={28} color={color} />
      </View>
      <View style={styles.overviewContent}>
        <Text style={styles.overviewTitle}>{title}</Text>
        <Text style={styles.overviewValue}>{value}</Text>
        <Text style={styles.overviewSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function QuickActionCard({ title, count }: { title: string; count: string }) {
  return (
    <TouchableOpacity style={styles.quickActionCard}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <View style={styles.quickActionBadge}>
        <Text style={styles.quickActionCount}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

function RequestItem({ request }: { request: any }) {
  const statusColors = {
    active: colors.warning,
    accepted: colors.primary,
    completed: colors.secondary,
    cancelled: colors.textSecondary,
  };

  return (
    <View style={styles.requestItem}>
      <View style={styles.requestItemContent}>
        <Text style={styles.requestItemTitle}>{request.title}</Text>
        <Text style={styles.requestItemUser}>{request.requesterName}</Text>
      </View>
      <View style={[styles.requestItemStatus, { backgroundColor: statusColors[request.status] + '20' }]}>
        <Text style={[styles.requestItemStatusText, { color: statusColors[request.status] }]}>
          {request.status === 'active' ? 'نشط' : request.status === 'completed' ? 'مكتمل' : 'جاري'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  overviewCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  overviewIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  overviewContent: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  overviewValue: {
    fontSize: 28,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  overviewSubtitle: {
    fontSize: 12,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  quickActionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
  },
  quickActionBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  quickActionCount: {
    fontSize: 14,
    fontFamily: 'Cairo_700Bold',
    color: colors.primary,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestItemContent: {
    flex: 1,
  },
  requestItemTitle: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  requestItemUser: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  requestItemStatus: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  requestItemStatusText: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
  },
});
