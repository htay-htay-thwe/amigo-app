import { View, Image, Text, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const slides = [
  {
    image: require("../../assets/images/StepOne.jpg"),
    title : "AI Itinerary",
    quote: "Plan your journey smarter with intelligent travel assistance.",
  },
  {
    image: require("../../assets/images/StepTwo.jpg"),
    title:"Smart Travel Planner",
    quote: "Let AI design your perfect trip in minutes.",
  },
  {
    image: require("../../assets/images/StepThree.jpeg"),
    title:"Your Personal Guide",
    quote: "Create seamless trips without the stress of planning.",
  },
  {
    image: require("../../assets/images/StepFour.png"),
    title:"Smart Travel Planner",
    quote: "Let AI design your perfect trip in minutes.",
  },
  {
    image: require("../../assets/images/StepFive.jpg"),
    title:"Travel with AI",
    quote: "Turn your dream destinations into real plans.",
  },
];

export default function ImageSlider() {
  return (
    <View>
      <Carousel
        width={width}
        height={height * 0.3}
        autoPlay
        autoPlayInterval={3000}
        data={slides}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <View style={{ width, height: height * 0.3 }}>
            {/* Background Image */}
            <Image
              source={item.image}
              style={{ width, height: height * 0.3, position: "absolute" }}
              resizeMode="cover"
            />

            {/* Center Quote */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.25)", 
              }}
            >
                <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                {item.quote}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
