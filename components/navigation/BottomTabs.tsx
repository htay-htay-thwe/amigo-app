import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../app/Home";
import Save from "../../app/screens/Save";
import CenterTabButton from "../ui/CenterTabButton";
import StepOne from "../../app/screens/StepOne";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Plan from "../../app/screens/Plan";
import TripPlan from "../../app/screens/TripPlan";
import Settings from "../../app/screens/Settings";
import { useEffect, useState } from 'react';
import { getCurrentUser as getPersistedUser } from '../services/session';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function EmptyScreen() {
    return null;
}

export default function BottomTabs() {
    const navigation = useNavigation();
    const [user, setUser] = useState<{ name?: string; handle?: string; photoUrl?: string } | null>(null);

    useEffect(() => {
        (async () => {
            const u = await getPersistedUser();
            setUser(u);
        })();
    }, []);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarStyle: { height: 70 }
            }}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="home-outline" size={focused ? size + 2 : size} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: focused ? 13 : 12, fontWeight: focused ? "600" : "400" }}>
                            Home
                        </Text>
                    ),
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: "#DBEAFE", height: 100 },
                    headerTintColor: "#fff",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MainTabs', { screen: 'Setting' })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}
                        >
                            {user?.photoUrl ? (
                                <Image source={{ uri: user.photoUrl }} style={{ width: 44, height: 44, borderRadius: 22 }} />
                            ) : (
                                <Ionicons name="person-circle-outline" size={44} color={"#0D47A1"} />
                            )}
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: '#0D47A1', fontSize: 18, fontWeight: '600' }}>{user?.name || 'Guest'}</Text>
                                <Text style={{ color: '#6B7280', fontSize: 13 }}>{user?.handle || '@guest'}</Text>
                            </View>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                            style={{ marginRight: 12 }}
                        >
                            <Ionicons name="notifications-outline" size={26} color={'#0D47A1'} />
                        </TouchableOpacity>
                    ),
                }}
            />

            {/* Notification tab removed from bottom; accessed via header bell */}

            <Tab.Screen
                name="MyPlan"
                component={Plan}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="book-outline"
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text
                            style={{
                                color,
                                fontSize: focused ? 13 : 12,
                                fontWeight: focused ? "600" : "400",
                            }}>
                            MyPlans
                        </Text>
                    ),
                    headerShown: true,
                    headerTitle: "Trips Note",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                        height: 100,
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#0D47A1",
                        marginLeft: 15,
                    },
                }}
            />

            {/* CENTER + BUTTON */}
            <Tab.Screen
                name="AddItem"
                component={EmptyScreen}
                options={{
                    tabBarButton: (props) => <CenterTabButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Save"
                component={Save}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="paper-plane"
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text
                            style={{
                                color,
                                fontSize: focused ? 13 : 12,
                                fontWeight: focused ? "600" : "400",
                            }}
                        >
                            Save
                        </Text>
                    ),
                    headerShown: true,
                    headerTitle: "Saved Trips",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                        height: 100,
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#0D47A1",
                        marginLeft: 15,
                    },
                }}
            />

            <Tab.Screen
                name="Setting"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="settings"
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text
                            style={{
                                color,
                                fontSize: focused ? 13 : 12,
                                fontWeight: focused ? "600" : "400",
                            }}
                        >
                            Settings
                        </Text>
                    ),
                    headerShown: true,
                    headerTitle: "Settings",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                        height: 100,
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#0D47A1",
                        marginLeft: 15,
                    },
                }}
            />
        </Tab.Navigator>
    );
}
