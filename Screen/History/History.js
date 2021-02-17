import React, { Component, useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid
} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


class History extends Component {

    historyLaporan = () => {

        firestore()
            .collection('laporan')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());

                });
            });

    }

    componentDidMount() {
        this.historyLaporan();
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <View >
                        <Text>History</Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default History;