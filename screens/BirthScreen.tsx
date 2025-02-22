import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import React, { useRef, useState } from "react"
import { useTheme } from "@/constants/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"

type LocationScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Location"
    >

const BirthScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<LocationScreenNavigationProp>()

    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const monthRef = useRef<TextInput>(null)
    const yearRef = useRef<TextInput>(null)

    const handleDayChange = (text: string) => {
        setDay(text)
        if (text.length === 2) {
            monthRef.current?.focus()
        }
    }

    const handleMonthChange = (text: string) => {
        setMonth(text)
        if (text.length === 2) {
            yearRef.current?.focus()
        }
    }

    const handleYearChange = (text: string) => {
        setYear(text)
    }

    const handleNext = () => {
        navigation.navigate("Location")
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
                {/** Calendar and the 3 dots */}
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
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20,
                        gap: 40
                    }}
                >
                    {/** Day */}
                    <TextInput
                        placeholder="DD"
                        placeholderTextColor={theme.text}
                        maxLength={2}
                        value={day}
                        onChangeText={handleDayChange}
                        autoFocus={true}
                        keyboardType="numeric"
                        style={[
                            styles.textInputDayText,
                            {
                                color: theme.text,
                                borderColor: theme.text,
                                fontSize: day ? 18 : 18
                            }
                        ]}
                    />

                    {/** Month */}
                    <TextInput
                        placeholder="MM"
                        placeholderTextColor={theme.text}
                        maxLength={2}
                        value={month}
                        ref={monthRef}
                        onChangeText={handleMonthChange}
                        autoFocus={true}
                        keyboardType="numeric"
                        style={[
                            styles.textInputMonthText,
                            {
                                color: theme.text,
                                borderColor: theme.text,
                                fontSize: month ? 18 : 18
                            }
                        ]}
                    />
                    {/** Year */}
                    <TextInput
                        placeholder="YYYY"
                        placeholderTextColor={theme.text}
                        maxLength={4}
                        value={year}
                        ref={yearRef}
                        onChangeText={handleYearChange}
                        autoFocus={true}
                        keyboardType="numeric"
                        style={[
                            styles.textInputYearText,

                            {
                                color: theme.text,
                                borderColor: theme.text,
                                fontSize: year ? 20 : 20
                            }
                        ]}
                    />
                </View>

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
    textInputDayText: {
        width: 50,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium,
        //fontSize: 12,
        textAlign: "center"
    },
    textInputMonthText: {
        width: 50,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium,
        //fontSize: 20,
        textAlign: "center"
    },
    textInputYearText: {
        width: 70,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontFamily: fontFamily.medium,
        //fontSize: 20,
        textAlign: "center"
    }
})
