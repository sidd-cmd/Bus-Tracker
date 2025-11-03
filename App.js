// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({ name: '', id: '' });
  const [buses] = useState([
    { id: 'Bus 101', route: 'East Loop', status: 'On Route', nextStop: 'Library', lat: 40.12345, lon: -75.12345, eta: 5 },
    { id: 'Bus 202', route: 'West Loop', status: 'Boarding', nextStop: 'Student Union', lat: 40.54321, lon: -75.54321, eta: 3 },
  ]);
  const [selectedBus, setSelectedBus] = useState(null);

  const onSubmitUser = () => {
    if(user.name && user.id) setPage(2);
    else alert('Please enter name and campus ID');
  };

  const onSelectBus = (bus) => {
    setSelectedBus(bus);
    setPage(3);
  };

  // Page 1: User Data Form
  if (page === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Campus Bus Tracker</Text>
        <Text>Welcome! Please enter your details below.</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={user.name}
          onChangeText={text => setUser({...user, name: text})}
        />
        <Text style={styles.label}>Campus ID or Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your campus ID or email"
          value={user.id}
          onChangeText={text => setUser({...user, id: text})}
        />
        <Button title="View Buses" onPress={onSubmitUser} />
      </View>
    );
  }

  // Page 2: List of Buses with proximity (static for demo)
  if (page === 2) {
    return (
      <View style={styles.container}>
        <Button title="← Back" onPress={() => setPage(1)} />
        <Text style={styles.title}>Available Campus Buses</Text>
        <ScrollView>
          {buses.map(bus => (
            <View key={bus.id} style={styles.busCard}>
              <Text style={styles.busId}>{bus.id}</Text>
              <Text>{bus.route}</Text>
              <Text>Status: {bus.status}</Text>
              <Text>Next Stop: {bus.nextStop}</Text>
              <Text>Proximity: auto-calculated</Text>
              <Button title="Details" onPress={() => onSelectBus(bus)} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Page 3: Bus Details, Map, ETA
  if (page === 3 && selectedBus) {
    return (
      <View style={styles.container}>
        <Button title="← Back to List" onPress={() => setPage(2)} />
        <Text style={styles.title}>Bus Details</Text>
        <Text>Bus: {selectedBus.id}</Text>
        <Text>Route: {selectedBus.route}</Text>
        <Text>Status: {selectedBus.status}</Text>
        <Text>Next Stop: {selectedBus.nextStop}</Text>

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Live Map Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedBus.lat,
            longitude: selectedBus.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: selectedBus.lat, longitude: selectedBus.lon }} />
        </MapView>

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Estimated Time of Arrival</Text>
        <Text>ETA: {selectedBus.eta} min to {selectedBus.nextStop}</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 4,
  },
  busCard: {
    borderColor: '#f7a500',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  busId: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  map: {
    height: 200,
    marginTop: 10,
  },
});
