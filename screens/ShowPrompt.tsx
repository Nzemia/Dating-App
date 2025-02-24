import {
    ActivityIndicator,
    Button,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import React, { useState } from "react"
import Modal from "react-native-modal"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import CustomTextInput from "@/components/TextInput"
import { useNavigation } from "expo-router"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/configs/global"
import GoNextButton from "@/components/GoNextButton"

//go back after entering the 3 prompts, ie, prompt screen
type PromptScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Prompt"
>

// proceed to the last screen
type PreFinalScreenNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "PreFinal"
    >

const ShowPrompt = () => {
    const { theme } = useTheme()

    const navigation =
        useNavigation<PromptScreenNavigationProp>()

    const navigation2 =
        useNavigation<PreFinalScreenNavigationProp>()

    const [prompts, setPrompts] = useState<any[]>([])

    const [option, setOption] = useState<string>("About Me")
    const [answer, setAnswer] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] =
        useState(false)

    const promptss = [
        {
            id: "0",
            name: "About me",
            questions: [
                {
                    id: "10",
                    question: "A random fact I love is"
                },
                {
                    id: "11",
                    question: "Typical Sunday"
                },
                {
                    id: "12",
                    question: "I go crazy for"
                },
                {
                    id: "13",
                    question: "Unusual Skills"
                },
                {
                    id: "14",
                    question: "My greatest strenght"
                },
                {
                    id: "15",
                    question: "My simple pleasures"
                },
                {
                    id: "16",
                    question: "A life goal of mine"
                }
            ]
        },
        {
            id: "2",
            name: "Self Care",
            questions: [
                {
                    id: "10",
                    question: "I unwind by"
                },
                {
                    id: "11",
                    question: "A boundary of mine is"
                },
                {
                    id: "12",
                    question: "I feel most supported when"
                },
                {
                    id: "13",
                    question: "I hype myself up by"
                },
                {
                    id: "14",
                    question: "To me, relaxation is"
                },
                {
                    id: "15",
                    question: "I beat my blues by"
                },
                {
                    id: "16",
                    question: "My skin care routine"
                }
            ]
        }
    ]

    const openModal = (item: any) => {
        setIsModalVisible(true)

        setQuestion(item.question)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setQuestion("")
        setAnswer("")
    }

    const addPrompt = () => {
        setLoading(true)
        const newPrompt = { question, answer }
        setPrompts([...prompts, newPrompt])
        setQuestion("")
        setAnswer("")
        setIsModalVisible(false)
        setLoading(false)

        if (prompts.length === 3) {
            navigation.navigate("Prompt")
        }
    }

    const handleNext = () => {
        navigation2.navigate("PreFinal")
    }

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: theme.background
                }}
            >
                {/** Headers */}
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={[
                            styles.viewAllText,
                            { color: theme.text }
                        ]}
                    >
                        View All
                    </Text>
                    <Text
                        style={[
                            styles.promptText,
                            { color: theme.text }
                        ]}
                    >
                        Prompts
                    </Text>
                </View>

                {/** about */}
                <View
                    style={{
                        marginHorizontal: 10,
                        marginTop: 20,
                        flexDirection: "row"
                    }}
                >
                    {promptss.map((item, index) => (
                        <View key={index}>
                            <Pressable
                                style={{
                                    padding: 10,
                                    borderRadius: 20,
                                    backgroundColor:
                                        option == item?.name
                                            ? "#581845"
                                            : theme.background
                                }}
                                onPress={() => {
                                    setOption(item?.name)
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            color:
                                                option ==
                                                item?.name
                                                    ? "#fff"
                                                    : theme.text
                                        }
                                    ]}
                                >
                                    {item?.name}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                {/**questions */}
                <View
                    style={{
                        marginTop: 20,
                        marginHorizontal: 12
                    }}
                >
                    {promptss.map((item, index) => (
                        <View key={index}>
                            {option == item?.name && (
                                <View>
                                    {item?.questions?.map(
                                        (
                                            question,
                                            index
                                        ) => (
                                            <Pressable
                                                style={{
                                                    marginVertical: 12
                                                }}
                                                onPress={() =>
                                                    openModal(
                                                        question
                                                    )
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        styles.questionsText,
                                                        {
                                                            color: theme.text
                                                        }
                                                    ]}
                                                >
                                                    {
                                                        question?.question
                                                    }
                                                </Text>
                                            </Pressable>
                                        )
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <GoNextButton
                    style={{ right: 10 }}
                    onPress={handleNext}
                />
            </SafeAreaView>

            {/** Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                swipeDirection={["up", "down"]}
                onSwipeComplete={closeModal}
                swipeThreshold={200}
                propagateSwipe
                style={styles.modal}
            >
                <View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor:
                                theme.background
                        }
                    ]}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 250
                        }}
                    >
                        <View
                            style={{ marginVertical: 10 }}
                        >
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { color: theme.text }
                                ]}
                            >
                                Answer the question
                            </Text>

                            <Text
                                style={[
                                    styles.questionsText,
                                    { color: theme.text }
                                ]}
                            >
                                {question}
                            </Text>

                            <View
                                style={{
                                    borderColor: theme.text,
                                    borderWidth: 1,
                                    height: 100,
                                    borderRadius: 10,
                                    borderStyle: "dashed",
                                    padding: 10,
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <CustomTextInput
                                    placeholder="Enter your answer here..."
                                    placeholderTextColor={
                                        theme.text
                                    }
                                    multiline={true}
                                    value={answer}
                                    onChangeText={setAnswer}
                                />
                            </View>

                            {loading ? (
                                <ActivityIndicator
                                    size="large"
                                    color={theme.text}
                                />
                            ) : (
                                <Button
                                    onPress={addPrompt}
                                    title="Add"
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ShowPrompt

const styles = StyleSheet.create({
    viewAllText: {
        fontSize: 15,
        fontFamily: fontFamily.semiBold
    },
    promptText: {
        fontSize: 16,
        fontFamily: fontFamily.bold
    },

    modal: { justifyContent: "flex-end" },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        marginBottom: 10,
        textAlign: "center"
    },
    questionsText: {
        fontSize: 15,
        fontFamily: fontFamily.medium,
        marginTop: 15,
        left: 20
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    }
})
