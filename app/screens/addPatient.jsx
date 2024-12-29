import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

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
      <TouchableOpacity onPress={() => router.push('/screens/patientlist')} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>ADD Patient</Text>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Patient ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Patient ID"
            value={patientId}
            onChangeText={setPatientId}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Mobile/Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile No/Email"
            value={mobileOrEmail}
            onChangeText={setMobileOrEmail}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Diagnosis:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Diagnosis"
            value={diagnosis}
            onChangeText={setDiagnosis}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Ward No / Bed No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Ward No / Bed No"
            value={wardBed}
            onChangeText={setWardBed}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientDetail}>Patient ID: {item.patientId}</Text>
            <Text style={styles.patientDetail}>Name: {item.name}</Text>
            <Text style={styles.patientDetail}>Mobile/Email: {item.mobileOrEmail}</Text>
            <Text style={styles.patientDetail}>Diagnosis: {item.diagnosis}</Text>
            <Text style={styles.patientDetail}>Ward No / Bed No: {item.wardBed}</Text>
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
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 40,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    width: '30%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: '65%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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
  patientList: {
    flex: 1,
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
    marginBottom: 5,
  },
});

export default AddPatientScreen;
