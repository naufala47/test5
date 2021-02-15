import React, { Component } from 'react';
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

class History extends Component {

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>History</Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default History;