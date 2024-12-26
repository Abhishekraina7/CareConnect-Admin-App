import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';

const AddNurseScreen = () => {
  const [nurseId, setNurseId] = useState('');
  const [name, setName] = useState('');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [nurses, setNurses] = useState([]);

  const handleAddNurse = () => {
    // Validate input fields
    if (!nurseId || !name || !mobileOrEmail || !department || !wardNo) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Add nurse to the list
    setNurses([...nurses, { nurseId, name, mobileOrEmail, department, wardNo }]);

    // Reset form fields
    setNurseId('');
    setName('');
    setMobileOrEmail('');
    setDepartment('');
    setWardNo('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>ADD Nurse</Text>

      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Nurse ID"
          value={nurseId}
          onChangeText={setNurseId}
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
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <TextInput
          style={styles.input}
          placeholder="Ward No"
          value={wardNo}
          onChangeText={setWardNo}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddNurse}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={nurses}
        renderItem={({ item }) => (
          <View style={styles.nurseItem}>
            <Text style={styles.nurseDetail}>Nurse ID: {item.nurseId}</Text>
            <Text style={styles.nurseDetail}>Name: {item.name}</Text>
            <Text style={styles.nurseDetail}>Mobile/Email: {item.mobileOrEmail}</Text>
            <Text style={styles.nurseDetail}>Department: {item.department}</Text>
            <Text style={styles.nurseDetail}>Ward No: {item.wardNo}</Text>
          </View>
        )}
        keyExtractor={(item) => item.nurseId}
        style={styles.nurseList}
      />
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
  nurseList: {
    flex: 1,
    marginTop: 20,
  },
  nurseItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  nurseDetail: {
    fontSize: 16,
  },
});

export default AddNurseScreen;
