import {
    ActivityIndicator,
    Button,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import {
    EvilIcons,
    MaterialIcons
} from "@expo/vector-icons"
import CustomTextInput from "@/components/TextInput"
import GoNextButton from "@/components/GoNextButton"
import { RootStackParamList } from "@/configs/global"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "expo-router"

type PromptScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Prompt"
    >

const PhotosScreen = () => {
  const { theme } = useTheme()
  
  const navigation = useNavigation<PromptScreenNavigationProp>()

    const [imageUrls, setImageUrls] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        ""
    ])

    const [imageUrl, setImageUrl] = useState("")

    const [loading, setLoading] = useState(false)

    const handleAddImage = () => {
        setLoading(true)
        //find the first empty slot in the array
        const index = imageUrls.findIndex(url => url === "")

        if (index !== -1) {
            const updatedImageUrls = [...imageUrls]
            updatedImageUrls[index] = imageUrl
            setImageUrls(updatedImageUrls)
            setImageUrl("")
            setLoading(false)
        }
    }

  const handleNext = () => {
      navigation.navigate("Prompt")
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <ScrollView
                contentContainerStyle={[
                    {
                        backgroundColor: theme.background
                    }
                ]}
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
                            <MaterialIcons
                                style={{
                                    color: theme.text
                                }}
                                name="add-to-photos"
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
                        Pick your photos and videos
                    </Text>

                    <Text
                        style={[
                            styles.addPhotosText,
                            { color: theme.text }
                        ]}
                    >
                        Add four to six photos
                    </Text>

                    {/** Image picker */}
                    <View style={{ marginTop: 20 }}>
                        {/** 0-3 images */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent:
                                    "space-between",
                                gap: 10
                            }}
                        >
                            {imageUrls
                                ?.slice(0, 3)
                                .map((url, index) => (
                                    <Pressable
                                        key={index}
                                        style={{
                                            borderColor:
                                                theme.text,
                                            borderWidth: url
                                                ? 0
                                                : 2,
                                            flex: 1,
                                            justifyContent:
                                                "center",
                                            alignItems:
                                                "center",
                                            borderStyle:
                                                "dashed",
                                            borderRadius: 10,
                                            height: 100,
                                            marginBottom: 30
                                        }}
                                    >
                                        {url ? (
                                            <Image
                                                source={{
                                                    uri: url
                                                }}
                                            />
                                        ) : (
                                            <EvilIcons
                                                name="image"
                                                size={22}
                                                color={
                                                    theme.text
                                                }
                                            />
                                        )}
                                    </Pressable>
                                ))}
                        </View>

                        {/** 3 -6 images */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent:
                                    "space-between",
                                gap: 10
                            }}
                        >
                            {imageUrls
                                ?.slice(3, 6)
                                .map((url, index) => (
                                    <Pressable
                                        key={index}
                                        style={{
                                            borderColor:
                                                theme.text,
                                            borderWidth: url
                                                ? 0
                                                : 2,
                                            flex: 1,
                                            justifyContent:
                                                "center",
                                            alignItems:
                                                "center",
                                            borderStyle:
                                                "dashed",
                                            borderRadius: 10,
                                            height: 100
                                        }}
                                    >
                                        {url ? (
                                            <Image
                                                source={{
                                                    uri: url
                                                }}
                                            />
                                        ) : (
                                            <EvilIcons
                                                name="image"
                                                size={22}
                                                color={
                                                    theme.text
                                                }
                                            />
                                        )}
                                    </Pressable>
                                ))}
                        </View>
                    </View>

                    {/** Drag and drop */}
                    <View style={{ marginVertical: 15 }}>
                        <Text
                            style={[
                                styles.dragText,
                                { color: theme.text }
                            ]}
                        >
                            Drag to reorder
                        </Text>
                    </View>

                    {/** Add urls as images */}
                    <View style={{ marginTop: 25 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent:
                                    "space-between"
                            }}
                        >
                            <Text
                                style={[
                                    styles.dragText,
                                    { color: theme.text }
                                ]}
                            >
                                Add a picture of yourself
                            </Text>
                            <EvilIcons
                                name="image"
                                size={22}
                                color={theme.text}
                                style={{ marginLeft: 8 }}
                            />
                        </View>

                        <CustomTextInput
                            placeholder="Enter image URL here ..."
                            value={imageUrl}
                            onChangeText={setImageUrl}
                            placeholderTextColor={
                                theme.text
                            }
                            style={{ marginBottom: 20 }}
                        />
                    </View>

                    {/** Add Button  */}
                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color={theme.text}
                        />
                    ) : (
                        <Button
                            title={"Add Image"}
                            onPress={handleAddImage}
                        />
                    )}

                    <GoNextButton onPress={handleNext} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PhotosScreen

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    dragText: {
        fontSize: 15,
        fontFamily: fontFamily.medium
    },
    addPhotosText: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        textAlign: "center"
    }
})
