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
    const filteredNurses = nurses.filter(nurse =>
       nurse.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNurses(filteredNurses);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color='#000' />
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
          <MaterialIcons name="search" size={24} color='#FFF' />
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
                <Text style={styles.detailLabel}>Department :  </Text>
                <Text style={styles.detailValue}>{item.department}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ward :  </Text>
                <Text style={styles.detailValue}>{item.ward}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nurse ID :  </Text>
                <Text style={styles.detailValue}>{item.nurseId}</Text>
              </View>
              <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status :  </Text>
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
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  nurseItem: {
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
  nurseInfo: {
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
  nurseDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 5,
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
  detailValue: {
    flex: 2,
    color: '#555',
  },
  nurseList: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  activeStatus: {
    backgroundColor: 'green',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  offlineStatus: {
    backgroundColor: 'gray',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    color: '#FFF',
  },
});


export default NurseListScreen;
