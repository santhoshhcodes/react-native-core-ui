import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../../hooks/useTheme';
import {
    Screen,
    Row,
    Column,
    AppText,
    AppToggle,
    ToggleOption,
    AppTextInput,
    AppButton,
    AppSearchInput, // 👈 Imported
    AppCard        // 👈 Imported
} from '../../../components';
import { RootStackParamList } from '../../../app/navigation/types';
import { Employee, fetchMockEmployees } from '../data/mockEmployees';

type LayoutStyle = 'list' | 'grid';
type NavigationProps = StackNavigationProp<RootStackParamList, 'EmployeeDashboard'>;

const VIEW_OPTIONS: readonly ToggleOption<LayoutStyle>[] = [
    { key: 'list', label: 'List View 📋' },
    { key: 'grid', label: 'Grid View ⣿' },
];

export const EmployeeDashboard = () => {
    const { colors, spacing } = useTheme();
    const navigation = useNavigation<NavigationProps>();

    // Core Layout and Search States
    const [viewMode, setViewMode] = useState<LayoutStyle>('list');
    const [searchQuery, setSearchQuery] = useState(''); // 👈 State for AppSearchInput

    // Async Data Engine States
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchMockEmployees().then((data) => {
            setEmployees(data);
            setIsLoading(false);
        });
    }, []);

    // 🔍 Real-Time Computed Filter Engine
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveOrSubmit = () => {
        let isValid = true;

        if (!email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        if (password.length < 6) {
            setPasswordError('Password must contain at least 6 characters.');
            isValid = false;
        }

        if (isValid) {
            console.log('Form validated. Executing route step change...');
            navigation.navigate('SandboxScreen');
        }
    };

    return (
        <Screen isScrollable style={{ paddingHorizontal: 16 }}>
            <Column gap={spacing.m}>

                {/* Dashboard Header Bar */}
                <Row justify="space-between" align="center" style={{ marginTop: 16 }}>
                    <AppText variant="h2" text="Directory" />
                    <AppToggle
                        variant="compact"
                        options={VIEW_OPTIONS}
                        value={viewMode}
                        onChange={(mode) => setViewMode(mode)}
                    />
                </Row>

                {/* 🔍 Isolated Global Search Layer */}
                <AppSearchInput
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="Search employees or roles..."
                    onClear={() => console.log('Search cleared')}
                />

                {/* Conditional Layout Engine Layer */}
                {isLoading ? (
                    <View style={{ paddingVertical: 40 }}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : filteredEmployees.length === 0 ? (
                    <View style={{ paddingVertical: 32, alignItems: 'center' }}>
                        <AppText variant="body" text="No team members match your criteria." style={{ color: colors.textSecondary }} />
                    </View>
                ) : viewMode === 'list' ? (

                    // 📋 HORIZONTAL CARD LISTING (Utilizing AppCard)
                    <Column gap={spacing.s}>
                        {filteredEmployees.map((item) => (
                            <AppCard
                                key={item.id}
                                variant="default"
                                onPress={() => console.log(`Selected list card: ${item.name}`)}
                            >
                                <Row justify="flex-start" align="center">
                                    <AppText text={`${item.avatar} ${item.name}`} style={{ fontWeight: '600', marginRight: 8 }} />
                                    <AppText variant="caption" text={`• ${item.role}`} style={{ color: colors.textSecondary }} />
                                </Row>
                            </AppCard>
                        ))}
                    </Column>
                ) : (

                    // ⣿ VERTICAL GRID LAYOUT (Utilizing AppCard)
                    <Row gap={spacing.m} justify="flex-start" style={{ flexWrap: 'wrap' }}>
                        {filteredEmployees.map((item) => (
                            <AppCard
                                key={item.id}
                                variant="default"
                                onPress={() => console.log(`Selected grid card: ${item.name}`)}
                                style={{ width: '47%', marginBottom: spacing.s }}
                            >
                                <Column gap={4}>
                                    <AppText variant="h2" text={item.avatar} style={{ marginBottom: 4 }} />
                                    <AppText text={item.name} style={{ fontWeight: '600' }} />
                                    <AppText variant="caption" text={item.role} style={{ color: colors.textSecondary }} />
                                </Column>
                            </AppCard>
                        ))}
                    </Row>
                )}
            </Column>

            <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

            <AppText variant="h2" text="Forms & Fields Test" style={{ marginBottom: 12 }} />

            <Column gap={16}>
                <AppTextInput
                    label="Email Address"
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    error={emailError}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError(undefined);
                    }}
                />

                <AppTextInput
                    label="Password Entry"
                    placeholder="••••••••••••"
                    secureTextEntry
                    value={password}
                    error={passwordError}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (passwordError) setPasswordError(undefined);
                    }}
                />

                <AppButton
                    text="Validate Form"
                    onPress={handleSaveOrSubmit}
                    variant="outline"
                    style={{ borderColor: colors.error }}
                />
            </Column>
        </Screen>
    );
};