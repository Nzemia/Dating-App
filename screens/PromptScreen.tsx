import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { AntDesign } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"
import GoNextButton from "@/components/GoNextButton"
import {
    getRegistrationProgress,
    saveRegistrationProgress
} from "@/utils/RegistrationProgress"

type ShowPromptScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "ShowPrompt"
    >

const PromptScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<ShowPromptScreenNavigationProp>()

    const [promptData, setPromptData] = useState<any>(null)

    useEffect(() => {
        getRegistrationProgress("Prompt").then(data => {
            if (data && data.prompt) {
                setPromptData(data.prompt)
            }
        })
    }, [])

    const handleNext = async () => {
        try {
            await saveRegistrationProgress("Prompt", {
                prompt: promptData
            })
            navigation.navigate("ShowPrompt")
        } catch (error) {
            console.error("Error saving prompt:", error)
            Alert.alert(
                "Error",
                "Failed to save your prompt. Please try again."
            )
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
                    marginTop: 30,
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
                        <AntDesign
                            style={{
                                color: theme.text
                            }}
                            name="eye"
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
                        styles.headerText,
                        { color: theme.text }
                    ]}
                >
                    Write your profile answers
                </Text>

                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "column",
                        gap: 20
                    }}
                >
                    {Array.isArray(promptData) &&
                    promptData.length > 0 ? (
                        promptData.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() =>
                                    navigation.navigate(
                                        "ShowPrompt"
                                    )
                                }
                                style={{
                                    borderColor: "#707070",
                                    borderWidth: 2,
                                    justifyContent:
                                        "center",
                                    alignItems: "center",
                                    borderStyle: "dashed",
                                    borderRadius: 10,
                                    height: 70
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontStyle: "italic",
                                        fontSize: 15
                                    }}
                                >
                                    {item?.question}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontStyle: "italic",
                                        fontSize: 15,
                                        marginTop: 3
                                    }}
                                >
                                    {item?.answer}
                                </Text>
                            </Pressable>
                        ))
                    ) : (
                        <View>
                            {[
                                "Option 1",
                                "Option 2",
                                "Option 3"
                            ].map((label, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate(
                                            "ShowPrompt"
                                        )
                                    }
                                    style={{
                                        borderColor:
                                            "#707070",
                                        borderWidth: 2,
                                        justifyContent:
                                            "center",
                                        alignItems:
                                            "center",
                                        borderStyle:
                                            "dashed",
                                        borderRadius: 10,
                                        height: 70,
                                        marginVertical: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "gray",
                                            fontWeight:
                                                "600",
                                            fontStyle:
                                                "italic",
                                            fontSize: 15
                                        }}
                                    >
                                        Select a Prompt
                                    </Text>
                                    <Text
                                        style={{
                                            color: "gray",
                                            fontWeight:
                                                "600",
                                            fontStyle:
                                                "italic",
                                            fontSize: 15,
                                            marginTop: 3
                                        }}
                                    >
                                        And write your own
                                        answer
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default PromptScreen

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    }
})
