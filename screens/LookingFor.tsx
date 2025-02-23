import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"

const LookingFor = () => {
    const { theme } = useTheme()
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
                            name="account-search"
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
            </View>
        </SafeAreaView>
    )
}

export default LookingFor

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
    }
})
