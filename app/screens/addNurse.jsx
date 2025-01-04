import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable

const AddNurseScreen = () => {
  const [nurseId, setNurseId] = useState('');
  const [name, setName] = useState('');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [nurses, setNurses] = useState([]);

  const handleAddNurse = () => {
    // Basic validation
    if (!nurseId || !name || !mobileOrEmail || !department || !wardNo) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const newNurse = { nurseId, name, mobileOrEmail, department, wardNo };
    setNurses([...nurses, newNurse]);

    // Reset input fields after adding nurse
    setNurseId('');
    setName('');
    setMobileOrEmail('');
    setDepartment('');
    setWardNo('');
  };

  const handleSwipeRight = async (nurse) => {
    try {
      // Get existing list of nurses from AsyncStorage
      const storedNurses = JSON.parse(await AsyncStorage.getItem('nurseList')) || [];

      // Add the current nurse to the stored list
      await AsyncStorage.setItem('nurseList', JSON.stringify([...storedNurses, nurse]));

      // Remove the nurse from local state
      setNurses(nurses.filter((n) => n.nurseId !== nurse.nurseId));
    } catch (error) {
      console.error('Error transferring nurse:', error);
    }
  };

  const renderRightActions = () => (
    <View style={styles.completeContainer}>
      <Text style={styles.completeText}>Add to List</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push('/screens/nurselist')} style={styles.backButton} activeOpacity={0.7}>
        <MaterialIcons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Add Nurse</Text>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Form Fields */}
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
          <Text style={styles.buttonText}>Add Nurse</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Swipeable Nurse List */}
      <FlatList
        data={nurses}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableRightOpen={() => handleSwipeRight(item)}
          >
            <View style={styles.nurseItem}>
              <Text style={styles.nurseDetail}>Nurse ID: {item.nurseId}</Text>
              <Text style={styles.nurseDetail}>Name: {item.name}</Text>
              <Text style={styles.nurseDetail}>Mobile/Email: {item.mobileOrEmail}</Text>
              <Text style={styles.nurseDetail}>Department: {item.department}</Text>
              <Text style={styles.nurseDetail}>Ward No: {item.wardNo}</Text>
            </View>
          </Swipeable>
        )}
        keyExtractor={(item) => item.nurseId}
        style={styles.nurseList}
      />
    </SafeAreaView>
    </GestureHandlerRootView>
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
    padding: 10,  // Make sure the button has a clickable area
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add a background for better visibility
    borderRadius: 50,  // Optional: Round the edges for a cleaner look
    zIndex: 1,  // Ensure the button is on top of other elements
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
    backgroundColor: '#FFF',
  },
  nurseDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  completeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  completeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddNurseScreen;
