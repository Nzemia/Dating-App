import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import { useTheme } from "@/constants/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { Entypo } from "@expo/vector-icons"
import { fontFamily } from "@/constants/fonts"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import GoNextButton from "@/components/GoNextButton"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import { useNavigation } from "expo-router"

type GenderScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Gender"
>

const LocationScreen = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<GenderScreenNavigationProp>()

    const [location, setLocation] =
        useState<Location.LocationObject | null>(null)

    const [errorMsg, setErrorMsg] = useState<string | null>(
        null
    )

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 0,
        longitude: 0
    })

    const [address, setAddress] = useState<string | null>(
        null
    )

    //Get Current Location
    useEffect(() => {
        ;(async () => {
            let { status } =
                await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg(
                    "Permission to access location was denied"
                )
                return
            }

            // Get the user's current location
            let location =
                await Location.getCurrentPositionAsync({})
            setLocation(location)
            setMarkerPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })

            // Reverse geocode the initial location
            await reverseGeocode(
                location.coords.latitude,
                location.coords.longitude
            )
        })()
    }, [])

    // Reverse geocode coordinates to get the address
    const reverseGeocode = async (
        latitude: number,
        longitude: number
    ) => {
        try {
            const addressResponse =
                await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                })
            if (addressResponse.length > 0) {
                const { street, city, region, country } =
                    addressResponse[0]
                const formattedAddress = `${city}, ${region}, ${country}`
                setAddress(formattedAddress)
            }
        } catch (error) {
            console.error(
                "Reverse geocoding failed:",
                error
            )
            setAddress("Address not available")
        }
    }

    //Handle Marker Drag End
    const handleMarkerDragEnd = async (e: {
        latitude?: number
        longitude?: number
        nativeEvent?: any
    }) => {
        const { latitude, longitude } =
            e.nativeEvent.coordinate
        setMarkerPosition({ latitude, longitude })

        await reverseGeocode(latitude, longitude)
    }

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={{ color: theme.text }}>
                    {errorMsg}
                </Text>
            </View>
        )
    }

    if (!location) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={theme.text}
                />
            </View>
        )
    }

    const handleNext = () => {
        navigation.navigate("Gender")
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
                {/** Location and the 3 dots */}
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
                        <Entypo
                            style={{
                                color: theme.text
                            }}
                            name="location"
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
                        styles.liveText,
                        { color: theme.text }
                    ]}
                >
                    Where do you live?
                </Text>

                <MapView
                    style={{
                        width: "100%",
                        height: 500,
                        marginTop: 20,
                        borderRadius: 10
                    }}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude:
                            location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    <Marker
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                        coordinate={markerPosition}
                    >
                        {/* Custom Marker Pin */}
                        <Image
                            source={require("../assets/images/map_icon_pin.png")}
                            style={{
                                width: 25,
                                height: 25
                            }}
                        />
                        {/* Marker Pin Text */}
                        {/* <Text
                            style={[
                                styles.locationText,
                                {
                                    color: theme.text
                                }
                            ]}
                        >
                            {location.coords.latitude},
                            {location.coords.longitude}
                        </Text> */}
                    </Marker>
                </MapView>

                {/* Display the marker's current coordinates */}
                {/* <View style={styles.coordinatesContainer}>
                    <Text style={{ color: theme.text }}>
                        Latitude:{" "}
                        {markerPosition.latitude.toFixed(6)}
                    </Text>
                    <Text style={{ color: theme.text }}>
                        Longitude:{" "}
                        {markerPosition.longitude.toFixed(
                            6
                        )}
                    </Text>
                </View> */}

                {/** Display the address*/}
                <View style={styles.addressContainer}>
                    <Text
                        style={{
                            color: theme.text,
                            textAlign: "center"
                        }}
                    >
                        {address || "Fetching address..."}
                    </Text>
                </View>

                {/** Go Next */}
                <GoNextButton onPress={handleNext} />
            </View>
        </SafeAreaView>
    )
}

export default LocationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    liveText: {
        fontSize: 25,
        fontFamily: fontFamily.semiBold,
        marginTop: 10,
        textAlign: "center"
    },
    locationText: {
        fontSize: 15,
        fontFamily: fontFamily.regular,
        textAlign: "center"
    },
    coordinatesContainer: {
        marginTop: 20,
        alignItems: "center",
        fontFamily: fontFamily.semiBold,
        fontSize: 15
    },
    addressContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        fontFamily: fontFamily.medium,
        fontSize: 15
    }
})
