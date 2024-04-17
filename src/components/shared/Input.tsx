
import { TextInput, TextInputProps } from "react-native"
import theme, { Box, Text } from "utils/theme"

type InputProps = {
    label: string
    placeholder?: string
    error?: undefined
} & TextInputProps

const Input  = ({label, placeholder}: InputProps) => {
    return (
        <Box flexDirection="column" mb="6" height={50}>
            <Text variant="textXs" textTransform="uppercase" mb="3.5">
                {label}
            </Text>
            <TextInput
                style= {{
                    padding: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.grey,
                    borderRadius: theme.borderRadii["rounded-7xl"],

                }}

            placeholder={placeholder}
            />
        </Box>
    )
}

export default Input