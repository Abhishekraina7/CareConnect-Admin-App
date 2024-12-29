import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 

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
      <TouchableOpacity onPress={() => router.push('/screens/nurselist')} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>ADD Nurse</Text>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Nurse ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Nurse ID"
            value={nurseId}
            onChangeText={setNurseId}
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
          <Text style={styles.label}>Department:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Department"
            value={department}
            onChangeText={setDepartment}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Ward No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Ward No"
            value={wardNo}
            onChangeText={setWardNo}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddNurse}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={nurses}
        renderItem={({ item }) => (
          <View style={styles.nurseItem}>
            <Text style={styles.nurseDetail}>Nurse ID : {item.nurseId}</Text>
            <Text style={styles.nurseDetail}>Name : {item.name}</Text>
            <Text style={styles.nurseDetail}>Mobile/Email : {item.mobileOrEmail}</Text>
            <Text style={styles.nurseDetail}>Department : {item.department}</Text>
            <Text style={styles.nurseDetail}>Ward No : {item.wardNo}</Text>
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
    marginBottom: 5,
  },
});

export default AddNurseScreen;
