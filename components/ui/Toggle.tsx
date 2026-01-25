import clsx from "clsx";
import { Pressable, Text, View } from "react-native";

type ToggleType = "tripType" | "fromTo";

type ValueMap = {
  tripType: "domestic" | "international";
  fromTo: "from" | "to";
};

type Props<T extends ToggleType> = {
  type?: T;
  value: ValueMap[T];
  onChange: (value: ValueMap[T]) => void;
  error?: string;
};

export default function Toggle<T extends ToggleType>({
  type = "tripType" as T,
  value,
  error,
  onChange,
}: Props<T>) {
  return (
    <View
      className={clsx(
        "flex-row p-1.5 border border-[#86a3d0] bg-[#86a3d0] mx-4",
        type === "tripType" ? "rounded-full" : "rounded-lg"
      )}>
      {/* LEFT */}
      <Pressable
        onPress={() =>
          onChange(type === "tripType" ? "domestic" : "from")
        }
        className={clsx(
          "flex-1 p-4 items-center",
          (value === "domestic") ? "bg-primary" : (value === "from") && "bg-white",
          (value === "domestic" || value === "from") &&
            (type === "tripType" ? "rounded-full" : "rounded-lg")
        )}>
        <Text
          className={clsx(
            "text-md font-bold",
            value === "domestic" ? "text-white" :  value === "from" ? "text-primary" : "text-white"
          )}>
          {type === "tripType" ? "Domestic" : "From"}
        </Text>
      </Pressable>

      {/* RIGHT */}
      <Pressable
        onPress={() =>
          onChange(type === "tripType" ? "international" : "to")
        }
        className={clsx(
          "flex-1 p-4 items-center",
          (value === "international") ? "bg-primary" : (value === "to") && 'bg-white',
          (value === "international" || value === "to") &&
            (type === "tripType" ? "rounded-full" : "rounded-lg")
        )}
      >
        <Text
          className={clsx(
            "text-md font-bold",
            value === "international" ? "text-white" : value === "to" ? "text-primary" : "text-white"
          )}
        >
          {type === "tripType" ? "International" : "To"}
        </Text>
      </Pressable>
    </View>
  );
}
