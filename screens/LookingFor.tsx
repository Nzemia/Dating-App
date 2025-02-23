import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import {
    AntDesign,
    FontAwesome,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import GoNextButton from "@/components/GoNextButton"
import { RootStackParamList } from "@/configs/global"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "expo-router"


type HomeTownScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "HomeTown"
    >


const LookingFor = () => {
  const { theme } = useTheme()
  
  const navigation =
    useNavigation<HomeTownScreenNavigationProp>()

  const [lookingFor, setLookingFor] = useState("")
  
  const handleNext = () => { 
    navigation.navigate("HomeTown")
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
                    What's your dating intention?
                </Text>

                {/** INTENTIONS */}
                <View
                    style={{
                        marginTop: 30,
                        gap: 12,
                        flexDirection: "column"
                    }}
                >
                    {/** Life Partner */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Life Partner
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor(
                                    "Life Partner"
                                )
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Life Partner"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>

                    {/** Long term relationship */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Long-term relationship
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor(
                                    "Long-term relationship"
                                )
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Long-term relationship"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                    {/** Long-term relationship open to short */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Long-term relationship open to
                            short
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor(
                                    "Long-term relationship open to short"
                                )
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Long-term relationship open to short"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>

                    {/** Short-term relationship open to long */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Short-term relationship open to
                            long
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor(
                                    "Short-term relationship open to long"
                                )
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Short-term relationship open to long"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>

                    {/** Short-term relationship  */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Short-term relationship
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor(
                                    "Short-term relationship"
                                )
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Short-term relationship"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>

                    {/** Not sure  */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[
                                styles.lifePartnerText,
                                { color: theme.text }
                            ]}
                        >
                            Not sure
                        </Text>
                        <Pressable
                            onPress={() =>
                                setLookingFor("Not sure")
                            }
                        >
                            <FontAwesome
                                name="circle"
                                size={26}
                                color={
                                    lookingFor ===
                                    "Not sure"
                                        ? theme.text
                                        : theme.secondaryText
                                }
                            />
                        </Pressable>
                    </View>
                </View>

                {/** check icon */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}
                >
                    <AntDesign
                        name="checkcircle"
                        size={26}
                        color={theme.text}
                    />
                    <Text
                        style={[
                            styles.visibleText,
                            {
                                color: theme.text
                            }
                        ]}
                    >
                        Visible on profile
                    </Text>
                </View>

                <GoNextButton onPress={handleNext} />
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
    lifePartnerText: {
        fontSize: 16,
        fontFamily: fontFamily.medium
    },
    visibleText: {
        fontSize: 15,
        fontFamily: fontFamily.regular
    }
})
