import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { getCurrentUser, clearCurrentUser } from '../../components/services/session';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	GetStarted: undefined;
	MainTabs: undefined;
};

export default function Settings() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [user, setUser] = useState<{ name?: string; handle?: string; email?: string; photoUrl?: string } | null>(null);

	useEffect(() => {
		(async () => {
			const u = await getCurrentUser();
			setUser(u);
		})();
	}, []);

	const handleSignOut = async () => {
		await clearCurrentUser();
		Alert.alert('Signed out', 'You have been signed out', [{ text: 'OK', onPress: () => navigation.navigate('GetStarted') }]);
	};

	return (
		<View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
				{user?.photoUrl ? (
					<Image source={{ uri: user.photoUrl }} style={{ width: 64, height: 64, borderRadius: 32 }} />
				) : (
					<View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#e6eefc', alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ color: '#0D47A1', fontSize: 30 }}>👤</Text>
					</View>
				)}
				<View style={{ marginLeft: 12 }}>
					<Text style={{ fontSize: 18, fontWeight: '600', color: '#0D47A1' }}>{user?.name || 'Guest'}</Text>
					<Text style={{ color: '#6B7280' }}>{user?.handle || '@guest'}</Text>
					{user?.email ? <Text style={{ color: '#6B7280', marginTop: 4 }}>{user.email}</Text> : null}
				</View>
			</View>

			<TouchableOpacity onPress={handleSignOut} style={{ marginTop: 20, padding: 12, backgroundColor: '#0D47A1', borderRadius: 8, alignItems: 'center' }}>
				<Text style={{ color: '#fff', fontWeight: '600' }}>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
}