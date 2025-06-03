// Theme configuration for the application

// #region Colors
export const colors = {
  primary: {
    main: '#007AFF',
    light: '#47A3FF',
    dark: '#0055FF',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#E0E0E0',
    light: '#F5F5F5',
    dark: '#CCCCCC',
    contrast: '#333333',
  },
  error: {
    main: '#FF3B30',
    light: '#FF6B61',
    dark: '#CC2F26',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#34C759',
    light: '#5EDE7C',
    dark: '#28A147',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#FFCC00',
    light: '#FFD633',
    dark: '#CCA300',
    contrast: '#000000',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#999999',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    elevated: '#FFFFFF',
  }
};
// #endregion

// #region Typography
export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    code: '"Fira Code", "Roboto Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};
// #endregion

// #region Spacing
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};
// #endregion

// #region Theme Configuration
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
};
// #endregion

export default theme; 