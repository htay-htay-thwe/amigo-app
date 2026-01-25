import { Pressable, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CenterTabButton() {
    const navigation = useNavigation();

    return (
        <View style={{ top: -25 }}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Steps", {
                        screen: "StepOne",
                    })
                }
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#2563EB",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Ionicons name="add" size={28} color="white" />
            </TouchableOpacity>
        </View >
    );
}
