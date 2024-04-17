import theme, { Box, Text } from "utils/theme"
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native"

type InputProps = {
    label: string
    placeholder?: string
    error?: undefined
    labelStyle?: StyleProp<TextStyle>
    inputStyle?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
} & TextInputProps

const Input  = ({label, placeholder, inputStyle, labelStyle, style}: InputProps) => {
    return (
        <Box flexDirection="column" mb="6" height={50}>
            <Text variant="textXs" textTransform="uppercase" mb="3.5" style={[labelStyle, style]}>
                {label}
            </Text>
            <TextInput
                style= {[{
                    padding: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.grey,
                    borderRadius: theme.borderRadii["rounded-2xl"],
                    height: 50,
                    width: 400
                },

                inputStyle, style
            ] }

                placeholder={placeholder}
            />
        </Box>
    )
}

export default Input