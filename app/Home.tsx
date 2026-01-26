import { ImageBackground, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from "react";
import { config, isGoogleConfigured} from '../components/constants/config';

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

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    // In Expo Go we use the CreateAccount/Login flow (expo-auth-session).
    // Navigating to CreateAccount will handle Google auth via expo-auth-session.
    navigation.navigate("CreateAccount");
  };

  

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-6 bg-white">
      <View style={{ width: '100%', maxWidth: 600 }} />
    </SafeAreaView>
  );
}
