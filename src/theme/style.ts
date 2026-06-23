import { StyleSheet } from 'react-native';
import { colors } from './colors'

export const globalStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 40,
    paddingLeft: 20,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: colors.secondary,
    backgroundColor: colors.primary,
  },
  errorText:{
    color: colors.accent,
    
  }
});