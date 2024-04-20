import React from "react";
import { Box, Text } from "utils/theme";
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";

type InputProps = {
    defaultValue?:string;
    label: string;
    placeholder?: string;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    hidden?: boolean;
} & TextInputProps;

const Input = React.forwardRef<TextInput, InputProps>(
    ({ defaultValue, label, placeholder, inputStyle, labelStyle, style, hidden, ...rest }, ref) => {
        if(hidden){
            return (
                <TextInput
                    ref={ref}
                    style={{ position: "absolute", left: -9999, opacity: 0 }} // Hide input from view
                    defaultValue={defaultValue}
                    {...rest}
                />
            );
        }

        return (
            <Box flexDirection="column" mb="6" height={50}>
                <Text variant="textXs" textTransform="uppercase" mb="3.5" style={[labelStyle, style]}>
                    {label}
                </Text>
                <TextInput
                    ref={ref}
                    style={[
                        {
                            padding: 16,
                            borderWidth: 1,
                            borderColor: "grey",
                            borderRadius: 8,
                            height: 50,
                            width: 400,
                        },
                        inputStyle,
                        style,
                    ]}
                    placeholder={placeholder}
                    {...rest}
                />
            </Box>
        );
    }
);

export default Input;
