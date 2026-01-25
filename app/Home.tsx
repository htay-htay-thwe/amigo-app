import { ImageBackground, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useEffect, useState } from "react";
import { config, isGoogleConfigured, isFacebookConfigured } from '../components/constants/config';

WebBrowser.maybeCompleteAuthSession();

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: config.googleWebClientId,
});

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

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;
      
      console.log('Google User Info:', userInfo);
      Alert.alert(
        "Success",
        `Welcome ${user?.name || 'User'}!`,
        [{ text: "OK", onPress: () => navigation.navigate("StepOne") }]
      );
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      if (error.code === 'SIGN_IN_CANCELLED') {
        Alert.alert("Cancelled", "Sign in was cancelled");
      } else if (error.code === 'IN_PROGRESS') {
        Alert.alert("In Progress", "Sign in is already in progress");
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        Alert.alert("Error", "Play services not available");
      } else {
        Alert.alert("Error", "Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  // Facebook Sign In
  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      if (result.isCancelled) {
        Alert.alert("Cancelled", "Facebook login was cancelled");
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        
        if (!data) {
          Alert.alert("Error", "Failed to get Facebook access token");
          return;
        }

        console.log('Facebook Access Token:', data.accessToken.toString());
        
        // Fetch user info
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email,picture.type(large)`
        );
        const userInfo = await response.json();
        
        console.log('Facebook User Info:', userInfo);
        Alert.alert(
          "Success",
          `Welcome ${userInfo.name || 'User'}!`,
          [{ text: "OK", onPress: () => navigation.navigate("StepOne") }]
        );
      }
    } catch (error) {
      console.error('Facebook Sign In Error:', error);
      Alert.alert("Error", "Failed to sign in with Facebook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/welcome.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 justify-end pb-10 px-6">
        <View className="items-center gap-6">
          {/* Title */}
          <View className="items-center gap-3 mb-4">
            <Text className="text-5xl font-bold text-center text-gray-900 leading-tight">
              <Text style={{ color: '#002765' }}>Amigo</Text>
            </Text>
            <Text className="text-xl text-center text-gray-800 px-4">
              Your AI Travel Companion
            </Text>
            <Text className="text-base text-center text-gray-700 px-4">
              Create your perfect itinerary in minutes
            </Text>
          </View>

          {/* Social Authentication Buttons */}
          <View className="w-full gap-3">
            {/* Google Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={loading}
              className="h-14 border-2 border-white rounded-xl flex-row items-center justify-center gap-3 bg-white/95"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity
              onPress={handleFacebookSignIn}
              disabled={loading}
              className="h-14 border-2 border-white rounded-xl flex-row items-center justify-center gap-3 bg-white/95"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center w-full my-2">
            <View className="flex-1 h-px bg-gray-400" />
            <Text className="mx-4 text-gray-800 font-medium">Or</Text>
            <View className="flex-1 h-px bg-gray-400" />
          </View>

          {/* Email Authentication Buttons */}
          <View className="w-full gap-3">
            {/* Create Account Button */}
            <Button
              onPress={() => navigation.navigate("CreateAccount")}
              title="Create Account"
              variant="primary"
              size="lg"
            />

            {/* Login Button */}
            <Button
              onPress={() => navigation.navigate("Login")}
              title="Log In"
              variant="secondary"
              size="lg"
            />
          </View>

          {/* Terms & Privacy */}
          <Text className="text-xs text-center text-gray-700 px-8 mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
