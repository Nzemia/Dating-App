import React from "react"
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    TextStyle,
    View,
    Text
} from "react-native"
import { fontFamily } from "@/constants/fonts"
import { useTheme } from "@/constants/ThemeContext"

interface CustomTextInputProps extends TextInputProps {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
    style?: TextStyle
    error?: string
    label?: string
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    style,
    error,
    label,
    ...rest
}) => {
    const { theme } = useTheme()

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.text}
                style={[
                    styles.textInputText,
                    {
                        color: theme.text,
                        borderColor: error
                            ? "red"
                            : theme.text
                    },
                    style
                ]}
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
            {error && (
                <Text
                    style={{
                        color: "red",
                        fontSize: 12,
                        marginTop: 5
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textInputText: {
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium
    }
})

export default CustomTextInput
