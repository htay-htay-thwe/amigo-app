import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <View className="mb-3 overflow-hidden rounded-xl">
      <Carousel
        width={width}
        height={160}
        autoPlay={images.length > 1}
        autoPlayInterval={3000}
        loop={images.length > 1}
        data={images}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            className="w-full h-full"
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}
