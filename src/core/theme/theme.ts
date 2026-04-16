import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

/**
 * MenteSegura – Paleta profesional de salud mental.
 * Blues calmantes, verdes pálidos, blancos limpios.
 */
export const palette = {
  // Primary – Azul de confianza
  primary: "#3A7BD5",
  primaryContainer: "#D6E4FF",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#00286B",

  // Secondary – Verde esperanza pálido
  secondary: "#52AF88",
  secondaryContainer: "#C8EFE0",
  onSecondary: "#FFFFFF",
  onSecondaryContainer: "#00513A",

  // Tertiary – Lila suave (calma)
  tertiary: "#8B72BE",
  tertiaryContainer: "#EBDEFF",
  onTertiary: "#FFFFFF",
  onTertiaryContainer: "#250059",

  // Neutral
  background: "#F7F9FC",
  surface: "#FFFFFF",
  surfaceVariant: "#EEF3FA",
  onBackground: "#1A1C22",
  onSurface: "#1A1C22",
  onSurfaceVariant: "#45484F",

  // Utility
  error: "#D32F2F",
  errorContainer: "#FFDAD6",
  onError: "#FFFFFF",
  onErrorContainer: "#690005",
  outline: "#C5C8D2",
  outlineVariant: "#D7DAE5",

  // Extra tokens for custom use
  riskLow: "#52AF88",
  riskMedium: "#F8A100",
  riskHigh: "#E53935",
  riskCritical: "#800020",
  cardBackground: "#FFFFFF",
  divider: "#E8ECF4",
} as const;

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryContainer,
    onPrimary: palette.onPrimary,
    onPrimaryContainer: palette.onPrimaryContainer,
    secondary: palette.secondary,
    secondaryContainer: palette.secondaryContainer,
    onSecondary: palette.onSecondary,
    onSecondaryContainer: palette.onSecondaryContainer,
    tertiary: palette.tertiary,
    tertiaryContainer: palette.tertiaryContainer,
    onTertiary: palette.onTertiary,
    onTertiaryContainer: palette.onTertiaryContainer,
    background: palette.background,
    surface: palette.surface,
    surfaceVariant: palette.surfaceVariant,
    onBackground: palette.onBackground,
    onSurface: palette.onSurface,
    onSurfaceVariant: palette.onSurfaceVariant,
    error: palette.error,
    errorContainer: palette.errorContainer,
    onError: palette.onError,
    onErrorContainer: palette.onErrorContainer,
    outline: palette.outline,
    outlineVariant: palette.outlineVariant,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#A0BEF8",
    primaryContainer: "#1F4FA0",
    onPrimary: "#00286B",
    onPrimaryContainer: "#D6E4FF",
    secondary: "#7ED0AD",
    secondaryContainer: "#005140",
    onSecondary: "#00513A",
    onSecondaryContainer: "#C8EFE0",
    background: "#131620",
    surface: "#1D2130",
    onBackground: "#E2E6F0",
    onSurface: "#E2E6F0",
    error: palette.error,
  },
};
