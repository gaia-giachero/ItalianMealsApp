const lightColors = {
  primary: '#FFF',       // sfondo pagine
  primaryAction: '#007C60', // bottoni, spinner, tab attiva
  accent: '#007C60',        // bordi, bottone outline
  secondary: '#006B51',     // testi titoli
  black: '#000000',         // testi normali, icone
  placeholder: '#8A8A8A',   // icone secondarie, bordi, placeholder
  error: '#C62828',         // errori, cuore preferiti
};

const darkColors = {
  primary: '#121212',       // sfondo pagine
  primaryAction: '#007C60', // invariato — colore di brand
  accent: '#007C60',        // invariato — colore di brand
  secondary: '#00A28A',     // testi titoli
  black: '#FFFFFF',         // testi normali, icone
  placeholder: '#A0A0A0',   // icone secondarie, bordi, placeholder
  error: '#C62828',         // errori, cuore preferiti
};

export type AppColors = typeof lightColors;

export const themes = {
  light: lightColors,
  dark: darkColors,
};

// Default — verrà sostituito dinamicamente da SettingsContext
export const colors = lightColors;
