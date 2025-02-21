import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"

type EmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Email"
>

const NameScreen = () => {
    const { theme } = useTheme()
    const navigation =
        useNavigation<EmailScreenNavigationProp>()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleNext = () => {
        navigation.navigate("Email")
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <Text
                style={[
                    styles.header,
                    {
                        color: theme.text
                    }
                ]}
            >
                No Background Checks are conducted!
            </Text>

            <View
                style={{
                    marginTop: 30,
                    marginHorizontal: 20
                }}
            >
                {/** Newspaper and the 3 dots */}
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
                        <MaterialCommunityIcons
                            style={{ color: theme.text }}
                            name="newspaper-variant-multiple-outline"
                            size={27}
                        />
                    </View>

                    <Image
                        style={{ width: 100, height: 40 }}
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/128/10613/10613685.png"
                        }}
                        tintColor={theme.text}
                    />
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text
                        style={[
                            styles.nameText,
                            { color: theme.text }
                        ]}
                    >
                        What's your name?
                    </Text>

                    {/** Name */}
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: theme.text,
                                borderColor: theme.text
                            }
                        ]}
                        placeholder="Enter your first name"
                        placeholderTextColor={theme.text}
                        value={firstName}
                        onChangeText={text =>
                            setFirstName(text)
                        }
                        autoFocus={true}
                    />
                    {/** Last Name */}
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: theme.text,
                                borderColor: theme.text
                            }
                        ]}
                        placeholder="Enter your last name"
                        placeholderTextColor={theme.text}
                        value={lastName}
                        onChangeText={text =>
                            setLastName(text)
                        }
                        autoFocus={true}
                    />

                    <Text
                        style={[
                            styles.lastNameOptionalText,
                            { color: theme.text }
                        ]}
                    >
                        Last name is optional
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        marginTop: 30,
                        marginLeft: "auto"
                    }}
                    onPress={handleNext}
                >
                    <MaterialCommunityIcons
                        style={{ color: theme.text }}
                        size={26}
                        name="arrow-right-bold-circle"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NameScreen

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 13,
        fontFamily: fontFamily.light
    },
    nameText: {
        fontSize: 20,
        fontFamily: fontFamily.semiBold,
        marginTop: 10
    },
    input: {
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium
    },
    lastNameOptionalText: {
        fontSize: 12,
        marginTop: 10,
        fontFamily: fontFamily.light
    }
})
