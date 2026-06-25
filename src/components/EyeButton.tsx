import { Ionicons } from '@expo/vector-icons';
import { Pressable, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface EyeButtonProps {
  state: boolean;
  toggle: () => void;
  style?: ViewStyle;
}

export default function EyeButton({state, toggle, style} : EyeButtonProps){
    return(
        <Pressable onPress={toggle} style={style}>
            { state ? <Ionicons name="eye" size={24} color={colors.placeholder} /> : <Ionicons name="eye-off" size={24} color={colors.placeholder} /> }
        </Pressable>

    ) 
}