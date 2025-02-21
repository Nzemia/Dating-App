import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import { useNavigation } from "expo-router"
import { RootStackParamList } from "@/configs/global"


type BasicInfoScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList, "Name">

const BasicInfo = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<BasicInfoScreenNavigationProp>()
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

            <View>
                <LottieView
                    style={{
                        height: 260,
                        width: 300,
                        alignSelf: "center",
                        marginTop: 20,
                        justifyContent: "center"
                    }}
                    source={require("../assets/love.json")}
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
                onPress={() => navigation.navigate("Name")}
            >
                <Text
                    style={[
                        styles.basicInfoText,
                        { color: theme.text }
                    ]}
                >
                    Enter Basic Info
                </Text>
            </Pressable>
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
    },
    basicInfoText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: fontFamily.bold
    }
})
