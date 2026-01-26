import { ImageBackground, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from "react";
import { config, isGoogleConfigured } from '../components/constants/config';
import Carousel from 'react-native-reanimated-carousel';
import * as Location from 'expo-location';

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  Home: undefined;
  GetStarted: undefined;
  Login: undefined;
  CreateAccount: undefined;
  StepOne: undefined;
  StepTwo: undefined;
  StepThree: undefined;
  StepFour: undefined;
  StepFive: undefined;
  StepSix: undefined;
  StepConfirm: undefined;
};

const { width: screenWidth } = Dimensions.get('window');

// Popular destinations data
const popularDestinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",

  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",

  },
  {
    id: 3,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",

  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",

  },
  {
    id: 5,
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",

  }
];

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    // In Expo Go we use the CreateAccount/Login flow (expo-auth-session).
    // Navigating to CreateAccount will handle Google auth via expo-auth-session.
    navigation.navigate("CreateAccount");
  };

  const handleExploreNearby = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable location permissions to explore nearby attractions.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Open Google Maps with nearby search
      const url = `https://www.google.com/maps/search/tourist+attractions/@${latitude},${longitude},15z`;

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps');
      }
    } catch (error) {
      console.error('Explore Nearby Error:', error);
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
      keyboardShouldPersistTaps="handled">

      {/* Popular Destinations Section */}
      <View>
        <View className="px-4 mb-4 mt-2 flex-row justify-between items-center">
          <Text className="text-2xl font-bold" style={{ color: '#0D47A1' }}>
            Popular Destinations
          </Text>
          <TouchableOpacity>
            <Text className="text-sm font-semibold" style={{ color: '#256></SafeAreaView>3EB' }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 0.6}
          autoPlay={true}
          autoPlayInterval={3000}
          data={popularDestinations}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 10,
                borderRadius: 16,
                overflow: 'hidden',
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 16,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>


                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>



      {/* Quick Actions Section */}
      <View className="px-4 mt-6 mb-8">
        <Text className="text-xl font-bold mb-4" style={{ color: '#0D47A1' }}>
          Quick Actions
        </Text>
        <TouchableOpacity
          className="bg-gradient-to-r p-4 rounded-xl mb-3 flex-row items-center"
          style={{ backgroundColor: '#DBEAFE' }}
          onPress={() => {
            // @ts-ignore - Navigate to the root navigator first, then to Steps
            navigation.getParent()?.navigate("Steps");
          }}
        >
          <View className="bg-white p-3 rounded-full">
            <Ionicons name="add-circle" size={24} color="#2563EB" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="font-semibold text-base" style={{ color: '#0D47A1' }}>
              Plan New Trip
            </Text>
            <Text className="text-sm" style={{ color: '#6B7280' }}>
              Start planning your next adventure
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gradient-to-r p-4 rounded-xl flex-row items-center"
          style={{ backgroundColor: '#DBEAFE' }}
          onPress={handleExploreNearby}
        >
          <View className="bg-white p-3 rounded-full">
            <Ionicons name="map" size={24} color="#2563EB" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="font-semibold text-base" style={{ color: '#0D47A1' }}>
              Explore Nearby
            </Text>
            <Text className="text-sm" style={{ color: '#6B7280' }}>
              Discover attractions around you
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Copyright Section */}
      <View className="px-5 absolute bottom-5 left-0 right-0" >
        <View className=" w-full  items-center border-t border-gray-200 ">
          <View className="pt-2 pb-3 w-full items-center">
            <Text className="text-sm text-gray-500">
              © 2026 Encrypted. All rights reserved.
            </Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
