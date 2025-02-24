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
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"
import useRegistration from "@/hooks/useRegistration"
import { getRegistrationProgress } from "@/utils/RegistrationProgress"

type LookingForScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "LookingFor"
    >

const DatingType = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<LookingForScreenNavigationProp>()

    const [datingPreferences, setDatingPreferences] =
        useState<string[]>([])

    const chooseOption = (option: string) => {
        setDatingPreferences(prevPreferences => {
            if (prevPreferences.includes(option)) {
                return prevPreferences.filter(
                    item => item !== option
                )
            } else {
                return [...prevPreferences, option]
            }
        })
    }

    const { validateAndSave, error } =
        useRegistration("Dating")
    
    useEffect(() => {
        getRegistrationProgress("Dating").then(
            progressData => {
                if (progressData) {
                    setDatingPreferences(
                        progressData.datingPreferences || ""
                    )
                }
            }
        )
    }, [])

    const handleNext = async () => {
        const isValid = await validateAndSave({
            datingPreferences
        })
        if (isValid) {
            navigation.navigate("LookingFor")
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
                            name="hearto"
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
                    Who do you want to date?
                </Text>

                <Text
                    style={[
                        styles.descriptionText,
                        { color: theme.text }
                    ]}
                >
                    Select all the people you're open to
                    meeting.
                </Text>

                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "column",
                        gap: 12
                    }}
                >
                    {/** Men */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12
                        }}
                    >
                        <Text
                            style={[
                                styles.datingPreferencesText,
                                { color: theme.text }
                            ]}
                        >
                            Men
                        </Text>
                        <Pressable
                            onPress={() =>
                                chooseOption("Men")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    datingPreferences.includes(
                                        "Men"
                                    )
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** Women */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12
                        }}
                    >
                        <Text
                            style={[
                                styles.datingPreferencesText,
                                { color: theme.text }
                            ]}
                        >
                            Women
                        </Text>
                        <Pressable
                            onPress={() =>
                                chooseOption("Women")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    datingPreferences.includes(
                                        "Women"
                                    )
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** Everyone */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12
                        }}
                    >
                        <Text
                            style={[
                                styles.datingPreferencesText,
                                { color: theme.text }
                            ]}
                        >
                            Everyone
                        </Text>
                        <Pressable
                            onPress={() =>
                                chooseOption("Everyone")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    datingPreferences.includes(
                                        "Everyone"
                                    )
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
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
                </View>

                {/** check icon */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}
                >
                    <AntDesign
                        name="checkcircle"
                        size={26}
                        color={theme.text}
                    />
                    <Text
                        style={[
                            styles.visibleText,
                            {
                                color: theme.text
                            }
                        ]}
                    >
                        Visible on profile
                    </Text>
                </View>

                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default DatingType

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
    datingPreferencesText: {
        fontSize: 16,
        fontFamily: fontFamily.medium
    },
    visibleText: {
        fontSize: 15,
        fontFamily: fontFamily.regular
    },
    errorText: {
        marginTop: 10
    }
})
