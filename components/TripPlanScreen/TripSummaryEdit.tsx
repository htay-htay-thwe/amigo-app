import { View, Text, TextInput, TouchableOpacity, Modal, Pressable } from "react-native";
import type { TripSummaryItem } from "../../components/constants/types";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Feather, Fontisto, AntDesign } from "@expo/vector-icons";
import { usePlanStore } from "../store/plan.store";
import { useState } from "react";
import { useTripStore } from "../store/trip.store";
import { fetchFlights } from "../constants/flight/fetchFlights";
import { fetchHotels } from "../constants/flight/fetchHotel";
import { gemini } from "../constants/api";
import { extractJson, itineraryPrompt, selectLogisticsPrompt, visaPrompt } from "../constants/firstSystemPrompt";
import { itineraryWithYoutube } from "../constants/flight/youtube";
import DatePicker from "../ui/DatePicker";
import { planTripFunc } from "../constants/SubFunction";

type Props = {
    data: TripSummaryItem[];
    onChange: (value: TripSummaryItem[]) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
};

export default function TripSummaryEdit({ data, onChange, editMode, setEditMode }: Props) {
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [showFromCalendar, setShowFromCalendar] = useState(false);
    const [showToCalendar, setShowToCalendar] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    
    const setUserPromptsStore = useTripStore((s) => s.setUserPrompts);
    const setDestination = useTripStore((s) => s.setDestination);
    const setDates = useTripStore((s) => s.setDates);
    const setPeople = useTripStore((s) => s.setPeople);
    const setNationality = useTripStore((s) => s.setNationality);
    const setTravelType = useTripStore((s) => s.setTravelType);

    const updateValue = (key: string, value: string) => {
        onChange(
            data.map((item) =>
                item.key === key ? { ...item, value } : item
            )
        );
        // Clear validation error when user starts typing
        if (validationErrors[key]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const getValue = (key: string): string => {
        return data.find((item) => item.key === key)?.value || "";
    };

    const validateFields = (): boolean => {
        const errors: { [key: string]: string } = {};
        
        // Validate destination
        if (!getValue("destination").trim()) {
            errors.destination = "Destination is required";
        }
        
        // Validate dates
        const fromDate = getValue("from");
        const toDate = getValue("to");
        
        if (!fromDate) {
            errors.from = "Start date is required";
        }
        
        if (!toDate) {
            errors.to = "End date is required";
        }
        
        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (from < today) {
                errors.from = "Start date cannot be in the past";
            }
            
            if (to < from) {
                errors.to = "End date must be after start date";
            }
        }
        
        // Validate people
        const people = getValue("people");
        if (!people || isNaN(Number(people)) || Number(people) < 1) {
            errors.people = "Valid number of people is required";
        }
        
        // Validate budget
        const budget = getValue("budget");
        if (!budget.trim()) {
            errors.budget = "Budget is required";
        }
        
        // Validate nationality
        if (!getValue("nationality").trim()) {
            errors.nationality = "Nationality is required";
        }
        
        // Validate user prompt
        if (!getValue("userPrompt").trim()) {
            errors.userPrompt = "Please describe what you'd like to do";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFromDateSelect = (dateString: string) => {
        updateValue("from", dateString);
        setShowFromCalendar(false);
        
        // Update marked dates to show selected range
        const toDate = getValue("to");
        if (toDate) {
            updateMarkedDates(dateString, toDate);
        }
    };

    const handleToDateSelect = (dateString: string) => {
        updateValue("to", dateString);
        setShowToCalendar(false);
        
        // Update marked dates to show selected range
        const fromDate = getValue("from");
        if (fromDate) {
            updateMarkedDates(fromDate, dateString);
        }
    };

    const updateMarkedDates = (from: string, to: string) => {
        const marked: any = {};
        const fromDate = new Date(from);
        const toDate = new Date(to);
        
        if (fromDate <= toDate) {
            marked[from] = { startingDay: true, color: '#00adf5', textColor: 'white' };
            marked[to] = { endingDay: true, color: '#00adf5', textColor: 'white' };
            
            // Mark dates in between
            const currentDate = new Date(fromDate);
            currentDate.setDate(currentDate.getDate() + 1);
            
            while (currentDate < toDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                marked[dateStr] = { color: '#70d7ff', textColor: 'white' };
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        
        setMarkedDates(marked);
    };

    const changeMode = () => {
        if (!validateFields()) {
            return; // Don't proceed if validation fails
        }
        
        // Update all trip data in the store before planning
        setDestination(getValue("destination"));
        setDates(getValue("from"), getValue("to"));
        setPeople(getValue("people"));
        setNationality(getValue("nationality"));
        setTravelType(getValue("travelType"));
        setUserPromptsStore(getValue("userPrompt"));
        
        // Now trigger the trip planning
        planTripFunc();
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        setValidationErrors({});
        setEditMode(!editMode);
    };

    return (
        <View className="shadow-2xl">
            <View className="px-4 pb-2 mt-4">
                <View className="flex flex-row justify-center mb-2 text-center">
                    <Fontisto name="flag" size={24} color="black" />
                    <Text className="px-4 text-xl font-semibold text-center text-primary">Edit Trip Summary</Text>
                </View>
                
                <RowForm 
                    title="Destination" 
                    value={getValue("destination")} 
                    onChange={(value) => updateValue("destination", value)}
                    error={validationErrors.destination}
                />

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <DateField
                            title="From"
                            value={getValue("from")}
                            onPress={() => setShowFromCalendar(true)}
                            error={validationErrors.from}
                        />
                    </View>
                    <View className="flex-1">
                        <DateField
                            title="To"
                            value={getValue("to")}
                            onPress={() => setShowToCalendar(true)}
                            error={validationErrors.to}
                        />
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <RowForm 
                            title="Travel Type" 
                            value={getValue("travelType")} 
                            onChange={(value) => updateValue("travelType", value)}
                        />
                    </View>
                    <View className="flex-1">
                        <RowForm 
                            title="People" 
                            value={getValue("people")} 
                            onChange={(value) => updateValue("people", value)}
                            error={validationErrors.people}
                            keyboardType="numeric"
                        />
                    </View>

                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <RowForm 
                            title="Budget" 
                            value={getValue("budget")} 
                            onChange={(value) => updateValue("budget", value)}
                            error={validationErrors.budget}
                        />
                    </View>
                    <View className="flex-1">
                        <RowForm 
                            title="Nationality" 
                            value={getValue("nationality")} 
                            onChange={(value) => updateValue("nationality", value)}
                            error={validationErrors.nationality}
                        />
                    </View>
                </View>

                <RowForm 
                    title="Travel Plan" 
                    value={getValue("plan")} 
                    onChange={(value) => updateValue("plan", value)} 
                />

                <View className="px-4 py-1.5 mt-1 ">
                    <Text className="font-semibold text-primary">What would you like to do on this trip?</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={6}
                        className={`border mt-3 ${validationErrors.userPrompt ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 min-h-[200px] text-base`}
                        textAlignVertical="top"
                        placeholder="-"
                        placeholderTextColor="#999"
                        value={getValue("userPrompt")}
                        onChangeText={(value) => updateValue("userPrompt", value)}
                    />
                    {validationErrors.userPrompt && (
                        <Text className="mt-1 text-xs text-red-500">{validationErrors.userPrompt}</Text>
                    )}
                </View>

                <View className="flex-row justify-end gap-4 mt-5 mr-4">
                    <Button onPress={handleCancel} title="Cancel" variant="primary" size="sm" />
                    <Button onPress={changeMode} title="Confirm" variant="primary" size="sm" />
                </View>
            </View>

            {/* From Date Calendar Modal */}
            <Modal
                visible={showFromCalendar}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowFromCalendar(false)}
            >
                <Pressable 
                    className="flex-1 bg-black/50 justify-center items-center"
                    onPress={() => setShowFromCalendar(false)}
                >
                    <Pressable className="bg-white rounded-lg p-4 w-11/12 max-w-md">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold text-primary">Select Start Date</Text>
                            <TouchableOpacity onPress={() => setShowFromCalendar(false)}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            markedDates={markedDates}
                            onSelectDate={handleFromDateSelect}
                        />
                    </Pressable>
                </Pressable>
            </Modal>

            {/* To Date Calendar Modal */}
            <Modal
                visible={showToCalendar}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowToCalendar(false)}
            >
                <Pressable 
                    className="flex-1 bg-black/50 justify-center items-center"
                    onPress={() => setShowToCalendar(false)}
                >
                    <Pressable className="bg-white rounded-lg p-4 w-11/12 max-w-md">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold text-primary">Select End Date</Text>
                            <TouchableOpacity onPress={() => setShowToCalendar(false)}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <DatePicker
                            markedDates={markedDates}
                            onSelectDate={handleToDateSelect}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

// DateField component for date inputs with calendar icon
function DateField({ title, value, onPress, error }: { 
    title: string; 
    value: string; 
    onPress: () => void;
    error?: string;
}) {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <View className="px-4 py-1.5">
            <Text className="mb-1 text-gray-500">{title}</Text>
            <TouchableOpacity 
                onPress={onPress}
                className={`pb-1 border-b ${error ? 'border-red-500' : 'border-gray-300'} flex-row justify-between items-center`}
            >
                <Text className={`text-base font-semibold ${value ? 'text-primary' : 'text-gray-400'}`}>
                    {formatDate(value)}
                </Text>
                <AntDesign name="calendar" size={18} color={error ? "#ef4444" : "#6b7280"} />
            </TouchableOpacity>
            {error && (
                <Text className="mt-1 text-xs text-red-500">{error}</Text>
            )}
        </View>
    );
}


function RowForm({ title, value, onChange, error, keyboardType }: { 
    title: string; 
    value: string; 
    onChange: (value: string) => void;
    error?: string;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}) {
    return (
        <View className="px-4 py-1.5 ">
            <Text className="mb-1 text-gray-500">{title}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="-"
                keyboardType={keyboardType || "default"}
                className={`pb-1 text-base font-semibold border-b ${error ? 'border-red-500' : 'border-gray-300'} text-primary`}
            />
            {error && (
                <Text className="mt-1 text-xs text-red-500">{error}</Text>
            )}
        </View>
    );
}