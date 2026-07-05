const lightColors = {
  primary: '#FFF',       // sfondo pagine
  primaryAction: '#6A59FA', // bottoni, spinner, tab attiva
  accent: '#6A59FA',        // bordi, bottone outline
  secondary: '#453284',     // testi titoli
  black: '#000000',         // testi normali, icone
  placeholder: '#8A8A8A',   // icone secondarie, bordi, placeholder
  error: '#C62828',         // errori, cuore preferiti
};

const darkColors = {
  primary: '#121212',       // sfondo pagine
  primaryAction: '#6A59FA', // invariato — colore di brand
  accent: '#6A59FA',        // invariato — colore di brand
  secondary: '#9D8FE8',     // testi titoli, più chiaro per contrasto
  black: '#FFFFFF',         // testi normali, icone — invertito
  placeholder: '#A0A0A0',   // leggermente più chiaro per leggibilità su scuro
  error: '#C62828',         // invariato — colore semantico
};

export type AppColors = typeof lightColors;

export const themes = {
  light: lightColors,
  dark: darkColors,
};

// Default — verrà sostituito dinamicamente da SettingsContext
export const colors = lightColors;