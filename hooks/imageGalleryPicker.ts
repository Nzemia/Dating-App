import * as ImagePicker from "expo-image-picker"
import { Alert } from "react-native"

export const pickImageFromGallery = async (): Promise<
    string | null
> => {
    const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            "Sorry, we need media library permissions to pick an image!"
        )
        return null
    }

    const result =
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

    if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
    ) {
        return result.assets[0].uri
    }
    return null
}
