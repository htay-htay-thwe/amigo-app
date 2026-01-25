import Modal from "react-native-modal";
import { View, TextInput, Text } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import FlightCard from "../Visa/FlightCard";
import Button from "../ui/Button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import type { FlightGroup } from "../constants/types";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  flights: FlightGroup[];
  editPayload?: {
    type: "flight" | "accommodation" | "itinerary";
    title: string;
    data: any;
  };
};

export default function EditModal({
  open,
  setOpen,
  flights,
  editPayload,
}: Props) {
  const flightGroups = flights[0];
  const [send, setSend] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      isVisible={open}
      avoidKeyboard
      backdropOpacity={0.45}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      onBackdropPress={() => setOpen(false)}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4 pb-6">
        {/* Drag handle */}
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name={
                editPayload?.type === "flight"
                  ? "flight-takeoff"
                  : editPayload?.type === "accommodation"
                    ? "hotel"
                    : "location-city"
              }
              size={28}
              color="#2563eb"
            />
            <Text className="text-lg font-semibold">
              {editPayload?.title}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <FontAwesome name="close" size={22} color="#2563eb" />
          </TouchableOpacity>
        </View>


        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
          <TextInput
            multiline
            placeholder="Add notes or instructions…"
            placeholderTextColor="#999"
            className="text-base min-h-[100px]"
          />

          <View className="items-end mt-2">
            <TouchableOpacity
              onPress={() => setSend(true)}
              className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center">
              <MaterialIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {send && (
          <View className="bg-gray-50 rounded-2xl p-2 mb-4">
            <View className="flex-row items-center gap-3">
              <View className="w-11/12">
                <FlightCard
                  condition="update"
                  label="Departure"
                  flight={flightGroups.outbound_flight}
                />
              </View>
              <BouncyCheckbox
                size={22}
                isChecked={checked}
                fillColor="#2563eb"
                unFillColor="#fff"
                iconStyle={{ borderColor: "#2563eb" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={setChecked}
              />
            </View>
          </View>
        )}


        {send && (
          <Button
            title="Update"
            checked={checked}
            onPress={() => setOpen(false)}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
