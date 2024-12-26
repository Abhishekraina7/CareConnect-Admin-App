import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';

const AddPatientScreen = () => {
  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [wardBed, setWardBed] = useState('');
  const [patients, setPatients] = useState([]);

  const handleAddPatient = () => {
    // Validate input fields
    if (!patientId || !name || !mobileOrEmail || !diagnosis || !wardBed) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Add patient to the list
    setPatients([...patients, { patientId, name, mobileOrEmail, diagnosis, wardBed }]);

    // Reset form fields
    setPatientId('');
    setName('');
    setMobileOrEmail('');
    setDiagnosis('');
    setWardBed('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>ADD Patient</Text>

      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          value={patientId}
          onChangeText={setPatientId}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile No/ Email ID"
          value={mobileOrEmail}
          onChangeText={setMobileOrEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Diagnosis"
          value={diagnosis}
          onChangeText={setDiagnosis}
        />

        <TextInput
          style={styles.input}
          placeholder="Ward No / Bed No"
          value={wardBed}
          onChangeText={setWardBed}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.patientList}>
        {patients.map((patient, index) => (
          <View key={index} style={styles.patientItem}>
            <Text style={styles.patientDetail}>Patient ID: {patient.patientId}</Text>
            <Text style={styles.patientDetail}>Name: {patient.name}</Text>
            <Text style={styles.patientDetail}>Mobile/Email: {patient.mobileOrEmail}</Text>
            <Text style={styles.patientDetail}>Diagnosis: {patient.diagnosis}</Text>
            <Text style={styles.patientDetail}>Ward/Bed: {patient.wardBed}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
  },
  patientList: {
    marginTop: 20,
  },
  patientItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  patientDetail: {
    fontSize: 16,
  },
});

export default AddPatientScreen;


