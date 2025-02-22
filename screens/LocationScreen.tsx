import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useTheme } from "@/constants/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"

const LocationScreen = () => {
    const { theme } = useTheme()
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        ></SafeAreaView>
    )
}

export default LocationScreen

const styles = StyleSheet.create({})
