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
    AntDesign,
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

type TypeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Type"
>

const GenderScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<TypeScreenNavigationProp>()

    const [gender, setGender] = useState("")

    const { validateAndSave, error } =
        useRegistration("Gender")

    useEffect(() => {
        getRegistrationProgress("Gender").then(
            progressData => {
                if (progressData) {
                    setGender(progressData.gender || "")
                }
            }
        )
    }, [])

    const handleNext = async() => {
        const isValid = await validateAndSave({ gender })
        if (isValid) {
            navigation.navigate("Type")
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
                            name="gender-male-female"
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
                        styles.genderHeader,
                        { color: theme.text }
                    ]}
                >
                    What is your gender?
                </Text>

                <Text
                    style={[
                        styles.genderMoreTextDescription,
                        { color: theme.text }
                    ]}
                >
                    Users are matched based on their gender
                    groups. You can always change this
                    later.
                </Text>

                {/** Gender radios */}
                <View style={{ marginTop: 30 }}>
                    {/** Men */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                { color: theme.text }
                            ]}
                        >
                            Men
                        </Text>
                        <Pressable
                            onPress={() => setGender("Men")}
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    gender === "Men"
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
                            marginVertical: 15
                        }}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                { color: theme.text }
                            ]}
                        >
                            Women
                        </Text>
                        <Pressable
                            onPress={() =>
                                setGender("Women")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    gender === "Women"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>

                    {/** Other */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                { color: theme.text }
                            ]}
                        >
                            Non Binary
                        </Text>
                        <Pressable
                            onPress={() =>
                                setGender("Non Binary")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    gender === "Non Binary"
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

export default GenderScreen

const styles = StyleSheet.create({
    genderHeader: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    genderMoreTextDescription: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: fontFamily.light,
        textAlign: "center"
    },
    genderText: {
        fontSize: 15,
        fontFamily: fontFamily.regular
    },
    visibleText: {
        fontSize: 15,
        fontFamily: fontFamily.regular
    },
    errorText: {
        marginTop: 10
    }
})
