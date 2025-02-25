import {
    Alert,
    Button,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
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
import useRegistration from "@/hooks/useRegistration"
import { getRegistrationProgress } from "@/utils/RegistrationProgress"
import { pickImageFromGallery } from "@/hooks/imageGalleryPicker"

type PromptScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Prompt"
>

const PhotosScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<PromptScreenNavigationProp>()

    const [imageUrls, setImageUrls] = useState<string[]>([])

    const [imageUrl, setImageUrl] = useState("")

    const [loading, setLoading] = useState(false)

    const { validateAndSave, error } =
        useRegistration("Photos")

    useEffect(() => {
        getRegistrationProgress("Photos").then(
            progressData => {
                if (
                    progressData &&
                    progressData.imageUrls
                ) {
                    setImageUrls(progressData.imageUrls)
                }
            }
        )
    }, [])

    // Handle picking an image from the gallery
    const handlePickImage = async () => {
        setLoading(true)
        try {
            const uri = await pickImageFromGallery()
            if (uri && imageUrls.length < 6) {
                setImageUrls(prev => [...prev, uri])
            } else if (imageUrls.length >= 6) {
                Alert.alert(
                    "Limit reached",
                    "You can only add up to 6 images."
                )
            }
        } catch (err) {
            console.error("Error picking image:", err)
        } finally {
            setLoading(false)
        }
    }

    // const handleAddImage = () => {
    //     setLoading(true)
    //     //find the first empty slot in the array
    //     const index = imageUrls.findIndex(url => url === "")

    //     if (index !== -1) {
    //         const updatedImageUrls = [...imageUrls]
    //         updatedImageUrls[index] = imageUrl
    //         setImageUrls(updatedImageUrls)
    //         setImageUrl("")
    //         setLoading(false)
    //     }
    // }
    const handleAddImage = () => {
        setLoading(true)
        if (imageUrl.trim() === "") {
            Alert.alert(
                "Error",
                "Please enter a valid image URL."
            )
            setLoading(false)
            return
        }

        if (imageUrls.length >= 6) {
            Alert.alert(
                "Limit reached",
                "You can only add up to 6 images."
            )
            setLoading(false)
            return
        }

        // Add the new URL to the array
        setImageUrls(prev => [...prev, imageUrl])
        setImageUrl("")
        setLoading(false)
    }

    const handleNext = async () => {
        const isValid = await validateAndSave({
            imageUrls: imageUrls.filter(
                url => url.trim() !== ""
            )
        })
        //const isValid = await validateAndSave({ imageUrls })
        if (isValid) {
            navigation.navigate("Prompt")
        }
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
                    {/** 0-3 images */}
                    <View style={{ marginTop: 20 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent:
                                    "space-between",

                                gap: 20
                            }}
                        >
                            {imageUrls
                                .slice(0, 3)
                                .map((url, index) => (
                                    <Pressable
                                        key={index}
                                        style={{
                                            borderColor:
                                                "#581845",
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
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 10,
                                                    resizeMode:
                                                        "cover"
                                                }}
                                            />
                                        ) : (
                                            <EvilIcons
                                                name="image"
                                                size={22}
                                                color="black"
                                            />
                                        )}
                                    </Pressable>
                                ))}
                        </View>
                    </View>
                    {/** 3-6 images */}
                    <View style={{ marginTop: 20 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent:
                                    "space-between",
                                gap: 20
                            }}
                        >
                            {imageUrls
                                .slice(3, 6)
                                .map((url, index) => (
                                    <Pressable
                                        key={index}
                                        style={{
                                            borderColor:
                                                "#581845",
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
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 10,
                                                    resizeMode:
                                                        "cover"
                                                }}
                                            />
                                        ) : (
                                            <EvilIcons
                                                name="image"
                                                size={22}
                                                color="black"
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
                    <Button
                        title="Add Image as URL"
                        onPress={handleAddImage}
                    />

                    {/** Pick image from gallery button */}
                    <View style={{ marginTop: 25 }}>
                        <Button
                            title="Pick Image from Gallery"
                            onPress={handlePickImage}
                        />
                    </View>

                    {error && (
                        <Text
                            style={[
                                styles.errorText,
                                { color: "red" }
                            ]}
                        >
                            {error}
                        </Text>
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
    },
    errorText: {
        marginTop: 10
    }
})
