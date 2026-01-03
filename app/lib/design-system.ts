// Design System - Primary Colors and Theme
// Use this file to maintain consistent colors across your entire application

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',   // Lightest blue
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main blue
    600: '#2563eb',  // Primary blue (DEFAULT)
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',  // Darkest blue
  },

  // Secondary Brand Colors (Indigo)
  secondary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  // Main indigo
    600: '#4f46e5',  // Secondary indigo (DEFAULT)
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Accent Colors (Orange for highlights)
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Main orange
    600: '#ea580c',  // Accent orange (DEFAULT)
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  // Success (Green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',  // DEFAULT
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Error (Red)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  // Main red
    600: '#dc2626',  // DEFAULT
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Warning (Yellow)
  warning: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',  // Main yellow
    600: '#ca8a04',  // DEFAULT
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Neutral Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Gradient Presets
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  primaryHover: 'hover:from-blue-700 hover:to-indigo-700',
  
  accent: 'bg-gradient-to-r from-orange-500 to-orange-600',
  accentHover: 'hover:from-orange-600 hover:to-orange-700',
  
  success: 'bg-gradient-to-r from-green-500 to-emerald-600',
  
  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
  
  hero: 'bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30',
  heroAccent: 'bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20',
};

// Button Styles
export const buttonStyles = {
  primary: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    bg-gradient-to-r from-blue-600 to-indigo-600 
    hover:from-blue-700 hover:to-indigo-700 
    text-white font-semibold rounded-xl 
    shadow-lg hover:shadow-xl 
    transition-all duration-300 
    transform hover:-translate-y-0.5
  `,
  
  accent: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    bg-gradient-to-r from-orange-500 to-orange-600 
    hover:from-orange-600 hover:to-orange-700 
    text-white font-semibold rounded-xl 
    shadow-lg hover:shadow-xl 
    transition-all duration-300 
    transform hover:-translate-y-0.5
  `,
  
  secondary: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    bg-gray-100 hover:bg-gray-200 
    text-gray-700 font-semibold rounded-xl 
    transition-all duration-300
  `,
  
  outline: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    border-2 border-blue-600 
    text-blue-600 hover:bg-blue-50 
    font-semibold rounded-xl 
    transition-all duration-300
  `,
  
  ghost: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    text-gray-700 hover:bg-gray-100 
    font-semibold rounded-xl 
    transition-all duration-300
  `,
  
  glass: `
    px-4 sm:px-6 py-2.5 sm:py-3 
    bg-white/10 backdrop-blur-md 
    border border-white/20 
    text-white hover:bg-white/20 
    font-semibold rounded-full 
    shadow-lg hover:shadow-xl 
    transition-all duration-300
  `,
};

// Badge Styles
export const badgeStyles = {
  primary: 'px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg',
  
  accent: 'px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg',
  
  success: 'px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-bold rounded-full',
  
  warning: 'px-3 py-1 bg-yellow-100 text-yellow-700 text-xs sm:text-sm font-bold rounded-full',
  
  error: 'px-3 py-1 bg-red-100 text-red-700 text-xs sm:text-sm font-bold rounded-full',
  
  glass: 'px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg',
};

// Card Styles
export const cardStyles = {
  default: 'bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100',
  
  elevated: 'bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300',
  
  glass: 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl',
  
  gradient: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-xl sm:rounded-2xl shadow-md',
};

// Text Styles
export const textStyles = {
  h1: 'text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900',
  h4: 'text-xl sm:text-2xl md:text-3xl font-bold text-gray-900',
  
  body: 'text-base sm:text-lg text-gray-700 leading-relaxed',
  bodySmall: 'text-sm sm:text-base text-gray-600',
  
  label: 'text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider',
};

// Spacing Scale
export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
};

// Shadow Scale
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: '0 0 20px rgb(59 130 246 / 0.5)',
  glowAccent: '0 0 20px rgb(249 115 22 / 0.5)',
};

// Border Radius
export const borderRadius = {
  sm: '0.375rem',   // 6px
  default: '0.5rem',  // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
};

// Animation Durations
export const transitions = {
  fast: '150ms',
  default: '300ms',
  slow: '500ms',
};

export default {
  colors,
  gradients,
  buttonStyles,
  badgeStyles,
  cardStyles,
  textStyles,
  spacing,
  shadows,
  borderRadius,
  transitions,
};
