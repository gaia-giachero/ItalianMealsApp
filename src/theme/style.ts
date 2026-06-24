import { StyleSheet } from 'react-native';
import { colors } from './colors'

export const globalStyles = StyleSheet.create({
  // View esterna che avvolge ogni schermata
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header con avatar (HomeScreen, ecc.)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // Bottone primario
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  // Testo del bottone primario
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Bottone secondario, solo bordo
  btnOutline: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  // Titolo grande
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  // Testo normale
  text: {
    fontSize: 16,
    color: colors.secondary,
  },
  // Testo di errore
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
  },
  // Campo di input
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    color: colors.secondary,
    backgroundColor: '#FFFFFF',
  },
  // Pannello/card di sfondo (es. dietro un form), più piccolo della pagina
  panel: {
    width: '92%',
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  // View centrata (loading, stati vuoti, ecc.)
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});