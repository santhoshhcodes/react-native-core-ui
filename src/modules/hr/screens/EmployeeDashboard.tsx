import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEmployeeList } from '../hooks/useEmployeeList';
import { EmployeeCard } from '../components/EmployeeCard';
import { AppFlashList } from '@/components/ui/AppFlashList';
import { useDebounce } from '@/hooks/useDebounce';
import { Screen } from '@/components/ui/Screen';
import { Employee } from '../types';

export const EmployeeDashboard: React.FC = () => {
  const [searchRaw, setSearchRaw] = useState<string>('');
  const debouncedSearch = useDebounce(searchRaw, 300);

  // ─── TESTING GATES: FORCE RE-RENDER TIMEOUTS ───────────────────────────
  const [isTestLoading, setIsTestLoading] = useState<boolean>(true);

  useEffect(() => {
    // Artificial 3-second layout lock execution
    const timer = setTimeout(() => {
      setIsTestLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Prevent memory leaks on stack pop passes
  }, []);
  // ───────────────────────────────────────────────────────────────────────

  const { employees, isLoading: isServerLoading, isError } = useEmployeeList();

  // Combine real server states with our local structural override gate
  const effectiveLoading = isServerLoading || isTestLoading;

  // Filter Pipeline
  const filteredEmployees = useMemo(() => {
    if (!debouncedSearch.trim()) return employees;
    const lower = debouncedSearch.toLowerCase();
    return employees.filter(emp =>
      emp.firstName.toLowerCase().includes(lower) ||
      emp.lastName.toLowerCase().includes(lower) ||
      emp.role.toLowerCase().includes(lower)
    );
  }, [employees, debouncedSearch]);

  // Stable Reference Render Callbacks
  const handleCardPress = useCallback((id: string) => {
    console.log(`Navigating to profile instance: ${id}`);
  }, []);

  const renderEmployeeRow = useCallback(({ item }: { item: Employee }) => (
    <EmployeeCard employee={item} onPress={handleCardPress} />
  ), [handleCardPress]);

  const keyExtractor = useCallback((item: Employee) => item.id, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>HR Directory</Text>
      </View>

      {/* Consume the Global Shared Component Cleanly */}
      <AppFlashList<Employee>
        data={filteredEmployees}
        renderItem={renderEmployeeRow}
        keyExtractor={keyExtractor}
        isLoading={effectiveLoading} // Holds the shimmer skeleton animation sequence for 3s
        isError={isError}
        loadingText="Decrypting payroll ledger indices..."
        emptyText="No employees found matching the structural parameters."
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { padding: 16, backgroundColor: '#F9FAFB', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
});