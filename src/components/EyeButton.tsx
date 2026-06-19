import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

interface EyeButtonProps {
  state: boolean;
  toggle: () => void;
}

export default function EyeButton({state, toggle} : EyeButtonProps){
    return(
        <Pressable onPress={toggle}>
            { state ? <Ionicons name="eye-off" size={24} color="black" /> : <Ionicons name="eye" size={24} color="black" /> }
        </Pressable>

    ) 
}