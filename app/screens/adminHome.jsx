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
                uniqueId="274572abcd" // Pass the actual unique ID if needed
            />

            <DateSelector />

            <ScrollView style={styles.scrollContainer}>
                {/* Example pending requests */}
                <View style={styles.requestCard}>
                    <Text style={styles.requestText}>Sarvesh, Ward no. 3, Bed-9</Text>
                    <Text style={styles.requestDetails}>Chest pain urgent check-up</Text>
                    <Text style={styles.requestTime}>1:15 p.m. 07.12.2024</Text>
                </View>
                <View style={styles.requestCard}>
                    <Text style={styles.requestText}>Ronin, Ward no. 3, Bed-12</Text>
                    <Text style={styles.requestDetails}>Blood vomit urgent check-up</Text>
                    <Text style={styles.requestTime}>1:15 p.m. 10.12.2024</Text>
                </View>
                <View style={styles.requestCard}>
                    <Text style={styles.requestText}>Warren, Ward no. 3, Bed-5</Text>
                    <Text style={styles.requestDetails}>Eyes turning yellow, urgent check-up</Text>
                    <Text style={styles.requestTime}>1:15 p.m. 11.12.2024</Text>
                </View>
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
    scrollContainer: {
        marginHorizontal: 10,
        marginBottom: 20,
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
        marginBottom: 20,
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
    },
});