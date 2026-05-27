import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Employee } from '../types';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Row } from '@/components/layouts/Row';
import { Column } from '@/components/layouts/Column';
import { useTheme } from '@/hooks/useTheme';

interface EmployeeCardProps {
  employee: Employee;
  onPress?: (id: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onPress }) => {
  const { colors, spacing } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress(employee.id);
    }
  };

  return (
    <AppCard onPress={handlePress} style={styles.card}>
      <Row align="center" gap={spacing.s}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.background }]}>
          <AppText variant="h2" text={employee.avatar ?? '👤'} />
        </View>
        <Column style={styles.infoContainer} gap={2}>
          <AppText variant="body" text={`${employee.firstName} ${employee.lastName}`} style={styles.name} />
          <AppText variant="caption" text={employee.role} style={{ color: colors.textSecondary }} />
          {employee.department && (
            <AppText variant="caption" text={employee.department} style={[styles.deptText, { color: colors.primary }]} />
          )}
        </Column>
      </Row>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    width: 'auto',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  deptText: {
    fontWeight: '500',
    marginTop: 2,
  },
});
