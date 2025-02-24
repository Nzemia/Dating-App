import { Image, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useTheme } from "@/constants/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Entypo } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import CustomTextInput from "@/components/TextInput"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"
import {
    getRegistrationProgress,
    saveRegistrationProgress
} from "@/utils/RegistrationProgress"
import useRegistration from "@/hooks/useRegistration"

type BirthScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Password"
>

const PasswordScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<BirthScreenNavigationProp>()

    const [password, setPassword] = useState("")

    const { validateAndSave, error } =
        useRegistration("Password")

    useEffect(() => {
        getRegistrationProgress("Password").then(
            progressData => {
                if (progressData) {
                    setPassword(progressData.password || "")
                }
            }
        )
    }, [])

    const handleNext = async () => {
        const isValid = await validateAndSave({ password })
        if (isValid) {
            navigation.navigate("Birth")
        }
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <View
                style={{
                    marginTop: 40,
                    marginHorizontal: 30
                }}
            >
                {/** Icon and the 3 dots */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            borderWidth: 2,
                            borderColor: theme.text,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Entypo
                            style={{
                                color: theme.text
                            }}
                            name="lock"
                            size={27}
                        />
                    </View>

                    <Image
                        style={{
                            width: 100,
                            height: 40
                        }}
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/128/10613/10613685.png"
                        }}
                        tintColor={theme.text}
                    />
                </View>

                <Text
                    style={[
                        styles.passwordText,
                        { color: theme.text }
                    ]}
                >
                    Please enter your password
                </Text>

                <CustomTextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    autoFocus={true}
                    secureTextEntry={true}
                />

                {error && (
                    <Text
                        style={[
                            styles.errorText,
                            { color: "red" }
                        ]}
                    >
                        {error}
                    </Text>
                )}

                <Text
                    style={[
                        styles.noteText,
                        { color: theme.text }
                    ]}
                >
                    Note: Your details will be safe with us
                </Text>

                {/** Go Next */}
                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default PasswordScreen

const styles = StyleSheet.create({
    passwordText: {
        fontSize: 25,
        marginTop: 8,
        fontFamily: fontFamily.bold,
        textAlign: "center"
    },
    noteText: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: fontFamily.light
    },
    errorText: {
        marginTop: 10
    }
})
