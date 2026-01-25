import { View, Text, StyleSheet } from "react-native";

export default function DataConfirm() {
  return (
    <View style={styles.container}>
      
      {/* Card */}
      <View style={styles.card}>
        
        <Row label="Destination:" value="China" />
        <Row label="From:" value="19 Sep" />
        <Row label="To:" value="22 Sep" />
        <Row label="Travel Type:" value="Solo" />
        <Row label="People:" value="1" />
        <Row label="Budget:" value="20000 THB" />
        <Row label="Nationality:" value="Myanmar" />
        <Row label="Travel Plan:" value="International" />

      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#0D47A1',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  label: {
    color: '#374151',
    fontSize: 16,
  },
  value: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
});
