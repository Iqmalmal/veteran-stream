import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Box, Text} from "utils/theme/";


type ButtonProps = {
    label: string;
    onPress?: () => void;
    onLongPress?: () => void;
    disabled?: boolean;
    uppercase?: boolean;
    style?: StyleProp<ViewStyle>
    boxStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}


const Button = ({label, onLongPress, onPress, disabled, uppercase, style, boxStyle, textStyle }: ButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
        >
            <Box 
                bg={disabled ? "gray800" : "primary"}
                py="3.5"
                borderRadius="rounded-7xl"
                style={[style, boxStyle]}
            >

                <Text variant="textXs" fontWeight="700" color="white" textAlign="center" textTransform={uppercase? "uppercase" : "none"} style={[style, textStyle]}>{label}</Text>
            </Box>
        </Pressable>
    )
}

export default Button;