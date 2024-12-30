import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // For add and search icons
import { useFocusEffect } from '@react-navigation/native';

const NurseListScreen = () => {
  const [nurses, setNurses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load nurse list from AsyncStorage
  const loadNurses = async () => {
    try {
      const storedNurses = await AsyncStorage.getItem('nurseList');
      if (storedNurses) {
        setNurses(JSON.parse(storedNurses));
      }
    } catch (error) {
      console.error('Failed to load nurse data:', error);
    }
  };

  // Save nurse list to AsyncStorage
  const saveNurses = async (nursesToSave) => {
    try {
      await AsyncStorage.setItem('nurseList', JSON.stringify(nursesToSave));
    } catch (error) {
      console.error('Failed to save nurse data:', error);
    }
  };

  // Handle adding a new nurse (navigate to AddNurse screen)
  const handleAddNurse = () => {
    router.push('/screens/addNurse');
  };

  // Handle searching nurses by name
  const handleSearch = () => {
    const filteredNurses = nurses.filter((nurse) =>
      nurse.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNurses(filteredNurses);
  };

  // Handle deleting a nurse from the list
  const handleDeleteNurse = async (nurseId) => {
    const updatedNurses = nurses.filter((nurse) => nurse.nurseId !== nurseId);
    setNurses(updatedNurses);
    await saveNurses(updatedNurses); // Save the updated list to AsyncStorage
  };

  // Use focus effect to reload the list every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadNurses();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/screens/adminHome')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
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
          <MaterialIcons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={nurses}
        renderItem={({ item }) => {
          const initials = item.name
            ? item.name.split(' ').map((word) => word[0]).join('').slice(0, 2)
            : 'NA';

          return (
            <View style={styles.nurseItem}>
              <View style={styles.nurseInfo}>
                <View style={styles.nameInitials}>
                  <Text style={styles.initials}>{initials}</Text>
                </View>
                <View style={styles.nameDetails}>
                  <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                  <Text style={styles.phone}>{item.mobileOrEmail}</Text>
                </View>
              </View>
              <View style={styles.nurseDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Department: </Text>
                  <Text style={styles.detailValue}>{item.department || 'N/A'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Ward: </Text>
                  <Text style={styles.detailValue}>{item.wardNo}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Nurse ID: </Text>
                  <Text style={styles.detailValue}>{item.nurseId || 'N/A'}</Text>
                </View>
              </View>
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteNurse(item.nurseId)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.nurseId}
        
        style={styles.nurseList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
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
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: 300,
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
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default NurseListScreen;
