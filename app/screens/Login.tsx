import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { config, isGoogleConfigured, isFacebookConfigured } from '../../components/constants/config';

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

export default function Login() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        // Validation
        if (!usernameOrEmail.trim()) {
            Alert.alert("Error", "Please enter your username or email");
            return;
        }
        if (!password.trim() || password.length < 8) {
            Alert.alert("Error", "Please enter a valid password");
            return;
        }

        // Handle login logic here
        console.log("Logging in with:", { usernameOrEmail, password });
        Alert.alert("Success", "Login successful!", [
            { text: "OK", onPress: () => navigation.navigate("StepOne") }
        ]);
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
        Alert.alert("Forgot Password", "Password reset functionality would be implemented here");
    };

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
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 px-6 pt-12">
                    {/* Title */}
                    <View className="mb-10">
                        <Text className="text-4xl font-bold text-center" style={{ color: '#0D47A1' }}>
                            Login
                        </Text>
                        <Text className="text-base text-center mt-2" style={{ color: '#64B5F6' }}>
                            Let's start with login to your account!
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="gap-5">
                        {/* Username or Email */}
                        <View>
                            <Text className="text-sm font-medium mb-2" style={{ color: '#0D47A1' }}>
                                Username or Email
                            </Text>
                            <Input
                                placeholder="Enter your username or email"
                                value={usernameOrEmail}
                                onChangeText={setUsernameOrEmail}
                                variant="secondary"
                                size="lg"
                            />
                        </View>

                        {/* Password */}
                        <View>
                            <Text className="text-sm font-medium mb-2" style={{ color: '#0D47A1' }}>
                                Password
                            </Text>
                            <View className="relative">
                                <Input
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    variant="secondary"
                                    size="lg"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={24}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity onPress={handleForgotPassword} className="self-start">
                            <Text className="text-sm" style={{ color: '#64B5F6' }}>
                                Forget your password?{" "}
                                <Text className="font-semibold" style={{ color: '#0D47A1' }}>
                                    Click me
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <View className="mt-4">
                            <Button
                                title="Login"
                                onPress={handleLogin}
                                variant="primary"
                                size="lg"
                            />
                        </View>

                        {/* Divider */}
                        <View className="flex-row items-center my-2">
                            <View className="flex-1 h-px bg-gray-300" />
                            <Text className="mx-4 text-gray-500">Or</Text>
                            <View className="flex-1 h-px bg-gray-300" />
                        </View>

                        {/* Social Sign In Buttons */}
                        <View className="gap-3">
                            {/* Google Button */}
                            <TouchableOpacity
                                onPress={handleGoogleSignIn}
                                className="h-14 border border-gray-300 rounded-xl flex-row items-center justify-center gap-3 bg-white"
                            >
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                                <Text className="text-base font-medium" style={{ color: '#0D47A1' }}>
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>

                            {/* Facebook Button */}
                            <TouchableOpacity
                                onPress={handleFacebookSignIn}
                                className="h-14 border border-gray-300 rounded-xl flex-row items-center justify-center gap-3 bg-white"
                            >
                                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                                <Text className="text-base font-medium" style={{ color: '#0D47A1' }}>
                                    Continue with Facebook
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Create Account Link */}
                        <View className="flex-row items-center justify-center mt-4 mb-6">
                            <Text className="text-base" style={{ color: '#64B5F6' }}>
                                Not have an account yet?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
                                <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
                                    Switch to Create Account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
