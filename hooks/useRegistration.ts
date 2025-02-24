import { useState } from "react"
import { Alert } from "react-native"
import { saveRegistrationProgress } from "../utils/RegistrationProgress" // Adjust the import path

type ScreenName = "Name" | "Email" | "Password" | "Birth"

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
