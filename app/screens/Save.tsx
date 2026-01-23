import {  View } from "react-native";
import TripCard from "../../components/Save/TripCard";


export default function Save() {
    return (
        <View className="flex-1 p-4 bg-gray-100">
            <TripCard
                userInput={{
                    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b",
                    destination: "China",
                    from: "19 Sep",
                    to: "25 Sep",
                    travelType: "Solo",
                    people: "1",
                    budget: "20000 THB",
                    nationality: "Thai",
                    travelPlan: "International",
                }}
            />
            <TripCard
                userInput={{
                    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b",
                    destination: "China",
                    from: "19 Sep",
                    to: "25 Sep",
                    travelType: "Solo",
                    people: "1",
                    budget: "20000 THB",
                    nationality: "Thai",
                    travelPlan: "International",
                }}
            />
        </View>
    )
}