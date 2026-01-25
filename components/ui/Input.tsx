import { View, TextInput, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import clsx from "clsx";

type Props = {
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  error?: string;
};

export default function Input({
  icon,
  iconSize = 20,
  iconColor = "#000",
  size = "lg",
  variant = "primary",
  error,
  ...props
}: Props) {
  return (
    <View className="relative">
      {/* Icon (optional) */}
      {icon && (
        <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Ionicons name={icon} size={iconSize} color={error === "" ? iconColor : "red"} />
        </View>
      )}

      {/* Input */}
      <TextInput
        className={clsx(
          "h-16 border rounded-xl bg-white text-black pr-4",
          icon ? "pl-12" : "pl-4",
          size === "lg" && "w-full",
          size === "md" && "w-1/2",
          size === "sm" && "w-1/3",

          variant === "primary" && "border border-primary",
          variant === "secondary" && "border border-gray-300",
          error === "" ? "" : "border border-red-500",

        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}
