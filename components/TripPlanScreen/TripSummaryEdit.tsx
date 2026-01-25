import { View, Text, TextInput } from "react-native";
import type { TripSummaryItem } from "../../components/constants/types";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Feather, Fontisto } from "@expo/vector-icons";

type Props = {
    data: TripSummaryItem[];
    onChange: (value: TripSummaryItem[]) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
};

export default function TripSummaryEdit({ data, onChange, editMode, setEditMode }: Props) {
    console.log('hi', setEditMode);
    // const navigation = useNavigation();
    // const updateValue = (key: string, value: string) => {
    //     onChange(
    //         data.map((item) =>
    //             item.key === key ? { ...item, value } : item
    //         )
    //     );
    // };

    const changeMode = () => {
        setEditMode(!editMode);
    };

    return (
        <View className="shadow-2xl">
            <View className="px-4 pb-2 mt-4">
                <View className="flex flex-row justify-center mb-2 text-center">
                    <Fontisto name="flag" size={24} color="black" />
                    <Text className="px-4 text-xl font-semibold text-center text-primary">Edit Trip Summary</Text>
                </View>
                <RowForm title="destination" value="China" />

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <RowForm title="From" value="19 Sep" />
                    </View>
                    <View className="flex-1">
                        <RowForm title="To" value="25 Sep" />
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <RowForm title="Travel Type" value="Solo" />
                    </View>
                    <View className="flex-1">
                        <RowForm title="People" value="1" />
                    </View>

                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <RowForm title="Budget" value="20000THB" />
                    </View>
                    <View className="flex-1">
                        <RowForm title="Nationality" value="Chinese" />
                    </View>
                </View>

                <RowForm title="Travel Plan" value="International" />

                <View className="px-4 py-1.5 mt-1 ">
                    <Text className="font-semibold text-primary">What would you like to do on this trip?</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={6}
                        className="border mt-3 border-gray-300 rounded-lg p-4 min-h-[200px] text-base"
                        textAlignVertical="top"
                        placeholder="-"
                        placeholderTextColor="#999"
                        value="Enjoy Asian cultural experiences, traditional local food, and scenic nature. I prefer a relaxed travel style, moderate budget, and must-see temples, heritage sites, street markets, and hidden local spots."
                    // onChangeText={}
                    />
                </View>

                <View className="flex-row justify-end gap-4 mt-5 mr-4">
                    <Button onPress={() => changeMode()} title="Cancel" variant="primary" size="sm" />
                    <Button onPress={() => changeMode()} title="Confirm" variant="primary" size="sm" />
                </View>
            </View>
        </View>
    );
}


function RowForm({ title, value }: { title: string; value: string }) {
    return (
        <View className="px-4 py-1.5 ">
            <Text className="mb-1 text-gray-500">{title}</Text>
            <TextInput
                value={value}
                // onChangeText={onChange}
                placeholder="-"
                className="pb-1 text-base font-semibold border-b border-gray-300 text-primary"
            />
        </View>
    );
}