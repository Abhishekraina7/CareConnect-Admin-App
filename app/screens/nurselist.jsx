import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router'; 
import { MaterialIcons } from '@expo/vector-icons'; // For add and search icons

const NurseListScreen = () => {
   const [nurses, setNurses] = useState([
    {
      name: 'Waden Warren',
      phone: '9876534523',
      department: 'Cardiology',
      ward: '3',
      nurseId: '1234abc',
      status: 'Active',
    },
   
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNurse = () => {
    router.push('/screens/addNurse');
  };

  const handleSearch = () => {
    const filteredNurses = nursess.filter(nurse =>
       nurse.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNurses(filteredNurses);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color='#8B0000' />
        </TouchableOpacity>
        <Text style={styles.title}>Nurse List</Text>
        <TouchableOpacity onPress={handleAddNurse} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color='#8B0000' />
        </TouchableOpacity>
      </View>
      <FlatList
        data={nurses}
        renderItem={({ item }) => (
          <View style={styles.nurseItem}>
            <View style={styles.nurseInfo}>
              <View style={styles.nameInitials}>
                <Text style={styles.initials}>
                  {item.name.split(' ')[0][0] + item.name.split(' ')[1][0]}
                </Text>
              </View>
              <View style={styles.nameDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
            </View>
            <View style={styles.nurseDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Department:</Text>
                <Text style={styles.detailValue}>{item.department}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ward:</Text>
                <Text style={styles.detailValue}>{item.ward}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nurse ID:</Text>
                <Text style={styles.detailValue}>{item.nurseId}</Text>
              </View>
              <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
                <View style={styles.statusContainer}>
                  {item.status === 'Active' ? (
                    <View style={styles.activeStatus}>
                      <Text style={styles.statusText}>Active</Text>
                    </View>
                  ) : (
                    <View style={styles.offlineStatus}>
                      <Text style={styles.statusText}>Offline</Text>
                    </View>
                  )}
            </View>
          </View>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
  },
  patientItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  nameDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
  patientDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 120,
  },
  detailValue: {
    fontSize: 14,
  },
  patientList: {
    flex: 1,
  },
});

export default NurseListScreen;
