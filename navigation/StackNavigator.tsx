import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import { useTheme } from "@/constants/ThemeContext"
import HomeScreen from "@/screens/HomeScreen"
import LikeScreen from "@/screens/LikeScreen"
import ChatScreen from "@/screens/ChatScreen"
import ProfileScreen from "@/screens/ProfileScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function BottomTabs() {
    const { theme } = useTheme()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.background
                },
                tabBarActiveTintColor: theme.activeTabColor,
                tabBarInactiveTintColor:
                    theme.inactiveTabColor,
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({
                        focused,
                        color,
                        size
                    }) =>
                        focused ? (
                            <Ionicons
                                name={"home-sharp"}
                                color={color}
                                size={size}
                            />
                        ) : (
                            <Ionicons
                                name={"home-outline"}
                                color={color}
                                size={size}
                            />
                        )
                }}
            />
            <Tab.Screen
                name="Like"
                component={LikeScreen}
                options={{
                    tabBarIcon: ({
                        focused,
                        color,
                        size
                    }) =>
                        focused ? (
                            <FontAwesome
                                name={"heart"}
                                color={color}
                                size={size}
                            />
                        ) : (
                            <FontAwesome
                                name={"heart-o"}
                                color={color}
                                size={size}
                            />
                        )
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({
                        focused,
                        color,
                        size
                    }) =>
                        focused ? (
                            <MaterialCommunityIcons
                                name={"message-badge"}
                                color={color}
                                size={size}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name={
                                    "message-badge-outline"
                                }
                                color={color}
                                size={size}
                            />
                        )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({
                        focused,
                        color,
                        size
                    }) =>
                        focused ? (
                            <Ionicons
                                name={"person"}
                                color={color}
                                size={size}
                            />
                        ) : (
                            <Ionicons
                                name={"person-outline"}
                                color={color}
                                size={size}
                            />
                        )
                }}
            />
        </Tab.Navigator>
    )
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator
