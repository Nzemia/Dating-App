import React, { useState } from "react"
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTheme } from "@/constants/ThemeContext"

interface CalendarProps {
    onDateChange: (date: string) => void
    initialDate?: string
}

const Calendar: React.FC<CalendarProps> = ({
    onDateChange,
    initialDate
}) => {
    const { theme } = useTheme()
    const [date, setDate] = useState(
        initialDate ? new Date(initialDate) : new Date()
    )
    const [showPicker, setShowPicker] = useState(false)

    const handleDateChange = (
        event: any,
        selectedDate?: Date
    ) => {
        setShowPicker(false)
        if (selectedDate) {
            setDate(selectedDate)
            onDateChange(selectedDate.toLocaleDateString()) // Format the date as needed
        }
    }

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.datePickerButton,
                    { borderColor: theme.text }
                ]}
                onPress={() => setShowPicker(true)}
            >
                <Text style={{ color: theme.text }}>
                    {date.toLocaleDateString()}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    datePickerButton: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        alignItems: "center"
    }
})

export default Calendar
