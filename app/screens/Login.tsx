import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Input from "../../components/ui/Input";
import { setCurrentUser } from '../../components/services/session';
import Button from "../../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { config } from '../../components/constants/config';




WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  CreateAccount: undefined;
  MainTabs: undefined;
  Steps: undefined;
};

export default function Login() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: config.googleWebClientId,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: 'http://auth.expo.io/@myathtoo/amigo-app',
        
    });

    useEffect(() => {
        console.log('=== Google Auth Debug ===');
        console.log('Client ID:', config.googleWebClientId);
        console.log('Redirect URI:', request?.redirectUri);
    }, [request]);

    useEffect(() => {
        console.log('Response changed:', response);
        if (!response) return;
        
        console.log('Response type:', response?.type);
        
        if (response?.type === 'error') {
            console.error('Auth Error:', response.error);
            Alert.alert('Authentication Error', response.error?.message || 'Failed to authenticate');
            return;
        }
        if (response?.type === 'cancel') {
            console.log('User cancelled authentication');
            return;
        }
        if (response?.type === 'success') {
            console.log('Authentication successful!');
            console.log('Access Token:', response.authentication?.accessToken?.substring(0, 20) + '...');
            const { authentication } = response;
            // Get user info from Google
            fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${authentication?.accessToken}` },
            })
            .then(res => res.json())
                        .then(async userInfo => {
                                console.log('Google User Info:', userInfo);
                                await setCurrentUser({
                                    id: userInfo.id || String(Date.now()),
                                    name: userInfo.name || undefined,
                                    email: userInfo.email || undefined,
                                    photoUrl: userInfo.picture || undefined,
                                    handle: userInfo.email ? `@${userInfo.email.split('@')[0]}` : undefined,
                                });
                                console.log('Navigating to MainTabs...');
                                navigation.navigate("MainTabs");
                        })
            .catch(error => {
                console.error('Error fetching user info:', error);
                console.log('Navigating to MainTabs anyway...');
                navigation.navigate("MainTabs");
            });
        }
    }, [response]);

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
        // Persist a simple user for header display
        setCurrentUser({
          id: 'user-' + Date.now(),
          name: usernameOrEmail,
          email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
          handle: usernameOrEmail.includes('@') ? `@${usernameOrEmail.split('@')[0]}` : `@${usernameOrEmail}`,
        });
        Alert.alert("Success", "Login successful!", [
            { text: "OK", onPress: () => navigation.navigate("MainTabs") }
        ]);
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
        Alert.alert("Forgot Password", "Password reset functionality would be implemented here");
    };

    const handleGoogleSignIn = async () => {
        try {
    setLoading(true);
    await promptAsync();
  } catch (error) {
    console.error('Google Sign In Error:', error);
    Alert.alert("Error", "Failed to sign in with Google");
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
