import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, Row, Column, AppText, AppToggle, ToggleOption, AppButton } from '../../../components';
import { useTheme } from '../../../hooks/useTheme';
import { RootStackParamList, AppNavigationProp } from '../../../app/navigation/types';

type ThemeType = 'system' | 'light' | 'dark';
type NavigationProps = AppNavigationProp<'SandboxScreen'>;

const THEME_OPTIONS: readonly ToggleOption<ThemeType>[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export const AdvancedSettingsItem = () => {
  const { colors, themeMode, setThemeMode } = useTheme();

  return (
    <Row
      justify="space-between"
      align="center"
      style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}
    >
      <Column gap={4} style={{ flex: 1, paddingRight: 12 }}>
        <AppText variant="body" text="Interface Theme" style={{ fontWeight: '600' }} />
        <AppText variant="caption" text="Personalize app color workspace preferences." style={{ color: colors.textSecondary }} />
      </Column>

      <AppToggle
        variant="compact"
        options={THEME_OPTIONS}
        value={themeMode}
        onChange={(mode) => setThemeMode(mode)}
      />
    </Row>
  );
};

export const SandboxScreen = () => {
  const { colors, themeMode, setThemeMode } = useTheme();
  const navigation = useNavigation<NavigationProps>(); // 👈 Extract Navigation Context

  return (
    <Screen isScrollable style={{ paddingHorizontal: 16 }}>

      {/* 🛠️ Custom Top Context Navigation Header Block */}
      <Row justify="space-between" align="center" style={{ marginVertical: 16 }}>
        <AppButton
          text="← Back"
          onPress={() => navigation.goBack()} // 👈 Pops screen off stack fluidly
          variant="outline"
          style={{ paddingVertical: 4, paddingHorizontal: 12, height: 36 }}
        />
        <AppText variant="h2" text="System Sandbox" />
        <View style={{ width: 75 }} /> {/* Visual alignment spacer to counterbalance back button width */}
      </Row>

      <View style={{ height: 1, backgroundColor: colors.border, marginBottom: 20 }} />

      {/* 1. Testing Typography Variants */}
      <AppText variant="h1" text="Typography Test" style={{ marginBottom: 20 }} />
      <AppText variant="h1" text="Heading 1" />
      <AppText variant="h2" text="Heading 2" />
      <AppText variant="body" text="This is standard body text." />
      <AppText variant="caption" text="This is a small caption." />

      <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

      {/* 2. Testing Localization (Tamil/English) */}
      <AppText variant="h2" text="Localization Test" style={{ marginBottom: 12 }} />
      <AppText tx="common.welcome" variant="body" />

      <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

      {/* 3. Testing Settings-Style Component (Row / Column Layout) */}
      <AppText variant="h2" text="Settings Row UI Test" style={{ marginBottom: 8 }} />
      <AdvancedSettingsItem />

      <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

      {/* 4. Testing Full Width Block Component */}
      <AppText variant="h2" text="Theme Selection Test (Full-Width)" style={{ marginBottom: 12 }} />

      <AppToggle
        options={THEME_OPTIONS}
        value={themeMode}
        onChange={(selectedTheme) => setThemeMode(selectedTheme)}
        containerStyle={{
          marginHorizontal: 20,
          padding: 3,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 14,
          minHeight: 38,
        }}
        tabStyle={{
          paddingVertical: 6,
          borderRadius: 10,
        }}
        activeTabStyle={{
          backgroundColor: colors.background,
          borderRadius: 10,
        }}
        textStyle={{
          fontSize: 12,
        }}
        activeTextStyle={{
          color: colors.textPrimary,
          fontWeight: '700',
          fontSize: 12,
        }}
      />

      <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />

      {/* 5. Testing Buttons */}
      <AppText variant="h2" text="Buttons Test" style={{ marginBottom: 12 }} />

      <AppButton variant="primary" text="Primary Button" />

      <AppButton
        variant="secondary"
        text="Secondary Button"
        style={{ marginTop: 12 }}
      />

      <AppButton
        variant="outline"
        text="Outline Button"
        style={{ marginTop: 12 }}
      />

      <AppButton loading text="Loading..." style={{ marginTop: 12 }} />

      <AppButton
        disabled
        text="Disabled Button"
        style={{ marginTop: 12, marginHorizontal: 60 }}
      />

      <View style={{ height: 2, backgroundColor: colors.border, marginVertical: 20 }} />
    </Screen>
  );
};