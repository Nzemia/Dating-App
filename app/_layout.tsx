import React from "react"
import { useState, useEffect } from "react"
import { View, ActivityIndicator } from "react-native"
import * as Font from "expo-font"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { fontFamily } from "@/constants/fonts"
import {
    ThemeProvider,
    useTheme
} from "@/constants/ThemeContext"

const loadFonts = async () => {
    await Font.loadAsync({
        [fontFamily.regular]: require("../assets/fonts/Outfit-Regular.ttf"),
        [fontFamily.bold]: require("../assets/fonts/Outfit-Bold.ttf"),
        [fontFamily.semiBold]: require("../assets/fonts/Outfit-SemiBold.ttf"),
        [fontFamily.light]: require("../assets/fonts/Outfit-Light.ttf"),
        [fontFamily.medium]: require("../assets/fonts/Outfit-Medium.ttf"),
        [fontFamily.extraBold]: require("../assets/fonts/Outfit-ExtraBold.ttf"),
        [fontFamily.black]: require("../assets/fonts/Outfit-Black.ttf")
    })
}

export default function Layout() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true))
    }, [])

    if (!fontsLoaded) {
        return (
            <ActivityIndicator size="large" color="black" />
        )
    }

    return (
        <ThemeProvider>
            <ThemedLayout />
        </ThemeProvider>
    )
}

function ThemedLayout() {
    const { theme } = useTheme()

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <StatusBar style={theme.statusBarStyle} />
            <Slot />
        </View>
    )
}
