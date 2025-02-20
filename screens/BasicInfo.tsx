import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"

const BasicInfo = () => {
    const { theme } = useTheme()
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <View style={{ marginTop: 40 }}>
                <Text
                    style={[
                        styles.kindText,
                        {
                            color: theme.text
                        }
                    ]}
                >
                    Your're one of a kind!
                </Text>

                <Text
                    style={[
                        styles.profileText,
                        {
                            color: theme.text
                        }
                    ]}
                >
                    You're profile should be too
                </Text>
            </View>

            <View></View>
        </SafeAreaView>
    )
}

export default BasicInfo

const styles = StyleSheet.create({
    kindText: {
        fontSize: 35,
        fontFamily: fontFamily.bold,
        textAlign: "center"
    },
    profileText: {
        fontSize: 15,
        fontFamily: fontFamily.regular,
        textAlign: "center"
    }
})
