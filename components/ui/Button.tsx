import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

type Props = {
  title?: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  sign?: string;
  checked?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  iconColor = "#ffffff",
  icon,
  iconSize = 25,
  sign = "",
  checked = true,
}: Props) {
  return (
    sign ? (
      <TouchableOpacity
        onPress={onPress}
        disabled={checked === false}
        className="items-center justify-center w-10 h-10 rounded-full bg-primary">
        <Text className="text-2xl font-bold text-white">{sign}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={onPress}
        disabled={checked === false}
        className={clsx(
          "rounded-xl flex-row items-center justify-center gap-2",
          size === "lg" && "w-full h-16",
          size === "md" && "w-1/2 h-16",
          size === "sm" && "w-1/3 h-10",
          variant === "primary" && "bg-primary",
          variant === "secondary" && "bg-secondary border border-primary",
          checked === false && "opacity-50"
        )}>
        <Text
          className={clsx(
            "font-semibold",
            size === "lg" && "text-xl",
            size === "md" && "text-lg",
            size === "sm" && "text-base",
            variant === "primary" && "text-white",
            variant === "secondary" && "text-black",
            checked === false && "opacity-50"
          )}>
          {title}
        </Text>

        {icon && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        )}
      </TouchableOpacity>
    )
  );
}
