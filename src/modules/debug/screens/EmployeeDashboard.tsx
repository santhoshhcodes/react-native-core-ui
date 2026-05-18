import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Screen, Row, Column, AppText, AppToggle, ToggleOption, AppTextInput } from '../../../components';

type LayoutStyle = 'list' | 'grid';

const VIEW_OPTIONS: readonly ToggleOption<LayoutStyle>[] = [
    { key: 'list', label: 'List View 📋' },
    { key: 'grid', label: 'Grid View ⣿' },
];

export const EmployeeDashboard = () => {
    const { colors, spacing } = useTheme();
    const [viewMode, setViewMode] = useState<LayoutStyle>('list');

    return (
        <Screen isScrollable style={{ paddingHorizontal: 16 }}>
            <Column gap={spacing.m} >

                {/* Dynamic Dashboard Control Bar Wrapper */}
                <Row justify="space-between" align="center">
                    <AppText variant="h2" text="Directory" />

                    {/* Reusing your exact compact toggle atom */}
                    <AppToggle
                        variant="compact"
                        options={VIEW_OPTIONS}
                        value={viewMode}
                        onChange={(mode) => setViewMode(mode)}
                    />
                </Row>

                {/* Conditional Layout Engine Layer */}
                {viewMode === 'list' ? (
                    // 📋 HORIZONTAL CARD LISTING
                    <Column gap={spacing.s}>
                        <Row justify="flex-start" style={{ backgroundColor: colors.surface, padding: spacing.m, borderRadius: 8 }}>
                            <AppText text="👤 John Doe" style={{ fontWeight: '600' }} />
                        </Row>
                        <Row justify="flex-start" style={{ backgroundColor: colors.surface, padding: spacing.m, borderRadius: 8 }}>
                            <AppText text="👤 Jane Smith" style={{ fontWeight: '600' }} />
                        </Row>
                    </Column>
                ) : (
                    // ⣿ VERTICAL GRID LAYOUT
                    <Row gap={spacing.m} justify="flex-start" style={{ flexWrap: 'wrap' }}>
                        <Column style={{ width: '47%', backgroundColor: colors.surface, padding: spacing.m, borderRadius: 8 }}>
                            <AppText text="👤 John Doe" />
                            <AppText variant="caption" text="HR Manager" />
                        </Column>
                        <Column style={{ width: '47%', backgroundColor: colors.surface, padding: spacing.m, borderRadius: 8 }}>
                            <AppText text="👤 Jane Smith" />
                            <AppText variant="caption" text="Developer" />
                        </Column>
                    </Row>
                )}

            </Column>

            <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

            <AppText variant="h2" text="Forms & Fields Test" style={{ marginBottom: 12 }} />

            <Column gap={16}>
                {/* Standard Field View */}
                <AppTextInput
                    label="Email Address"
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Field Error Validation Display State View */}
                <AppTextInput
                    label="Password Entry"
                    placeholder="••••••••••••"
                    secureTextEntry
                    error="Password must contain at least 6 characters."
                />
            </Column>
        </Screen>
    );
};