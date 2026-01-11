// 공통 스타일 토큰
export const styles = {
  // Colors (Material Design 3)
  colors: {
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    secondary: '#625B71',
    onSecondary: '#FFFFFF',

    error: '#B3261E',
    onError: '#FFFFFF',

    surface: '#FEF7FF',
    onSurface: '#1D1B20',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',

    outline: '#79747E',
    outlineVariant: '#CAC4D0',
  },

  // Border Radius
  radius: '8px',

  // Shadow
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
} as const;

export type StyleColors = keyof typeof styles.colors;
