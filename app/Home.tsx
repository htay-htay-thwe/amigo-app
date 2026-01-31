import { ImageBackground, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, Dimensions, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import Carousel from 'react-native-reanimated-carousel';

WebBrowser.maybeCompleteAuthSession();


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
  const navigation = useNavigation();

  const handleExploreNearby = async () => {
    try {
      // Open Google Maps to search for tourist attractions
      const url = 'https://www.google.com/maps/search/tourist+attractions';
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open Google Maps');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', 'Failed to open Google Maps. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
      keyboardShouldPersistTaps="handled">

      {/* Popular Destinations Section */}
      <View>
        <View className="flex-row items-center justify-between px-4 mt-5 mb-4">
          <Text className="text-2xl font-semibold" style={{ color: '#0D47A1' }}>
            Popular Destinations
          </Text>
          {/* <TouchableOpacity>
            <Text className="text-sm font-semibold" style={{ color: '#2563EB' }}>
              See All
            </Text>
          </TouchableOpacity> */}
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
        <Text className="mb-4 text-xl font-bold" style={{ color: '#0D47A1' }}>
          Quick Actions
        </Text>
        <TouchableOpacity
          className="flex-row items-center p-4 mb-3 bg-gradient-to-r rounded-xl"
          style={{ backgroundColor: '#DBEAFE' }}
          onPress={() => {
            // @ts-ignore - Navigate to the root navigator first, then to Steps
            navigation.navigate("Steps", { screen: "StepOne" })
          }}
        >
          <View className="p-3 bg-white rounded-full">
            <Ionicons name="add-circle" size={24} color="#2563EB" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
              Plan New Trip
            </Text>
            <Text className="text-sm" style={{ color: '#6B7280' }}>
              Start planning your next adventure
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-gradient-to-r rounded-xl"
          style={{ backgroundColor: '#DBEAFE' }}
          onPress={handleExploreNearby}
        >
          <View className="p-3 bg-white rounded-full">
            <Ionicons name="map" size={24} color="#2563EB" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
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
      <View className="absolute left-0 right-0 px-5 bottom-5" >
        <View className="items-center w-full border-t border-gray-200 ">
          <View className="items-center w-full pt-2 pb-3">
            <Text className="text-sm text-gray-500">
              © 2026 Encrypted. All rights reserved.
            </Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}