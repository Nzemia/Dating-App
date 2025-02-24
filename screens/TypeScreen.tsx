import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import {
    FontAwesome,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import GoNextButton from "@/components/GoNextButton"
import { RootStackParamList } from "@/configs/global"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "expo-router"
import useRegistration from "@/hooks/useRegistration"
import { getRegistrationProgress } from "@/utils/RegistrationProgress"

type DatingScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Dating"
>

const TypeScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<DatingScreenNavigationProp>()

    const [type, setType] = useState("")

    const { validateAndSave, error } =
        useRegistration("Type")

    useEffect(() => {
        getRegistrationProgress("Type").then(
            progressData => {
                if (progressData) {
                    setType(progressData.type || "")
                }
            }
        )
    }, [])

    const handleNext = async () => {
        const isValid = await validateAndSave({ type })
        if (isValid) {
            navigation.navigate("Dating")
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
                        <MaterialCommunityIcons
                            style={{
                                color: theme.text
                            }}
                            name="newspaper-variant-outline"
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
                    What is your sexuality?
                </Text>

                <Text
                    style={[
                        styles.descriptionText,
                        { color: theme.text }
                    ]}
                >
                    Users are matched based on their gender
                    groups. You can always change this
                    later.
                </Text>

                {/** Type radios */}
                <View style={{ marginTop: 30, gap: 10 }}>
                    {/** Straight */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                { color: theme.text }
                            ]}
                        >
                            Straight
                        </Text>
                        <Pressable
                            onPress={() =>
                                setType("Straight")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    type === "Straight"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** Lesbian */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                { color: theme.text }
                            ]}
                        >
                            Lesbian
                        </Text>
                        <Pressable
                            onPress={() =>
                                setType("Lesbian")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    type === "Lesbian"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** BiSexual */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                { color: theme.text }
                            ]}
                        >
                            Bisexual
                        </Text>
                        <Pressable
                            onPress={() =>
                                setType("Bisexual")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    type === "Bisexual"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** Gay */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.typeText,
                                { color: theme.text }
                            ]}
                        >
                            Gay
                        </Text>
                        <Pressable
                            onPress={() => setType("Gay")}
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    type === "Gay"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                </View>
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

                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default TypeScreen

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    descriptionText: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        textAlign: "center"
    },
    typeText: {
        fontSize: 15,
        fontFamily: fontFamily.regular
    },
    errorText: {
        marginTop: 10
    }
})
