import { View, Alert } from "react-native";
import PlanCard from "../../components/Save/PlanCard";
import { useTripStore } from "../../components/store/trip.store";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Plan() {
    const myPlans = useTripStore((s) => s.myPlan);
    const removePlan = useTripStore((s) => s.removePlan);
    const navigation = useNavigation<any>();

    const planDetails = (id: string) => {
        navigation.navigate("Steps", {
            screen: "PlanCheck",
            params: { tripId: id },
        });
    }

    const handleDelete = (id: string, destination: string) => {
        Alert.alert(
            "Delete Trip",
            `Are you sure you want to delete your trip to ${destination}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => removePlan(id)
                }
            ]
        );
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                {myPlans.map((plan, index) => (
                    <PlanCard
                    key={index}
                         userInput={plan?.trip_plan}
                         trip={plan}
                         onPress={() => planDetails(plan.id)}
                         onDelete={() => handleDelete(plan.id, plan?.trip_plan?.destination)}
                         id={plan.id}
                    />))}
            </ScrollView>
        </View>
    )

}
