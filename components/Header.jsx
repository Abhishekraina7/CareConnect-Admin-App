import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Header({ name, uniqueId }) {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/adminimage.png")} style={styles.profileImage} />
            <View style={styles.detailsSection}>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.detailText}>Unique ID: {uniqueId}</Text>
            </View>
            <TouchableOpacity style={styles.emergencyButton}>
                <View style={styles.circle}>
                    <Image source={require("../assets/images/emergencyicon.png")} style={styles.buttonImage} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8B0000',
        padding: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    detailsSection: {
        alignItems: 'center',
        flex: 1, 
    },
    welcomeText: {
        fontSize: 16,
        color: '#FFF',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    detailText: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 4,
    },
    emergencyButton: {
        margin: 5,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF', 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    buttonImage: {
        width: 30,
        height: 30,
    },
});
