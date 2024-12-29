import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const PatientListScreen = () => {
  const [patients, setPatients] = useState([
    {
      name: 'Ronald Richards',
      phone: '9876534523',
      diagnosis: 'Heart Surgery',
      wardBed: '3/13',
      patientId: '1234abc',
      admitDate: '08/02/2019',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPatient = () => {
    router.push('/screens/addPatient');
  };

  const handleSearch = () => {
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPatients(filteredPatients);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Patient List</Text>
        <TouchableOpacity onPress={handleAddPatient} style={styles.addButton}>
          <MaterialIcons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          placeholderTextColor="#FFF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <View style={styles.patientInfo}>
              <View style={styles.nameInitials}>
                <Text style={styles.initials}>
                  {item.name.split(' ')[0][0]}
                  {item.name.split(' ')[1][0]}
                </Text>
              </View>
              <View style={styles.nameDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
            </View>
            <View style={styles.patientDetails}>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Diagnosis: </Text>
                {item.diagnosis}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Ward / Bed: </Text>
                {item.wardBed}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Patient ID: </Text>
                {item.patientId}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Admit Date: </Text>
                {item.admitDate}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.patientId}
        style={styles.patientList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B22222',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 5,
    padding: 10,
  },
  patientItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 35,
    marginBottom: 10,
    shadowColor: '#000',
    marginHorizontal: 90,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
   
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameInitials: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  nameDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  patientDetails: {
    marginTop: 10,
   
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  patientList: {
    flex: 1,
  },
});

export default PatientListScreen;
