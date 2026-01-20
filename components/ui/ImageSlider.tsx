import { View, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const images = [
   require("../../assets/images/StepOne.jpg"),
  require("../../assets/images/StepTwo.jpg"),
  require("../../assets/images/StepThree.jpeg"),
  require("../../assets/images/StepFour.png"),
  require("../../assets/images/StepFive.jpg"),
];

export default function ImageSlider() {
  return (
    <View>
      <Carousel
        width={width}
        height={200}
        autoPlay
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width, height: 200, borderRadius: 16 }}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}
