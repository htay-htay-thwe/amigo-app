import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from './../../components/ui/Input';
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../components/store/auth.store";
import { validateLoginForm } from "../../components/constants/validation";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const navigation = useNavigation();
  const { login, loading, error, clearError } = useAuthStore();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleLogin = async () => {
    // Clear previous errors
    setErrors({ usernameOrEmail: "", password: "" });
    clearError();

    // Validate form
    const validation = validateLoginForm(usernameOrEmail, password);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Attempt login
    try {
      await login(usernameOrEmail, password);
      // Authentication state will automatically navigate to Home
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log("Forgot password");
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic
    console.log("Google sign in");
  };

  const handleCreateAccount = () => {
    // Navigate to create account screen
    navigation.navigate("Register" as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <SafeAreaView className="flex-1 mt-10">
          <View className="flex-1 px-6 pt-12">
            {/* Header */}
            <View className="mb-10">
              <Text className="text-4xl font-bold text-center text-primary">
                Login Account
              </Text>
              <Text className="mt-2 text-base text-center text-blue-400">
                Let's start with login to your account!
              </Text>
            </View>

            {/* Form */}
            <View className="gap-5">
              {/* Error Message */}
              {error && (
                <View className="p-3 border border-red-200 rounded-lg bg-red-50">
                  <Text className="text-sm text-red-600">{error}</Text>
                </View>
              )}

              {/* Username or Email Field */}
              <View>
                <Text className="mb-2 text-sm font-medium text-primary">
                  Username or Email
                </Text>
                <Input
                  placeholder="Enter your username or email"
                  value={usernameOrEmail}
                  onChangeText={(text) => {
                    setUsernameOrEmail(text);
                    if (errors.usernameOrEmail) {
                      setErrors({ ...errors, usernameOrEmail: "" });
                    }
                  }}
                  variant="secondary"
                  size="lg"
                  error={errors.usernameOrEmail}
                />
                {errors.usernameOrEmail ? (
                  <Text className="mt-1 text-xs text-red-500">
                    {errors.usernameOrEmail}
                  </Text>
                ) : null}
              </View>

              {/* Password Field */}
              <View>
                <Text className="mb-2 text-sm font-medium text-primary">
                  Password
                </Text>
                <View className="relative">
                  <Input
                    placeholder="At least 8 characters"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors({ ...errors, password: "" });
                      }
                    }}
                    secureTextEntry={!showPassword}
                    variant="secondary"
                    size="lg"
                    error={errors.password}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute z-10 -translate-y-1/2 right-4 top-1/2"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text className="mt-1 text-xs text-red-500">
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity onPress={handleForgotPassword} className="self-start">
                <Text className="text-sm text-blue-400">
                  Forget your password?{" "}
                  <Text className="font-semibold text-primary">Click me</Text>
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <View className="mt-4">
                <Button
                  title={loading ? "Logging in..." : "Login"}
                  onPress={handleLogin}
                  variant="primary"
                  size="lg"
                  checked={!loading}
                />
              </View>

              {/* Divider */}
              <View className="flex-row items-center my-2">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">Or</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                className="flex-row items-center justify-center gap-3 bg-white border border-gray-300 h-14 rounded-xl"
              >
                <Ionicons name="logo-google" size={24} color="#DB4437" />
                <Text className="text-base font-medium text-primary">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* Create Account Link */}
              <View className="flex-row items-center justify-center mt-4 mb-6">
                <Text className="text-base text-blue-400">
                  Not have an account yet?{" "}
                </Text>
                <TouchableOpacity onPress={handleCreateAccount}>
                  <Text className="text-base font-semibold text-primary">
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}