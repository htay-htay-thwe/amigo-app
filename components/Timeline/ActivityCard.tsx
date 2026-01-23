import { View, Text, Pressable, Linking } from "react-native";
import ImageCarousel from "./ImageCarousel";

type Props = {
  activity: any;
  youtubeLink?: string;
};

export default function ActivityCard({ activity, youtubeLink }: Props) {
  return (
    <View className="flex-1 p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
      
      {/* Image Carousel */}
      <ImageCarousel images={activity.activity_photos} />

      {/* Title */}
      <Text className="text-base font-semibold text-primary">
        {activity.activity_name}
      </Text>

      {/* Description */}
      <Text className="mt-1 text-sm text-gray-600">
        {activity.description}
      </Text>

      {/* Footer */}
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-sm font-semibold text-primary">
          ฿ {activity.cost_thb}
        </Text>

        {youtubeLink && (
          <Pressable
            onPress={() => Linking.openURL(youtubeLink)}
            className="px-3 py-1.5 bg-red-600 rounded-full"
          >
            <Text className="text-xs font-semibold text-white">
              ▶ Watch Vlog
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
