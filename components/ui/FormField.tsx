import { View, Text, TextInput } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
};

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-sm font-semibold text-primary">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="px-4 py-3 text-base bg-white border border-gray-300 rounded-xl"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
