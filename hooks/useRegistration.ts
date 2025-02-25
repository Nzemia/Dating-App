import { useState } from "react"
import { Alert } from "react-native"
import { saveRegistrationProgress } from "../utils/RegistrationProgress" // Adjust the import path

type ScreenName =
    | "Name"
    | "Email"
    | "Password"
    | "Birth"
    | "Location"
    | "Gender"
    | "Type"
    | "Dating"
    | "LookingFor"
    | "HomeTown"
    | "Photos" 
    | "Prompt"
    | "ShowPrompt"
    | "PreFinal"

const useRegistration = (screenName: ScreenName) => {
    const [error, setError] = useState<string | null>(null)

    const validateAndSave = async (data: any) => {
        try {
            // Validate data based on the screen
            switch (screenName) {
                case "Name":
                    if (!data.firstName) {
                        throw new Error(
                            "First name is required."
                        )
                    }
                    break

                case "Email":
                    if (
                        !data.email ||
                        !data.email.includes("@") ||
                        !data.email.includes(".")
                    ) {
                        throw new Error(
                            "Please enter a valid email address."
                        )
                    }
                    break

                case "Password":
                    if (
                        !data.password ||
                        data.password.length < 6
                    ) {
                        throw new Error(
                            "Password must be at least 6 characters long."
                        )
                    }
                    break

                case "Birth":
                    if (!data.dateOfBirth) {
                        throw new Error(
                            "Please select a valid date of birth."
                        )
                    }
                    break

                case "Location":
                    if (!data.location) {
                        throw new Error(
                            "Please select a valid location."
                        )
                    }
                    break

                case "Gender":
                    if (!data.gender) {
                        throw new Error(
                            "Please select a valid gender."
                        )
                    }
                    break

                case "Type":
                    if (!data.type) {
                        throw new Error(
                            "You must choose your sexuality"
                        )
                    }
                    break

                case "Dating":
                    if (!data.datingPreferences) {
                        throw new Error(
                            "You must choose your dating preferences"
                        )
                    }
                    break

                case "LookingFor":
                    if (!data.lookingFor) {
                        throw new Error(
                            "You must choose your dating intention"
                        )
                    }
                    break

                case "HomeTown":
                    if (!data.homeTown) {
                        throw new Error(
                            "You must choose your hometown"
                        )
                    }
                    break

                case "Photos":
                    if (!data.imageUrls || data.imageUrls.length < 3) {
                        throw new Error(
                            "You must add at least 3 photos"
                        )
                    }
                    break              

                // case "Prompt":
                //     if (!data.prompt) {
                //         throw new Error(
                //             "You must enter your prompt"
                //         )
                //     }
                //     break

                case "ShowPrompt":
                    if (!data.showPrompt) {
                        throw new Error(
                            "You must choose if you want to show the prompt"
                        )
                    }
                    break

                default:
                    throw new Error("Invalid screen name.")
            }

            // Save the data
            await saveRegistrationProgress(screenName, data)
            setError(null)
            return true
        } catch (error: any) {
            setError(error.message)
            Alert.alert("Error", error.message)
            return false
        }
    }

    return { validateAndSave, error }
}

export default useRegistration
