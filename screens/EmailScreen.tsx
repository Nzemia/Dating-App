import { Image, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { Fontisto } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import CustomTextInput from "@/components/TextInput"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"
import GoNextButton from "@/components/GoNextButton"

type PasswordScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Password"
    >

const EmailScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<PasswordScreenNavigationProp>()

    const handleNext = () => {
        navigation.navigate("Password")
    }

    const [email, setEmail] = useState("")
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <View
                style={{
                    marginTop: 30,
                    marginHorizontal: 30
                }}
            >
                {/** Email and the 3 dots */}
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
                        <Fontisto
                            style={{
                                color: theme.text
                            }}
                            name="email"
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
                        styles.emailText,
                        { color: theme.text }
                    ]}
                >
                    Please provide a valid email address
                </Text>

                <Text
                    style={[
                        styles.verificationText,
                        { color: theme.text }
                    ]}
                >
                    Email verification helps us keep your
                    account secure
                </Text>

                <CustomTextInput
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoFocus={true}
                    error={
                        !email
                            ? "Email is required"
                            : undefined
                    }
                />

                <Text
                    style={[
                        styles.verificationText,
                        { color: theme.text }
                    ]}
                >
                    Note: You will be asked to verify your
                    email address after you submit this
                    form.
                </Text>

                {/** Go Next */}
                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default EmailScreen

const styles = StyleSheet.create({
    emailText: {
        fontSize: 20,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    textInputText: {
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium
    },
    verificationText: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: fontFamily.light
    }
})
