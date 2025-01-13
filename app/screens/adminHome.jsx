import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import DateSelector from '../../components/DateSelector';
import LogoutButton from '../../components/LogOutButton';
import Header from '../../components/Header';

export default function AdminHomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
                <Header 
                name="Admin"  // Assuming you will pass the admin name here
                uniqueId="admin@1234" // Pass the actual unique ID if needed
            />

          <View style={styles.centerDateSelector}>
                <DateSelector />
            </View>

            <ScrollView style={styles.scrollContainer}>
              
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => router.push('/screens/patientlist')}
                >
                    <Text style={styles.buttonText}>Patient List</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => router.push('/screens/nurselist')}
                >
                    <Text style={styles.buttonText}>Nurse List</Text>
                </TouchableOpacity>
            </View>
            <LogoutButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerDateSelector: {
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    scrollContainer: {
        marginHorizontal: 10,
        marginBottom: 70,
        paddingHorizontal: 10, 
    },
    requestCard: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    requestText: {
        fontWeight: 'bold',
    },
    requestDetails: {
        color: '#666',
    },
    requestTime: {
        fontSize: 12,
        color: '#999',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 70,
    },
    actionButton: {
        backgroundColor: '#8B0000',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});