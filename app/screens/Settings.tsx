import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../components/store/auth.store";
import Button from "../../components/ui/Button";

export default function Settings() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8">
        {/* User Info Section */}
        <View className="items-center mb-8">
          <View className="items-center justify-center w-20 h-20 mb-4 rounded-full bg-primary">
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text className="mb-1 text-2xl font-bold text-primary">
            {user?.username || "User"}
          </Text>
          <Text className="text-base text-gray-500">
            {user?.email || ""}
          </Text>
        </View>

        {/* Settings Options */}
        <View className="gap-4 mb-8">
          <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
            <View className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={24} color="#0D47A1" />
              <Text className="text-base font-medium text-gray-900">Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications-outline" size={24} color="#0D47A1" />
              <Text className="text-base font-medium text-gray-900">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
            <View className="flex-row items-center gap-3">
              <Ionicons name="help-circle-outline" size={24} color="#0D47A1" />
              <Text className="text-base font-medium text-gray-900">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl">
            <View className="flex-row items-center gap-3">
              <Ionicons name="information-circle-outline" size={24} color="#0D47A1" />
              <Text className="text-base font-medium text-gray-900">About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="mt-auto mb-14">
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="primary"
            size="lg"
            icon="log-out-outline"
            iconColor="white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}