import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "@/constants/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"
import useRegistration from "@/hooks/useRegistration"
import Calendar from "@/components/Calendar"

type LocationScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Location"
    >

const BirthScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<LocationScreenNavigationProp>()

    const [dateOfBirth, setDateOfBirth] = useState<
        string | null
    >(null)
    const { validateAndSave, error } =
        useRegistration("Birth")

    const handleNext = async () => {
        if (dateOfBirth) {
            const isValid = await validateAndSave({
                dateOfBirth
            })
            if (isValid) {
                navigation.navigate("Location")
            }
        } else {
            Alert.alert(
                "Error",
                "Please select a valid date of birth."
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
                        <MaterialCommunityIcons
                            style={{
                                color: theme.text
                            }}
                            name="calendar-month"
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
                        styles.dateText,
                        { color: theme.text }
                    ]}
                >
                    What's your date of birth?
                </Text>

                {/** Dates */}
                <Calendar
                    onDateChange={date =>
                        setDateOfBirth(date)
                    }
                    initialDate={dateOfBirth || undefined}
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

                {/** Go Next */}
                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default BirthScreen

const styles = StyleSheet.create({
    dateText: {
        fontSize: 20,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    errorText: {
        marginTop: 10
    }
})
