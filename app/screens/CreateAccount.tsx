import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser';
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

export default function CreateAccount() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: config.googleWebClientId,
        redirectUri: 'https://auth.expo.io/@myathtoo/amigo-app',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            getUserInfo(response.authentication?.accessToken);
        } else if (response?.type === 'cancel') {
            setLoading(false);
        } else if (response?.type === 'error') {
            Alert.alert('Error', 'Authentication failed');
            setLoading(false);
        }
    }, [response]);

    const getUserInfo = async (token: string | undefined) => {
        if (!token) return;
        try {
            const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userInfo = await res.json();
            console.log('Google User Info:', userInfo);
            
            await setCurrentUser({
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                photoUrl: userInfo.picture,
                handle: userInfo.email ? `@${userInfo.email.split('@')[0]}` : undefined,
            });
            
            setLoading(false);
            navigation.navigate("MainTabs");
        } catch (error) {
            console.error('Error fetching user info:', error);
            Alert.alert('Error', 'Failed to get user information');
            setLoading(false);
        }
    };

    const handleCreateAccount = () => {
        if (!username.trim()) {
            Alert.alert("Error", "Please enter a username");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Error", "Please enter an email");
            return;
        }
        if (!password.trim() || password.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters");
            return;
        }

        console.log("Creating account with:", { username, email, password });
        setCurrentUser({
          id: 'user-' + Date.now(),
          name: username,
          email,
          handle: username ? `@${username}` : undefined,
        });
        Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => navigation.navigate("MainTabs") }
        ]);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        await promptAsync();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 px-6 pt-12">
                    {/* Title */}
                    <View className="mb-10">
                        <Text className="text-4xl font-bold text-center" style={{ color: '#0D47A1' }}>
                            Create Account
                        </Text>
                        <Text className="text-base text-center mt-2" style={{ color: '#64B5F6' }}>
                            Let's start with creating an account!
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="gap-5">
                        {/* Username */}
                        <View>
                            <Text className="text-sm font-medium mb-2" style={{ color: '#0D47A1' }}>
                                Username
                            </Text>
                            <Input
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={setUsername}
                                variant="secondary"
                                size="lg"
                            />
                        </View>

                        {/* Email */}
                        <View>
                            <Text className="text-sm font-medium mb-2" style={{ color: '#0D47A1' }}>
                                Email
                            </Text>
                            <Input
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                inputMode="email"
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

                        {/* Create Button */}
                        <View className="mt-4">
                            <Button
                                title="Create"
                                onPress={handleCreateAccount}
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
                                disabled={loading}
                                className="h-14 border border-gray-300 rounded-xl flex-row items-center justify-center gap-3 bg-white"
                            >
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                                <Text className="text-base font-medium" style={{ color: '#0D47A1' }}>
                                    {loading ? 'Signing in...' : 'Continue with Google'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Link */}
                        <View className="flex-row items-center justify-center mt-4 mb-6">
                            <Text className="text-base" style={{ color: '#64B5F6' }}>
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text className="text-base font-semibold" style={{ color: '#0D47A1' }}>
                                    Switch to Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
