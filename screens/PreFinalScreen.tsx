import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import LottieView from "lottie-react-native"
import { fontFamily } from "@/constants/fonts"

const PreFinalScreen = () => {
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
                    All set up!
                </Text>

                <Text
                    style={[
                        styles.profileText,
                        {
                            color: theme.text
                        }
                    ]}
                >
                    Setting up your profile for you
                </Text>
            </View>

            <View>
                <LottieView
                    style={{
                        height: 260,
                        width: 300,
                        alignSelf: "center",
                        marginTop: 20,
                        justifyContent: "center"
                    }}
                    source={require("../assets/popup.json")}
                    autoPlay
                    loop={true}
                    speed={0.7}
                />
            </View>

            <Pressable
                style={{
                    backgroundColor: "#900C",
                    padding: 15,
                    marginTop: "auto"
                }}
            >
                <Text
                    style={[
                        styles.basicInfoText,
                        { color: theme.text }
                    ]}
                >
                    Finish Registering
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default PreFinalScreen

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
    },
    basicInfoText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: fontFamily.bold
    }
})
