import { Image, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CustomTextInput from "@/components/TextInput"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"


type PhotosScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Photos"
    >

const HomeTown = () => {
    const { theme } = useTheme()

  const [homeTown, setHomeTown] = useState("")
  
    const navigation =
        useNavigation<PhotosScreenNavigationProp>()

  const handleNext = () => {
      navigation.navigate("Photos")
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
                            name="home-map-marker"
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
                    Where do you come from?
                </Text>

                <CustomTextInput
                    placeholder="Hometown"
                    value={homeTown}
                    placeholderTextColor={theme.text}
                    onChangeText={setHomeTown}
                    autoFocus={true}
                />

                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default HomeTown

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    }
})
