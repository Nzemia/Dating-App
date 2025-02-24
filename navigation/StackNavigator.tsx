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
import BasicInfo from "@/screens/BasicInfo"
import NameScreen from "@/screens/NameScreen"
import EmailScreen from "@/screens/EmailScreen"
import PasswordScreen from "@/screens/PasswordScreen"
import BirthScreen from "@/screens/BirthScreen"
import GenderScreen from "@/screens/GenderScreen"
import LocationScreen from "@/screens/LocationScreen"
import TypeScreen from "@/screens/TypeScreen"
import DatingType from "@/screens/DatingType"
import LookingFor from "@/screens/LookingFor"
import PhotosScreen from "@/screens/PhotosScreen"
import PromptScreen from "@/screens/PromptScreen"
import ShowPrompt from "@/screens/ShowPrompt"
import PreFinalScreen from "@/screens/PreFinalScreen"
import HomeTown from "@/screens/HomeTown"

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

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Basic"
                component={BasicInfo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Name"
                component={NameScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Email"
                component={EmailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Password"
                component={PasswordScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Birth"
                component={BirthScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Location"
                component={LocationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Gender"
                component={GenderScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Type"
                component={TypeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Dating"
                component={DatingType}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LookingFor"
                component={LookingFor}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeTown"
                component={HomeTown}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Photos"
                component={PhotosScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Prompt"
                component={PromptScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ShowPrompt"
                component={ShowPrompt}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PreFinal"
                component={PreFinalScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={AuthStack}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
                name="PreFinal"
                component={PreFinalScreen}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    )
}

export default StackNavigator
